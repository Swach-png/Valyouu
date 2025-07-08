const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Redirect root to the login page
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 