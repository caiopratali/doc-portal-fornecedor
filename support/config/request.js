const { env } = require('./env');

exports.request = require('supertest')(env.BASE_URL);