const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');

dotenv.config();
connectDB();    

app.use(cors());
app.use(express.json());
app.use('/api', bookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(``);
  console.log(`Server is running on port http://localhost:${PORT}`);
  console.log(` `);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Books API');
});