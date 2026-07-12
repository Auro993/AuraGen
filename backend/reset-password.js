const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

async function resetPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Use the EXACT email from the database
    const email = 'aurosmitasahoo41@gmail.com';
    const newPassword = 'Aurosmita@09';
    
    console.log(`🔍 Looking for user: ${email}`);
    
    // Find the user
    const user = await User.findOne({ email: email });
    
    if (!user) {
      console.log(`❌ User not found: ${email}`);
      
      // List all users to help debug
      const allUsers = await User.find({}, 'email');
      console.log('\n📋 All users in database:');
      allUsers.forEach(u => console.log(`  '${u.email}'`));
      
      process.exit(0);
    }
    
    console.log(`✅ User found: ${user.email}`);
    console.log(`👤 User name: ${user.name}`);
    console.log(`🆔 User ID: ${user._id}`);
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update user
    user.password = hashedPassword;
    await user.save();
    
    console.log(`✅ Password reset for ${email}`);
    console.log(`✅ New password: ${newPassword}`);
    
    // Test the password immediately
    const testMatch = await bcrypt.compare(newPassword, user.password);
    console.log(`🔑 Test comparison: ${testMatch ? '✅ SUCCESS' : '❌ FAILED'}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

resetPassword();