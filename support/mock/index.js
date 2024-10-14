const { add } = require("date-fns");
const { formatDate } = require("../utils/formatDate");
const { env } = require("../config/env");

const nextDay = add(new Date(), { days: 1 });

const recess = {
    Descricao: "Any description from test e2e",
    DataInicio: formatDate(new Date()),
    DataFinal: formatDate(nextDay),
    IdColaborador: env.USER_ID
};

exports.mocks = { recess };