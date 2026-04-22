import mongoose from 'mongoose';

const statSchema = new mongoose.Schema(
  {
    yearData: [
      {
        y: { type: String, required: true },
        n: { type: Number, required: true }
      }
    ],
    sectors: [
      {
        s: { type: String, required: true },
        n: { type: Number, required: true },
        c: { type: String, required: true }
      }
    ],
    branches: [
      {
        b: { type: String, required: true },
        v: { type: Number, required: true },
        c: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

const Stat = mongoose.model('Stat', statSchema);

export default Stat;
