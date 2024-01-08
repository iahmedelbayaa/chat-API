import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlenght: 3, maxlenght: 50 },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide an email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlenght: 6,
    },
},
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
export default User;
