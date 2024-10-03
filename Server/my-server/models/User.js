import mongoose from "mongoose";

const isValidPhoneNumber = (v) => {
    return /^\d{10}$.test(v)/
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
mobileNumber: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: isValidPhoneNumber,
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  designation: {
    type: String,
    enum: ['HR', 'Manager', 'Sales'], 
    required: [true, 'Designation is required.'], 
},
gender: {
    type: String,
    enum: ['M', 'F'], 
    required: [true, 'Gender is required.'],
},
courses: {
    type: [String], 
    enum: ['MCA', 'BCA', 'BSC'], 
    required: [true, 'At least one course is required.'], 
},
imgUpload: {
    type: String,
    required: [true, 'Image upload is required.'], 
},
createDate: {
  type: Date,
  default: Date.now, 
},
});

const User = mongoose.model('User', userSchema);
export default User;
