const { expect } = require("chai");
const addContext = require('mochawesome/addContext');

const { describe, it, before } = require('mocha');

const { mocks } = require("../support/mock");
const { env } = require('../support/config/env');
const { request } = require('../support/config/request');
const { loginService } = require('../support/service/login');
const { listRecess, createRecess, updateRecess, getRecessById, deleteRecess } = require("../support/service/recessos");

let token;

describe("recess (e2e)", () => {
    before(async () => {
        const user = {
            email: env.USER_EMAIL,
            password: env.USER_PASSWORD
        };

        const response = await loginService(request, user);

        token = response.body.token;
    });


    it("should be able to get the recess list", async function () {
        const data = mocks.recess;

        await createRecess(request, token, data);

        const { status, body: allRecess } = await listRecess(request, token);

        expect(status).to.be.equal(200);
        expect(allRecess).to.be.an('array');

        addContext(this, {
            title: 'output',
            value: {
                statusCode: status,
                body: allRecess
            }
        });

        const lastRecess = allRecess[allRecess.length - 1];

        await deleteRecess(request, token, lastRecess.Id);
    });

    it("should be able to get a recess by id", async function () {
        const data = mocks.recess;

        await createRecess(request, token, data);

        const { body: allRecess } = await listRecess(request, token);

        const lastRecess = allRecess[allRecess.length - 1];

        const response = await getRecessById(request, token, lastRecess.Id);

        expect(response.status).to.be.equal(200);
        expect(response.body.Id).to.be.equal(lastRecess.Id);

        addContext(this, {
            title: 'output',
            value: {
                statusCode: response.status,
                body: response.body
            }
        });

        await deleteRecess(request, token, lastRecess.Id);
    });

    it("should not be able to get a recess by id that does not exist", async function () {
        const response = await getRecessById(request, token, new Date().getTime());

        expect(response.status).to.be.equal(404);

        addContext(this, {
            title: 'output',
            value: { statusCode: response.status }
        });
    });

    it("should be able to create a new recess", async function () {
        const data = mocks.recess;

        const response = await createRecess(request, token, data);

        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.an('object').to.have.property('Descricao');

        addContext(this, {
            title: 'output',
            value: {
                statusCode: response.status,
                body: response.body
            }
        });

        const { body: allRecess } = await listRecess(request, token);

        const lastRecess = allRecess[allRecess.length - 1];

        await deleteRecess(request, token, lastRecess.Id);
    });

    it("should not be able when not filling in mandatory data", async function () {
        const { DataInicio, ...data } = mocks.recess;

        const response = await createRecess(request, token, data);

        expect(response.status).to.be.equal(400);
        expect(response.body).to.be.an('object').to.have.property('erros');

        addContext(this, {
            title: 'output',
            value: {
                statusCode: response.status,
                body: response.body
            }
        });

        const { body: allRecess } = await listRecess(request, token);

        const lastRecess = allRecess[allRecess.length - 1];

        await deleteRecess(request, token, lastRecess.Id);
    });

    it("should be able to update recess", async function () {
        const data = mocks.recess;

        await createRecess(request, token, data);

        const { body: allRecess } = await listRecess(request, token);

        const lastRecess = allRecess[allRecess.length - 1];

        const newData = { ...lastRecess, Descricao: "teste qa update" };

        const response = await updateRecess(request, token, newData);

        const updatedRecess = await getRecessById(request, token, lastRecess.Id);

        expect(response.status).to.be.equal(200);
        expect(updatedRecess.body.Descricao).to.be.equal(newData.Descricao);

        addContext(this, {
            title: 'output',
            value: {
                statusCode: response.status,
                body: response.body
            }
        });

        await deleteRecess(request, token, lastRecess.Id);
    });

    it("should not be able to update recess when not filling in mandatory data", async function () {
        const data = mocks.recess;

        await createRecess(request, token, data);

        const { body: allRecess } = await listRecess(request, token);

        const { DataInicio, ...lastRecess } = allRecess[allRecess.length - 1];

        const response = await updateRecess(request, token, lastRecess);

        expect(response.status).to.be.equal(400);

        addContext(this, {
            title: 'output',
            value: {
                statusCode: response.status,
            }
        });

        await deleteRecess(request, token, lastRecess.Id);
    });

    it("should not be able to update recess that does not exist", async function () {
        const data = { ...mocks.recess, Id: new Date().getTime() };

        const response = await updateRecess(request, token, data);

        expect(response.status).to.be.equal(404);

        addContext(this, {
            title: 'output',
            value: {
                statusCode: response.status,
            }
        });
    });

    it("should be able to delete recess", async function () {
        const data = mocks.recess;

        await createRecess(request, token, data);

        const { body: allRecess } = await listRecess(request, token);

        const lastRecess = allRecess[allRecess.length - 1];

        const response = await deleteRecess(request, token, lastRecess.Id);

        const deletedRecess = await getRecessById(request, token, lastRecess.Id);

        expect(response.status).to.be.equal(200);
        expect(deletedRecess.status).to.be.equal(404);

        addContext(this, {
            title: 'output',
            value: {
                statusCode: response.status,
            }
        });
    });

    it("should not be able to delete recess that does not exist", async function () {
        const response = await deleteRecess(request, token, new Date().getTime());

        expect(response.status).to.be.equal(404);

        addContext(this, {
            title: 'output',
            value: {
                statusCode: response.status,
            }
        });
    });
});

