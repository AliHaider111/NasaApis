
const {apiHelper} = require("../utils/helper")

exports.List = async (req, res, next) => {
  let { date } = req.query;

    if (!date) {
      const now = new Date();
      now.setDate(now.getDate() - 1); 
      date = now.toISOString().split('T')[0]; 
    }

    console.log("Using date:", date);
  try {
    const response = await apiHelper({
      method: 'get',
      url: 'https://api.nasa.gov/planetary/apod',
      params: {
        date,
        api_key: process.env.NASA_API_KEY,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.log(err)
    next(err);
  }
};
