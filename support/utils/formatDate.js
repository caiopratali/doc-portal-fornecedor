const { format } = require("date-fns");
const { constants } = require("../config/constants");

exports.formatDate = (date) => format(date, constants.DATE_FORMAT);