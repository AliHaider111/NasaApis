const axios = require('axios');

/**
 * Helper function to make HTTP requests using Axios.
 * Centralizes external API calls with flexible configuration.
 *
 * @param {Object} config - Axios request configuration.
 * @param {string} config.method - HTTP method (GET, POST, etc.).
 * @param {string} config.url - The request URL.
 * @param {Object} [config.params] - URL query parameters.
 * @param {Object} [config.data] - Request payload for POST/PUT requests.
 * @param {Object} [config.headers] - Optional custom headers.
 * @param {string} [config.responseType='json'] - Expected response type.
 *
 * @returns {Promise<Object>} Axios response object.
 * @throws {Error} Custom error containing response details or original error.
 */
exports.apiHelper = async function (config) {
  try {
    const response = await axios({
      method: config.method || 'get',
      url: config.url,
      params: config.params || {},
      data: config.data || {},
      headers: config.headers || {},
      responseType: config.responseType || 'json',
      timeout: config.timeout || 10000, // Optional: 10s timeout
    });
    return response;
  } catch (error) {
    // Handle known Axios error shape
    if (error.response) {
      const { status, statusText, data } = error.response;
      const err = new Error(`API Error: ${status} ${statusText}`);
      err.status = status;
      err.data = data;
      err.isAxiosError = true;
      throw err;
    } else if (error.request) {
      // Request was made but no response received
      const err = new Error('No response received from external API');
      err.isAxiosError = true;
      err.original = error;
      throw err;
    } else {
      // Something else happened while setting up the request
      throw new Error(`Request setup failed: ${error.message}`);
    }
  }
};
