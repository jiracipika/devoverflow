require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');

const blogRoutes = require('./routes/blogRoutes');
const tagRoutes = require('./routes/tagRoutes');
const userRoutes = require('./routes/userRoutes');
const communityRoutes = require('./routes/communityRoutes');
const questionRoutes = require('./routes/questionRoutes');
const cors = require('cors');
const nodemailer = require("nodemailer");

const app = express();

// setting CORS
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Allow all origins, or specify domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true, // Allow credentials if necessary
}))

//nodemailer for reset password
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    username: "mygmail@gmail.com",
    password: "password" 
  }
});

app.post("/api/send", (req, res) => {
  const mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.message
  };
  transporter.sendMail(mailOptions, (error, info) => {
     if(error){
       return res.status(500).send(error);
     }
     res.status(200).send("Email sent successfully");
  });
});

// database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('DB connection error:', error));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/user', userRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api', questionRoutes);


const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
