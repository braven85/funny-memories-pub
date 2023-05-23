import mongoose from 'mongoose';
import modelOptions from './model.options.js';
import dayjs from 'dayjs';

const currentDay = dayjs(Date.now()).format('YYYY-MM-DD');

const creationTime = () => {
  return new Date(dayjs().add(1, 'hour'));
};

export default mongoose.model(
  'Memory',
  mongoose.Schema(
    {
      child: {
        type: String,
        enum: ['chris', 'stewie', 'meg'],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        min: '2015-01-01',
        max: currentDay,
        required: true,
      },
      createdAt: {
        type: Date,
        default: creationTime,
      },
      updatedAt: {
        type: Date,
        default: creationTime,
      },
    },
    modelOptions
  )
);
