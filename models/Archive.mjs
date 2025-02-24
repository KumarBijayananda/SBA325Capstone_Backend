//Dependencies
import mongoose from 'mongoose';

//Define archive schema
const ArchiveSchema = new mongoose.Schema({
      draft_id:String,
      body:{type:String },
      updatedAt:{type:Date, default: Date.now}
});

const Archive = mongoose.model('Archive', ArchiveSchema);

export default Archive;