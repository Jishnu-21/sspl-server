const Banner = require('../models/Banner');

// Helper to get full URL
function getFullUrl(req, relativePath) {
  return `${req.protocol}://${req.get('host')}${relativePath}`;
}

// Upload or update a banner
exports.uploadBanner = async (req, res) => {
  try {
    const { key } = req.body;
    if (!key || !req.file) return res.status(400).json({ error: 'Key and file are required' });
    const mediaUrl = `/uploads/banners/${req.file.filename}`;
    const fileType = req.file.mimetype;
    const banner = await Banner.findOneAndUpdate(
      { key },
      { mediaUrl, fileType },
      { new: true, upsert: true }
    );
    // Return full URL
    res.json({ ...banner.toObject(), mediaUrl: getFullUrl(req, mediaUrl), fileType });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a banner by key
exports.getBanner = async (req, res) => {
  try {
    const { key } = req.params;
    const banner = await Banner.findOne({ key });
    if (!banner) return res.status(404).json({ error: 'Banner not found' });
    // Return full URL
    res.json({ ...banner.toObject(), mediaUrl: getFullUrl(req, banner.mediaUrl), fileType: banner.fileType });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 