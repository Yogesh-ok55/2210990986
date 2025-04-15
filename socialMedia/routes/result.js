const express = require('express');
const router = express.Router();
require('dotenv').config();

const BASE_URL = 'http://20.244.56.144/evaluation-service';

router.get('/', async (req, res) => {
  try {
    const usersResponse = await fetch(`${BASE_URL}/users`,{
        method: 'GET', 
      headers: {
        'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
        'Content-Type': 'application/json', 
      }
    });
    const usersData = await usersResponse.json();
    const users = usersData.users;

    const allPosts = [];

    for (const userId of Object.keys(users)) {
      try {
        const postRes = await fetch(`${BASE_URL}/users/${userId}/posts`);
        const postData = await postRes.json();

        postData.posts.forEach(post => {
          allPosts.push({
            postId: post.id,
            userId: post.userid,
            userName: users[post.userid.toString()],
            content: post.content
          });
        });
      } catch (err) {
        console.log(`User ${userId} has no posts or error fetching posts`);
      }
    }

    
    const latestPosts = allPosts.sort((a, b) => b.postId - a.postId).slice(0, 5);
    const topUsers = Object.values(users);

    res.json({
      topUsers,
      latestPosts
    });

  } catch (err) {
    res.status(500).json({ message: "Error getting summary", error: err.message });
  }
});

module.exports = router;
