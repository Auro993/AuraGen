const GeneratedComponent = require('../models/GeneratedComponent');
const Session = require('../models/Session');

// Generate new UI
exports.generateUI = async (req, res) => {
  try {
    const { sessionId, currentUI, frictionScore } = req.body;
    
    // Simulate AI generation
    const component = new GeneratedComponent({
      sessionId: sessionId,
      userId: req.userId,
      componentName: 'Generated UI',
      status: 'generated',
      beforeFriction: frictionScore || 72,
      afterFriction: Math.floor(Math.random() * 30) + 10,
      changes: ['Reduced Fields', 'Better Layout', 'Improved Typography', 'Simplified Navigation'],
      frictionTrigger: {
        score: frictionScore || 72,
        reason: 'High Cognitive Load'
      }
    });

    await component.save();

    res.json({
      success: true,
      component: component,
      generatedUI: {
        type: 'wizard',
        steps: [
          { question: 'What is your full name?', placeholder: 'Enter your full name' },
          { question: 'What is your email address?', placeholder: 'Enter your email' },
          { question: 'Enter your PAN Number', placeholder: 'Enter PAN' },
          { question: 'What is your annual income?', placeholder: 'Enter income' }
        ]
      }
    });
  } catch (error) {
    console.error('Error generating UI:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all generated UIs
exports.getGeneratedUIs = async (req, res) => {
  try {
    const components = await GeneratedComponent.find()
      .sort({ createdAt: -1 })
      .populate('sessionId', 'userId frictionScore');

    const formatted = components.map(c => ({
      id: c._id,
      version: c.version || '1.0',
      page: c.componentName || 'UI Component',
      generatedOn: c.createdAt,
      before: c.beforeFriction || 72,
      after: c.afterFriction || 32,
      status: c.status || 'Generated',
      changes: c.changes || []
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error fetching generated UIs:', error);
    res.status(500).json({ message: error.message });
  }
};

// Apply generated UI
exports.applyUI = async (req, res) => {
  try {
    const component = await GeneratedComponent.findById(req.params.id);
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }

    component.status = 'applied';
    await component.save();

    res.json({ success: true, message: 'UI applied successfully' });
  } catch (error) {
    console.error('Error applying UI:', error);
    res.status(500).json({ message: error.message });
  }
};