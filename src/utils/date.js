function toDateTime(secs) {
  var timestamp = secs;
  var date = new Date(timestamp * 1000);
  return date;
}

export default toDateTime;
