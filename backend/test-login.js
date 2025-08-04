const User = require('./model/createusermodel');
const bcrypt = require('bcrypt');

async function testLogin() {
  try {
    // Test 1: Check if we can find a user by email
    const testUser = await User.findOne({ where: { email: 'test@gmail.com' } });
    console.log('Test user found:', testUser ? 'Yes' : 'No');
    
    if (testUser) {
      console.log('User details:', {
        id: testUser.id,
        name: testUser.name,
        email: testUser.email,
        role: testUser.role
      });
      
      // Test 2: Test password comparison
      const testPassword = 'password123';
      const isMatch = await bcrypt.compare(testPassword, testUser.password);
      console.log('Password match:', isMatch);
    }
    
    // Test 3: List all users
    const allUsers = await User.findAll();
    console.log('Total users in database:', allUsers.length);
    allUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email})`);
    });
    
  } catch (error) {
    console.error('Test error:', error);
  }
}

testLogin(); 