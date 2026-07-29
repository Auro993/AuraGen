// backend/src/controllers/heatmapController.js

const BehaviourLog = require('../models/BehaviourLog');

exports.getHeatmapData = async (req, res) => {
  try {
    const { sessionId, page, limit = 100 } = req.query;
    
    const query = {};
    if (sessionId) query.sessionId = sessionId;
    if (page) query['data.page'] = page;
    
    const logs = await BehaviourLog.find(query)
      .sort({ timestamp: -1 })
      .limit(parseInt(limit));

    // Generate heatmap grid
    const gridSize = 20;
    const grid = [];
    for (let y = 0; y < gridSize; y++) {
      grid[y] = [];
      for (let x = 0; x < gridSize; x++) {
        grid[y][x] = 0;
      }
    }

    let totalClicks = 0;
    let totalMovements = 0;
    let totalScrolls = 0;

    logs.forEach(log => {
      const data = log.data || {};
      
      // Click positions
      if (data.clickX !== undefined && data.clickY !== undefined) {
        const x = Math.min(Math.floor(data.clickX / (100 / gridSize)), gridSize - 1);
        const y = Math.min(Math.floor(data.clickY / (100 / gridSize)), gridSize - 1);
        if (x >= 0 && y >= 0 && x < gridSize && y < gridSize) {
          grid[y][x] += 1;
        }
        totalClicks++;
      }
      
      // Mouse movement
      if (data.mouseX !== undefined && data.mouseY !== undefined) {
        totalMovements++;
      }
      
      // Scroll
      if (data.scrollY !== undefined) {
        totalScrolls++;
      }
    });

    // Normalize grid values
    const maxVal = Math.max(...grid.flat(), 1);
    const normalizedGrid = grid.map(row => 
      row.map(val => Number((val / maxVal).toFixed(2)))
    );

    res.json({
      grid: normalizedGrid,
      gridSize: gridSize,
      totalClicks: totalClicks,
      totalMovements: totalMovements,
      totalScrolls: totalScrolls,
      totalEvents: logs.length
    });

  } catch (error) {
    console.error('Error fetching heatmap data:', error);
    // Return empty heatmap on error
    const gridSize = 20;
    const grid = [];
    for (let y = 0; y < gridSize; y++) {
      grid[y] = [];
      for (let x = 0; x < gridSize; x++) {
        grid[y][x] = 0;
      }
    }
    res.json({
      grid: grid,
      gridSize: gridSize,
      totalClicks: 0,
      totalMovements: 0,
      totalScrolls: 0,
      totalEvents: 0
    });
  }
};