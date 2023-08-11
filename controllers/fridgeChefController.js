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

  //console.log(meals)

  const titles = extractMealTitles(meals)

  //console.log(titles);

  mealsList = extractMeals(meals, titles)

  //console.log(mealsList);

}

function extractMealTitles(meals) {
  // Split the string into lines
  const lines = meals.split('\n');

  // Get the last three lines
  const lastThreeLines = lines.slice(-3);

  // Map over these lines, and use a regular expression to remove the leading number, dash or period, and space
  const titles = lastThreeLines.map(line => line.replace(/^\d+\.\s*|^\d+\-\s*/, ''));

  // Return the list of titles
  return titles;
}

function extractMeals(inputString, titles) {
  // Remove the titles section from the bottom
  inputString = inputString.split('Titles:')[0];

  const lines = inputString.split('\n');
  const meals = [];
  let currentMeal = null;

  lines.forEach(line => {
    const title = titles.find(t => line.includes(t));
    if (title) {
      if (currentMeal) {
        meals.push(currentMeal);
      }
      currentMeal = {
        title: title,
        description: '',
        url: '',
      };
    } else if (currentMeal) {
      currentMeal.description += line + '\n';
    }
  });

  if (currentMeal) {
    meals.push(currentMeal);
  }

  return meals;
}

module.exports = { createHealthyMeals }