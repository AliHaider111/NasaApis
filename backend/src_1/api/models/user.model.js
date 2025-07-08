const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../errors/api-error');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');

/**
* User Roles
*/
const roles = ['user', 'admin'];

/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: false,
    minlength: 6,
    maxlength: 128,
  },
  userId: {
    type: String,
    default: ""
  },
  name: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  firstName: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  email: {
    type: String,
    maxlength: 128,
  },
  services: {
    facebook: String,
    google: String,
  },
  role: {
    type: String,
    enum: roles,
    default: 'user',
  },
  picture: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
    default: ""
  },
  about: {
    type: String,
    default: ''
  },
  lastSeen: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'register'
  },
  points: {
    type: Number,
    default: 0
  },
  nfts: {
    type: Number,
    default: 0
  },
  assets: {
    type: Number,
    default: 0
  },
  badges: [],
  avatars: [],
  referrals: [],
  pointsData: [],
  invitedBy: {
    type: mongoose.Types.ObjectId
  },
  inviteCode: {
    type: String,
  },
  accessToken: {
    type: String,
  },
  platform: {
    type: String,
    default: "Gamification"
  },
  dailyReward: {
    day1: {
      type: Boolean,
      default: true,
    },
    day2: {
      type: Boolean,
      default: false
    },
    day3: {
      type: Boolean,
      default: false
    },
    day4: {
      type: Boolean,
      default: false
    },
    day5: {
      type: Boolean,
      default: false
    },
    day6: {
      type: Boolean,
      default: false
    },
    day7: {
      type: Boolean,
      default: false
    }
  },
  nftsCount: {
    type: Number,
    default: 0
  },
  rank: {
    type: Number,
    default: 0
  },
  lastClaimed: {
    type: Date,
    default: null
  },
  youtube: {
    accessToken: {
      type: String,
      default: null
    },
    refreshToken: {
      type: String,
      default: null
    },
    scope: {
      type: String,
      default: null
    },
    tokenType: {
      type: String,
      default: null
    },
    expiryDate: {
      type: String,
      default: null
    },
    channelId: {
      type: String,
      default: null
    },
    channelUrl: {
      type: String,
      default: null
    },
    channelViewCount: {
      type: String,
      default: null
    },
    channelSubscriberCount: {
      type: Number,
      default: 0
    },
    channelVideoCount: {
      type: Number,
      default: 0
    }
  },
  youtubeToken: {
    type: String,
    default: null
  },
  youtubeData: {
    type: String,
    default: null
  }
}, {
  timestamps: true,
});


/**
 * Methods
 */
userSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'picture', 'address', 'about', 'badges', 'createdAt', 'assets', 'points', 'rank'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });
    return transformed;
  },

  token() {
    const payload = {
      exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
      iat: moment().unix(),
      sub: this._id,
    };
    return jwt.encode(payload, jwtSecret);
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },
});

/**
 * Statics
 */
userSchema.statics = {

  roles,

  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    let user;

    if (mongoose.Types.ObjectId.isValid(id)) {
      user = await this.findById(id).exec();
    }
    if (user) {
      return user;
    }

    throw new APIError({
      message: 'User does not exist',
      status: httpStatus.NOT_FOUND,
    });
  },

  /**
   * Find user by email and tries to generate a JWT token
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async findAndGenerateToken(options) {
    const { email, password, refreshObject } = options;
    if (!email) throw new APIError({ message: 'An email is required to generate a token' });

    const user = await this.findOne({ email }).exec();
    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true,
    };
    if (password) {
      if (user && await user.passwordMatches(password)) {
        return { user, accessToken: user.token() };
      }
      err.message = 'Incorrect email or password';
    } else if (refreshObject && refreshObject.userEmail === email) {
      if (moment(refreshObject.expires).isBefore()) {
        err.message = 'Invalid refresh token.';
      } else {
        return { user, accessToken: user.token() };
      }
    } else {
      err.message = 'Incorrect email or refreshToken';
    }
    throw new APIError(err);
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({
    page = 1, perPage = 30, name, email, role,
  }) {
    const options = omitBy({ name, email, role }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateEmail(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Validation Error',
        errors: [{
          field: 'email',
          location: 'body',
          messages: ['"email" already exists'],
        }],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack,
      });
    }
    return error;
  },

  async oAuthLogin({
    service, id, email, name, picture,
  }) {
    const user = await this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] });
    if (user) {
      user.services[service] = id;
      if (!user.name) user.name = name;
      if (!user.picture) user.picture = picture;
      return user.save();
    }
    const password = uuidv4();
    return this.create({
      services: { [service]: id }, email, password, name, picture,
    });
  },
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', userSchema);
