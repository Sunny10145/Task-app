require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const APPS_SCRIPT_URL = process.env.APPS_SCRIPT_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // index.html, styles.css serve kar

// Proxy to Apps Script
app.get('/getTasksData', async (req, res) => {
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?action=getTasksData`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
