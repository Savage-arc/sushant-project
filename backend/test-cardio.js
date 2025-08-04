const Cardio = require('./model/cardiomodel');

async function testCardioSessions() {
  try {
    console.log('Testing cardio session functionality...\n');

    // Test 1: Check existing sessions
    console.log('1. Checking existing cardio sessions...');
    const sessions = await Cardio.findAll();
    console.log('Total sessions found:', sessions.length);
    
    if (sessions.length === 0) {
      console.log('No sessions found. Creating test sessions...');
      
      // Create test sessions
      const testSessions = [
        {
          title: "HIIT Workout",
          description: "High-intensity intervals to burn calories fast. 30 seconds sprint and take 20 sec rest and repeat it again.",
          createdBy: 1
        },
        {
          title: "Treadmill Run",
          description: "Endurance cardio using a treadmill for 30 minutes.",
          createdBy: 1
        },
        {
          title: "Jump Rope",
          description: "Quick cardio using a jump rope, 5 sets of 2 minutes.",
          createdBy: 1
        }
      ];
      
      for (const session of testSessions) {
        await Cardio.create(session);
        console.log(`Created session: ${session.title}`);
      }
    } else {
      sessions.forEach((session, index) => {
        console.log(`Session ${index + 1}:`, {
          id: session.id,
          title: session.title,
          description: session.description,
          created_at: session.created_at
        });
      });
    }
    
    console.log('\n✅ Cardio session functionality working correctly!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testCardioSessions(); 