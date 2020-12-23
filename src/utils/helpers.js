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

const add$ = (o) => {
  Object.keys(o).forEach(key => {
    if (key === 'withdrawlAmount') { o.withdrawlAmount$ = `$${o.withdrawlAmount.toString()}` }
    if (key === 'depositAmount') { o.depositAmount$ = `$${o.depositAmount.toString()}` }
    if (key === 'currentBalance') { o.currentBalance$ = `$${o.currentBalance.toString()}` }
  })
}

export {
  updateTransactionsBalance,
  add$
}
