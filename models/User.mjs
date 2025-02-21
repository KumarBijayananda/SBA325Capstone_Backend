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
  drafts:[{ 
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

const User = mongoose.model('User', UserSchema);

export default User;