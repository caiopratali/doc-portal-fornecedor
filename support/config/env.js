require('dotenv').config()

exports.env = {
    BASE_URL: process.env.BASE_URL,
    USER_EMAIL: process.env.USER_EMAIL,
    USER_PASSWORD: process.env.USER_PASSWORD,
    USER_ID: process.env.USER_ID
}