const express = require('express');
const router = express.Router();
require('dotenv').config();

const BASE_URL = 'http://20.244.56.144/evaluation-service';

router.get('/:userid/posts', async (req, res) => {
  const { userid } = req.params;

  try {
    const response = await fetch(`${BASE_URL}/users/${userid}/posts`,
      {
        method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
        'Content-Type': 'application/json', 
      }
      }
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: `Failed to fetch posts for user ${userid}`, error: err.message });
  }
});

module.exports = router;
