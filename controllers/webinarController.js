const Webinar = require('../models/Webinar');

exports.submitWebinar = async (req, res) => {
  try {
    const { fullName, job, companyName, city, country, workEmail, phoneNo, annualRevenue, employees } = req.body;
    if (!fullName || !workEmail) {
      return res.status(400).json({ error: 'Full name and work email are required.' });
    }
    const webinar = new Webinar({ fullName, job, companyName, city, country, workEmail, phoneNo, annualRevenue, employees });
    await webinar.save();
    res.status(201).json({ message: 'Webinar registration submitted successfully.' });
  } catch (err) {
    console.error('Error saving webinar registration:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

exports.getAllWebinars = async (req, res) => {
  try {
    const webinars = await Webinar.find().sort({ createdAt: -1 });
    res.json(webinars);
  } catch (err) {
    console.error('Error fetching webinars:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
}; 