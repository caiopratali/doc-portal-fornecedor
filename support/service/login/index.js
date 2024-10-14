const { endpoints } = require("../../endpoints");
const { rawToJson } = require("../../utils/rawToJson");

exports.loginService = async (request, user) => {
    const response = await request
        .post(endpoints.login)
        .send(user)
        .catch((err) => {
            return err;
        })

    const body = rawToJson(response.rawResponse);

    return { status: response.statusCode, body };
};