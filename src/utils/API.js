const getInitialBudget = () => {
  const budgetInstance = JSON.parse(localStorage.getItem('budget')) || { transactions: [], currentBalance: 0 }
  const { transactions, currentBalance } = budgetInstance
  return { transactions, currentBalance }
}

const postBudget = (budget) => {
  localStorage.setItem('budget', JSON.stringify(budget))
}

export default {
  getInitialBudget,
  postBudget
}
