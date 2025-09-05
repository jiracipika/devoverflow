require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const sendEmail = require("./util/sendEmail")

const blogRoutes = require('./routes/blogRoutes');
const tagRoutes = require('./routes/tagRoutes');
const userRoutes = require('./routes/userRoutes');
const communityRoutes = require('./routes/communityRoutes');
const questionRoutes = require('./routes/questionRoutes');
const cors = require('cors');

const app = express();

// setting CORS
app.use(express.json());
app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // Allow all origins, or specify domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true, // Allow credentials if necessary
}))

// Nodemailer Route
app.get("/", (req, res) => {
  res.send("Home Page");
})

app.post("/api/sendemail", async (req, res) => {
  const {email} = req.body;

  try {
    const send_To = email;
    const sent_From = "daobrendan7@gmail.com";
    const reply_To = email;
    const subject = "Thank You Message"
    const message = `
      <h3>Reset Password</h3>
      <p>Here is a link to reset your password, note this expires in an hour</p>
      <p>Regards...</p>
    `

    await sendEmail(subject, message, send_To, sent_From, reply_To);
    res.status(200).json({success: true, message: "Email Sent!"})
  } catch (error) {
    res.status(500).json(error.message)
  }
})

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
