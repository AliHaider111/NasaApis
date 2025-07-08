const axios = require('axios');
const https = require('https');

// Force IPv4 agent
const agent = new https.Agent({ family: 4 });

exports.apiHelper = async function (config) {
  try {
    const response = await axios({
      method: config.method || 'get',
      url: config.url,
      params: config.params || {},
      data: config.data || {},
      headers: config.headers || {},
      responseType: config.responseType || 'json',
      timeout: config.timeout || 10000,       // 10s timeout
      httpsAgent: config.httpsAgent || agent, // Use IPv4 agent by default
    });
    return response;
  } catch (error) {
    throw error; // handled in controller
  }
};
