import mongoose from 'mongoose';

export const kataEntity = () => {
  const kataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    level: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      required: true
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    valoration: {
      type: Number,
      min: [1, 'The minimum valoration is 1'],
      max: [5, 'The maximum valoration is 5'],
      default: 1,
    },
    peopleWhoRated: {
      type: Number,
      default: 0
    },
    chances: {
      type: Number,
      default: 0,
    },
  });

  return mongoose.models.katas || mongoose.model('Kata', kataSchema);
};
