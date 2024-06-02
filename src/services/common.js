module.exports.findSingleRecord = async (
  table,
  where,
  attributes,
  includes,
  raw = true
) => {
  return await table.findOne({
    attributes,
    includes,
    where,
    raw,
  });
};

module.exports.findSingleRecordWithOrder = async (
  table,
  where,
  attributes,
  includes,
  order,
  raw = true,
  useMaster = false
) => {
  return await table.findOne({
    attributes,
    includes,
    where,
    order: [order],
    raw,
    logging: false,
    useMaster,
  });
};

module.exports.update = async (table, where, data, returning = false) => {
  if (!where) return false;
  return await table.update(data, {
    where,
    returning,
    raw: true,
    individualHooks: true,
  });
};

module.exports.insertData = async (table, insertData) => {
  return await table.create(insertData);
};

module.exports.findAllMatching = async (
  table,
  where,
  attributes,
  raw = true,
  limit,
  offset,
  order
) => {
  return await table.findAll({
    attributes,
    where,
    raw,
    offset,
    limit,
    order: [order],
  });
};

module.exports.findAllMatchingWithoutOrder = async (
  table,
  where,
  attributes,
  raw = true
) => {
  return await table.findAll({
    attributes,
    where,
    raw,
  });
};

module.exports.getTotalCount = async (table, where) => {
  return await table.count({
    where,
  });
};

module.exports.insertBulkData = async (table, insertData) => {
  return await table.bulkCreate(insertData);
};
