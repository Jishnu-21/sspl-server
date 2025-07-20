const Career = require('../models/Career');

// Get all career submissions
exports.getCareers = async (req, res) => {
  try {
    const careers = await Career.find().sort({ createdAt: -1 });
    res.json(careers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create a new career submission
exports.createCareer = async (req, res) => {
  try {
    const { name, email, phone, message, position } = req.body;
    const resumeUrl = req.file ? `/uploads/resumes/${req.file.filename}` : '';
    const newCareer = new Career({
      name,
      email,
      phone,
      message,
      position,
      resumeUrl,
    });
    await newCareer.save();
    res.status(201).json(newCareer);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
}; 