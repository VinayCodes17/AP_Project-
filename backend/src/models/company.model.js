import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    logo:     { type: String, required: true },
    color:    { type: String, default: '#ffffff' },
    role:     { type: String, required: true },
    sector:   { type: String, required: true },
    type:     { type: String, enum: ['placement', 'internship'], required: true },
    branches: { type: [String], default: [] },
    cgpa:     { type: Number, required: true },
    tenth:    { type: Number, default: 0 },
    twelfth:  { type: Number, default: 0 },
    backlogs: { type: Number, default: 0 },
    year:     { type: String, required: true },
  },
  { timestamps: true }
);

const Company = mongoose.model('Company', companySchema);

export default Company;
