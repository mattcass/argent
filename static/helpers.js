export function dateString() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function decimal(number) {
  return parseFloat(number).toFixed(2)
}
