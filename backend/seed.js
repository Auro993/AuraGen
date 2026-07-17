const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');
const Session = require('./src/models/Session');
const FrictionScore = require('./src/models/FrictionScore');
const GeneratedComponent = require('./src/models/GeneratedComponent');
const BehaviourLog = require('./src/models/BehaviourLog');

async function seedDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await User.deleteMany({});
    await Session.deleteMany({});
    await FrictionScore.deleteMany({});
    await GeneratedComponent.deleteMany({});
    await BehaviourLog.deleteMany({});
    console.log('✅ Cleared existing data');

    // Create test user
    console.log('👤 Creating test user...');
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });
    await user.save();
    console.log('✅ Test user created:', user.email);

    // Generate sample sessions
    console.log('📊 Generating sample sessions...');
    const pages = ['Dashboard', 'Pricing', 'Checkout', 'Profile', 'Settings', 'Analytics', 'Features'];
    const statuses = ['active', 'completed', 'abandoned', 'in-progress'];
    
    const sessions = [];
    
    for (let i = 0; i < 50; i++) {
      const frictionScore = Math.floor(Math.random() * 60) + 20;
      const startTime = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
      const endTime = new Date(startTime.getTime() + Math.random() * 30 * 60 * 1000);
      const duration = Math.floor((endTime - startTime) / 1000);
      
      const session = new Session({
        userId: user._id,
        startTime: startTime,
        endTime: endTime,
        duration: duration,
        frictionScore: frictionScore,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        metrics: {
          mouseMovements: Math.floor(Math.random() * 100),
          clicks: Math.floor(Math.random() * 50),
          errors: Math.floor(Math.random() * 10),
          hesitationTime: Math.floor(Math.random() * 30),
          rageClicks: Math.floor(Math.random() * 5),
          mouseDistance: Math.floor(Math.random() * 2000),
          idleTime: Math.floor(Math.random() * 30),
          wrongClicks: Math.floor(Math.random() * 10)
        },
        visitedPages: pages.slice(0, Math.floor(Math.random() * 4) + 2).map(page => ({
          page: page,
          time: new Date(),
          duration: Math.floor(Math.random() * 60)
        })),
        device: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)],
        browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][Math.floor(Math.random() * 4)]
      });
      
      await session.save();
      sessions.push(session);

      // Create friction score for each session
      const frictionScoreDoc = new FrictionScore({
        sessionId: session._id,
        userId: user._id,
        score: frictionScore,
        level: frictionScore > 70 ? 'high' : frictionScore > 40 ? 'medium' : 'low',
        factors: {
          mouseSpeed: Math.random() * 100,
          hesitationTime: Math.random() * 30,
          errorRate: Math.random() * 20,
          rageClicks: Math.random() * 5,
          idleTime: Math.random() * 30,
          wrongClicks: Math.random() * 10
        },
        timestamp: startTime
      });
      await frictionScoreDoc.save();

      // Create behavior logs for each session
      const eventTypes = ['mouse_move', 'click', 'rage_click', 'scroll', 'idle', 'hover', 'page_change'];
      for (let j = 0; j < 5; j++) {
        const log = new BehaviourLog({
          sessionId: session._id,
          userId: user._id,
          eventType: eventTypes[Math.floor(Math.random() * eventTypes.length)],
          data: {
            x: Math.floor(Math.random() * 1920),
            y: Math.floor(Math.random() * 1080),
            scrollDepth: Math.floor(Math.random() * 100),
            element: ['button', 'input', 'link', 'div'][Math.floor(Math.random() * 4)],
            duration: Math.floor(Math.random() * 30),
            page: pages[Math.floor(Math.random() * pages.length)]
          },
          timestamp: new Date(startTime.getTime() + Math.random() * 30 * 60 * 1000)
        });
        await log.save();
      }
    }
    console.log(`✅ Created ${sessions.length} sample sessions`);

    // Generate sample generated components
    console.log('🎨 Generating sample UI components...');
    const componentNames = ['Wizard Form', 'Small Form', 'Top 1% Form', 'Search Form', 'Contact Form', 'Pricing Wizard', 'Checkout Flow'];
    const changesList = [
      ['Reduced Fields', 'Better Layout', 'Improved Typography'],
      ['Step-by-Step Form', 'Better Contrast', 'Simplified Navigation'],
      ['Reduced Clutter', 'Better Hierarchy', 'Progress Indicator'],
      ['Cleaner Design', 'Better Button Placement', 'Less Scrolling'],
      ['Improved Readability', 'Better Color Scheme', 'Responsive Design']
    ];
    
    for (let i = 0; i < 20; i++) {
      const session = sessions[Math.floor(Math.random() * sessions.length)];
      const beforeFriction = Math.floor(Math.random() * 60) + 30;
      const afterFriction = Math.floor(Math.random() * 30) + 10;
      
      const component = new GeneratedComponent({
        sessionId: session._id,
        userId: user._id,
        version: `1.${i}`,
        componentName: componentNames[Math.floor(Math.random() * componentNames.length)],
        status: ['generated', 'validated', 'applied'][Math.floor(Math.random() * 3)],
        beforeFriction: beforeFriction,
        afterFriction: afterFriction,
        changes: changesList[Math.floor(Math.random() * changesList.length)],
        frictionTrigger: {
          score: beforeFriction,
          reason: ['High Cognitive Load', 'Too Many Fields', 'Complex Process', 'Cluttered Interface'][Math.floor(Math.random() * 4)]
        },
        metadata: {
          timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
          model: ['Gemini', 'GPT-4', 'Claude'][Math.floor(Math.random() * 3)],
          generationTime: Math.random() * 3 + 1
        }
      });
      await component.save();
    }
    console.log('✅ Created sample UI components');

    console.log('\n🎉 Database seeded successfully!');
    console.log('📊 Summary:');
    console.log(`  - Users: 1`);
    console.log(`  - Sessions: ${sessions.length}`);
    console.log(`  - Friction Scores: ${sessions.length}`);
    console.log(`  - Behavior Logs: ${sessions.length * 5}`);
    console.log(`  - Generated Components: 20`);
    console.log('\n🔑 Test user credentials:');
    console.log('  Email: test@example.com');
    console.log('  Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();