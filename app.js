const express = require('express')
const { createHealthyMeals } = require('./controllers/fridgeChefController');

// app setup
const app = express()
app.listen(4000, () => console.log('listening to requests on port 4000'))

// middleware
app.use(express.json());


// routes
app.post('/openai/meals', createHealthyMeals)
