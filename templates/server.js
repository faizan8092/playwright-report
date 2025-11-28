const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4141;

app.use(cors());
app.use(express.json());

// API to get list of all test result files
app.get('/api/test-runs', (req, res) => {
  const testResultsDir = path.join(__dirname, '../test-data');
  
  try {
    if (!fs.existsSync(testResultsDir)) {
      return res.json([]);
    }

    const files = fs.readdirSync(testResultsDir)
      .filter(file => file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(testResultsDir, file);
        const stats = fs.statSync(filePath);
        
        // Extract timestamp from filename
        const timestamp = file.match(/results-(\d+)\.json/)?.[1];
        
        return {
          id: file,
          filename: file,
          timestamp: timestamp ? parseInt(timestamp) : stats.mtimeMs,
          date: new Date(timestamp ? parseInt(timestamp) : stats.mtimeMs).toLocaleString(),
          size: stats.size
        };
      })
      .sort((a, b) => b.timestamp - a.timestamp);
    
    res.json(files);
  } catch (error) {
    console.error('Error reading test results:', error);
    res.status(500).json({ error: 'Failed to read test results' });
  }
});

// API to get specific test result details
app.get('/api/test-runs/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../test-data', req.params.filename);
  
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading test result:', error);
    res.status(404).json({ error: 'Test result not found' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Test results server running on http://localhost:${PORT}`);
});
