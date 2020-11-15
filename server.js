require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Comments = require('./models/commentModel');

const app = express();
app.use(express.json());
app.use(cors());

const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Socket.io
io.on('connection', (socket) => {
  console.log(socket.id + 'connected');

  socket.on('createComment', async (msg) => {
    console.log(msg);
    const { username, content, product_id, createdAt, rating } = msg;

    const newComment = new Comments({
      username,
      content,
      product_id,
      createdAt,
      rating,
    });

    await newComment.save();
    console.log(newComment);
  });

  socket.on('disconnect', () => {
    console.log(socket.id + 'disconnected');
  });
});

// Routes

app.use('/api', require('./routes/productRouter'));
app.use('/api', require('./routes/commentRouter'));

//Connection to mongodb
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to mongodb');
  }
);

// Listen server
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
