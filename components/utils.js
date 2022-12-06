const removeEmptyFromObj = obj => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null && v != undefined));
}

const groupBy = (array, key, keyFormatter = null) => {
  return array.reduce(function(rv, value) {
    const formattedKey = keyFormatter ? keyFormatter(value[key]) : value[key];
    (rv[formattedKey] = rv[formattedKey] || []).push(value);
    return rv;
  }, {});
};

const dateToString = (date) => date.toISOString().substring(0, 10);

export { dateToString, groupBy, removeEmptyFromObj };