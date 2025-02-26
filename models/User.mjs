//Dependencies
import mongoose from 'mongoose';

// Define user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  drafts:[
    { 
      body:{type:String },
      updatedAt:{type:Date, default: Date.now}
    }
  ]
},
{
  timestamps:true,
  versionKey:false
});

//Indexing for quicker access by updatedAt field
UserSchema.index({ 'drafts.updatedAt': 1 });

//Instantializing User model for export
const User = mongoose.model('User', UserSchema);

export default User;