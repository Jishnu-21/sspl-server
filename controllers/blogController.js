const Blog = require('../models/Blog');

const slugify = (text) =>
  text.toString().toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function getFullUrl(req, relativePath) {
  if (!relativePath) return '';
  if (relativePath.startsWith('http')) return relativePath;
  return `${req.protocol}://${req.get('host')}${relativePath}`;
}

exports.createBlog = async (req, res) => {
  try {
    const { title, content, summary, author, tags, published } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });
    let slug = slugify(title);
    let count = 1;
    while (await Blog.findOne({ slug })) {
      slug = `${slugify(title)}-${count++}`;
    }
    let coverImage = req.file ? `/uploads/blogs/${req.file.filename}` : req.body.coverImage;
    const blog = new Blog({ title, slug, content, summary, coverImage, author, tags, published });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    const blogsWithFullImage = blogs.map(blog => {
      const obj = blog.toObject();
      obj.coverImage = getFullUrl(req, obj.coverImage);
      return obj;
    });
    res.json(blogsWithFullImage);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    const obj = blog.toObject();
    obj.coverImage = getFullUrl(req, obj.coverImage);
    res.json(obj);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const update = req.body;
    // If a new file is uploaded, set coverImage to the file path
    if (req.file) {
      update.coverImage = `/uploads/blogs/${req.file.filename}`;
    }
    update.updatedAt = new Date();
    const blog = await Blog.findOneAndUpdate({ slug }, update, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { slug } = req.params;
    const deleted = await Blog.findOneAndDelete({ slug });
    if (!deleted) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}; 