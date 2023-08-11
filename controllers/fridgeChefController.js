const openai = require('../config/openaiConfig')

const createHealthyMeals = async (ingredients, kcal = 2000) => {

  system_role_content = "You are a talented cook."

  prompt = `Create a healthy daily meal plan for breakfast, lunch and dinner based on
    the following ingredients ${ingredients}.
    Explain each recipe.
    The total daily intake of kcal should be below ${kcal}.
    Assign a suggestive and concise title to each meal.
    Your answer should end with 'Titles: ' and an ordered list of the title of each recipe.`

  messages = [
    { 'role': 'system', 'content': system_role_content },
    { 'role': 'user', 'content': prompt }
  ]

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 1,
    max_tokens: 1024,
    n: 1
  })

  meals = response.data.choices[0].message.content

  console.log(meals)
}

module.exports = { createHealthyMeals }