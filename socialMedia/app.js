const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;


const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const resultRoute = require('./routes/result');

app.use('/userList', usersRoute);
app.use('/posts', postsRoute);
app.use('/users', resultRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
