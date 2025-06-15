import mongoose from 'mongoose';

const VisitorSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true
    },
    visitedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    collection: 'visitors',
    timestamps: false
  }
);

const visitorModel= mongoose.model('Visitor', VisitorSchema);

export default visitorModel;