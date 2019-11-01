function luhnCheck(val) {
  var sum = 0;
  for (var i = 0; i < val.length; i++) {
    var intVal = parseInt(val.substr(i, 1));
    if (i % 2 === 0) {
      intVal *= 2;
      if (intVal > 9) {
        intVal = 1 + (intVal % 10);
      }
    }
    sum += intVal;
  }
  return (sum % 10) === 0;
}

export default function validateCardNumber(number) {
  const regex = new RegExp("^[0-9]{15,16}$");
  if (!regex.test(number))
    return false;
  return luhnCheck(number);
}