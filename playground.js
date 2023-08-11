
const readline = require('readline')
const { createHealthyMeals } = require('./controllers/fridgeChefController');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

foods = 'broccoli, chicken, fish, vegetables, cabbage, eggs, olive oil'
createHealthyMeals(foods).then(meals => {
  console.log(meals)
})