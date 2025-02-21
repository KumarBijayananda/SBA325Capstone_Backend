//Dependencies
import mongoose from 'mongoose';

//Define archive schema
const ArchiveSchema = new mongoose.Schema({
    draft_id:Number,
  archived_draft:[{ 
    id:Number,
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
    },
    }
  ]
});

const Archive = mongoose.model('Archive', ArchiveSchema);

export default Archive;