import mongoose from 'mongoose';

export const kataEntity = () => {
  const kataSchema = new mongoose.Schema({
    name: String,
    description: String,
    level: Number,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    valoration: {
      type: Number,
      min: 1,
      max: 5,
    },
    chances: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  });

  return mongoose.model('Kata', kataSchema);
};
