const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');

async function checkUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if user exists
    const user = await User.findOne({ email: 'aurosmitsahoo41@gmail.com' });
    
    if (user) {
      console.log('✅ User found:', user.email);
      console.log('User ID:', user._id);
      console.log('Name:', user.name);
      console.log('Password hash exists:', !!user.password);
      console.log('Password hash:', user.password.substring(0, 20) + '...');
    } else {
      console.log('❌ User not found: aurosmitsahoo41@gmail.com');
      console.log('Please register first!');
    }
    
    // List all users
    const allUsers = await User.find({}, 'email name');
    console.log('\n📋 All users in database:');
    allUsers.forEach(u => console.log(`  - ${u.email} (${u.name})`));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

checkUser();