//Dependencies
import mongoose from 'mongoose';

//Define archive schema
const ArchiveSchema = new mongoose.Schema({
      draft_id:String,
      body:{type:String },
      updatedAt:{type:Date, default: Date.now}
});

//Indexing for quicker access by updatedAt field
ArchiveSchema.index({updatedAt:1});

//Instantializing Archive model for export
const Archive = mongoose.model('Archive', ArchiveSchema);

export default Archive;