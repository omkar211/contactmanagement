const moment = require("moment");
moment.suppressDeprecationWarnings = true;

module.exports.dateFormat = (
  date = new Date(),
  dateFormat = "YYYY-MM-DD HH:mm:ss.SSS"
) => {
  const dt = moment(date);

  // if Date not valid return false
  if (!dt.isValid()) return false;

  return moment(dt).format(dateFormat);
};
