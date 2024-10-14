const { endpoints } = require("../../endpoints");
const { rawToJson } = require("../../utils/rawToJson");

exports.listRecess = async (request, token) => {
    const response = await request
        .get(endpoints.recess)
        .set('Authorization', token);

    return response;
}

exports.getRecessById = async (request, token, id) => {
    const response = await request
        .get(`${endpoints.recess}/${id}`)
        .set('Authorization', token);

    return response;
}

exports.createRecess = async (request, token, data) => {
    const response = await request
        .post(endpoints.recess)
        .set('Authorization', token)
        .send(data)
        .catch((err) => {
            return err;
        });

    const body = rawToJson(response.rawResponse);

    return { status: response.statusCode, body };
}

exports.updateRecess = async (request, token, data) => {
    const response = await request
        .put(`${endpoints.recess}/${data.Id}`)
        .set('Authorization', token)
        .send(data)
        .catch((err) => {
            return err;
        });

    return { status: response.statusCode };
}

exports.deleteRecess = async (request, token, id) => {
    const response = await request
        .delete(`${endpoints.recess}/${id}`)
        .set('Authorization', token);

    return response;
}