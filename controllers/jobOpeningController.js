const JobOpening = require('../models/JobOpening');

// Get all job openings
exports.getJobOpenings = async (req, res) => {
  try {
    const jobs = await JobOpening.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens

// Create a new job opening
// Supports: title, description, location, requirements, contactEmail, contactPhone, benefits, whoWeAre
exports.createJobOpening = async (req, res) => {
  try {
    const { title, ...rest } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    // Generate base slug
    let baseSlug = slugify(title);
    let slug = baseSlug;
    let count = 1;

    // Ensure slug is unique
    while (await JobOpening.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    // rest may include description, location, requirements, contactEmail, contactPhone, benefits, whoWeAre
    const newJob = new JobOpening({ title, slug, ...rest });
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// Delete a job opening
exports.deleteJobOpening = async (req, res) => {
  try {
    const deleted = await JobOpening.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Job opening not found' });
    res.json({ message: 'Job opening deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a job opening
// Supports updating: description, location, requirements, contactEmail, contactPhone, benefits, whoWeAre
exports.updateJobOpening = async (req, res) => {
  try {
    const updated = await JobOpening.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Job opening not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};


// Get a single job opening by slug
exports.getJobOpeningBySlug = async (req, res) => {
  try {
    console.log('Searching for slug:', req.params.slug); // Add this line
    const job = await JobOpening.findOne({ slug: req.params.slug });
    if (!job) return res.status(404).json({ error: 'Job opening not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single job opening by ID
exports.getJobOpeningById = async (req, res) => {
  try {
    const job = await JobOpening.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job opening not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};