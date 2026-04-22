import Student from '../models/student.model.js';
import bcrypt from 'bcryptjs';

// POST /api/auth/signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Student.findOne({ email });
    if (existingUser) return res.status(400).json({ success: false, message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const student = await Student.create({ name, email, password: hashedPassword });

    res.status(201).json({ success: true, data: { id: student._id, name: student.name, email: student.email } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ success: false, message: 'User not found' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    res.status(200).json({ success: true, data: { id: student._id, name: student.name, email: student.email, branch: student.branch, cgpa: student.cgpa } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
