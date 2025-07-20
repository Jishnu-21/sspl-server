const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(require('./routes/contact'));
app.use(require('./routes/partner'));
app.use(require('./routes/auth'));
app.use(require('./routes/webinar'));
app.use('/api/banners',  require('./routes/banner'));
app.use('/api/job-openings', require('./routes/jobOpening'));
app.use('/api/careers', require('./routes/career'));
app.use('/api/blogs', require('./routes/blog'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
