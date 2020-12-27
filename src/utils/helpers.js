const updateTransactionsBalance = (arr) => arr.map((item, i) => {
  if (i === 0) {
    if ('withdrawlAmount' in item) { item.currentBalance = -item.withdrawlAmount }
    if ('depositAmount' in item) { item.currentBalance = item.depositAmount }
  }
  if (i > 0) {
    if ('withdrawlAmount' in item) {
      item.currentBalance = arr[i - 1].currentBalance - item.withdrawlAmount
    }
    if ('depositAmount' in item) {
      item.currentBalance = arr[i - 1].currentBalance + item.depositAmount
    }
  }
  return item
})

const add$ = (item) => item ? `$${item.toString()}` : null

export {
  updateTransactionsBalance,
  add$
}
