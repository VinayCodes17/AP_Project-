import Support from '../models/support.model.js';

// POST /api/support
export const createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const newMessage = await Support.create({ name, email, subject, message });
    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
