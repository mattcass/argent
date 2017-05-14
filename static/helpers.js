export function dateString() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function decimal(number) {
  return parseFloat(number).toFixed(2)
}

export function monthSpentCash ( data ) {
  const dataArr = Object.keys(data)

  const spentMoney = dataArr.reduce((sum, key) => {
    let spent = data[key].payment
    return sum + spent
  }, 0)

  return spentMoney.toFixed(2)
}

export function monthRemainingCash ( data, budget ) {
  const dataArr = Object.keys(data)

  let remainingMoney = dataArr.reduce((prevTotal, key) => {
    let spent = data[key].payment
    return prevTotal - spent
  }, budget)

  return remainingMoney.toFixed(2)
}
