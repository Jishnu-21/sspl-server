const Contact = require('../models/Contact');

exports.submitContact = async (req, res) => {
  try {
    const { name, email, city, country, organisation, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }
    const contact = new Contact({ name, email, city, country, organisation, message });
    await contact.save();
    res.status(201).json({ message: 'Contact form submitted successfully.' });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
}; 