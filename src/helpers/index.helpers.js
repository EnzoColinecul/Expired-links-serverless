const random = (length = 8) => Math.random().toString(16).substr(2, length);

const timeSelection = (time) => {
  const setTTL = new Date();
  switch (time) {
    case 'seconds':
      return setTTL.setSeconds(setTTL.getSeconds() + 10);
    case 'minutes':
      return setTTL.setMinutes(setTTL.getMinutes() + 10);
    case 'hours':
      return setTTL.setHours(setTTL.getHours() + 1);
    case 'day':
      return setTTL.setDate(setTTL.getDate() + 1);
    case 'week':
      return setTTL.setDate(setTTL.getDate() + 7);
    default:
      return null;
  }
};

module.exports = {
  random,
  timeSelection,
};
