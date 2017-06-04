export function dateString() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

export function decimal(number) {
  return parseFloat(number).toFixed(2)
}

export function monthSpentCash(data) {
  const dataArr = Object.keys(data)

  const spentMoney = dataArr.reduce((sum, key) => {
    let spent = data[key].payment
    return sum + spent
  }, 0)

  return spentMoney.toFixed(2)
}

export function monthRemainingCash(data, budget) {
  const dataArr = Object.keys(data)

  let remainingMoney = dataArr.reduce((prevTotal, key) => {
    let spent = data[key].payment
    return prevTotal - spent
  }, budget)

  return remainingMoney.toFixed(2)
}

// filterDataByMonth = () => {
//   const month = new Date().toLocaleString('en-us', { month: 'short' })
//   const spentThisMonth = { ...this.state.spent }
//   const newArr = Object.keys({
//     ...this.state.spent
//   }).map((val, index, arr) => {
//     console.log(spent, month)
//     if (spentThisMonth[val].date.split(' ')[1] !== month) {
//       spentThisMonth[val] = null
//     }
//     return arr
//   })
//   this.setState({
//     spent: spentThisMonth
//   })
// }
