const express = require("express");
const app=express();
require("dotenv").config();
const port = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("these are api's for calculator")
})

const WINDOW_SIZE = 10;
let currentWindow = [];


const VALID_IDS = ['primes', 'fibo', 'even', 'rand'];



const fetchWithTimeout = async (url, timeout = 2000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`, 
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });

    clearTimeout(id);
    const data = await response.json();
    console.log(data);
    return data.numbers || [];
  } catch (err) {
    return [];
  }
};


const updateWindow = (newNumbers) => {
  const previousWindow = [...currentWindow];

  for (let num of newNumbers) {
    if (!currentWindow.includes(num)) {
      currentWindow.push(num);
    }
  }

 
  while (currentWindow.length > WINDOW_SIZE) {
    currentWindow.shift();
  }

  const average =
    currentWindow.reduce((sum, n) => sum + n, 0)

  return {
    previousWindow,
    currentWindow,
    average: parseFloat(average.toFixed(2)),
  };
};


app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;

  if (!VALID_IDS.includes(numberid)) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  const url = `http://20.244.56.144/evaluation-service/${numberid}`;
  console.log(url);
  const numbers = await fetchWithTimeout(url, 500);
  console.log(numbers);
  const result = updateWindow(numbers);

  res.json(result);
});

app.listen(port,()=>{
    console.log('app is running fine');
})