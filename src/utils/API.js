const getInitialBudget = () => {
  const budgetInstance = JSON.parse(localStorage.getItem('budget')) || { transactions: [], balance: 0 }
  const { transactions, balance } = budgetInstance
  return { transactions, balance }
}

export default {
  getInitialBudget
}
