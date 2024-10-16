const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const secretKey = 'mySecretKey';

app.use(bodyParser.json());
let timeTrackingData = {};
app.post('/start-tracking', (req, res) => {
    const userId = req.body.userId;
    const startTime = new Date();
    timeTrackingData[userId] = { startTime };
    res.json({ message: 'Tracking started' });
});

app.post('/stop-tracking', (req, res) => {
    const userId = req.body.userId;
    const stopTime = new Date();
    const startTime = timeTrackingData[userId].startTime;
    const durationInSeconds = (stopTime - startTime) / 1000;
    res.json({ duration: durationInSeconds });
});
app.post('/calculate-cost', (req, res) => {
    const duration = req.body.duration;
    const costPerSecond = 0.05;  
    const totalCost = duration * costPerSecond;
    res.json({ totalCost });
});
app.post('/generate-invoice', (req, res) => {
    const userId = req.body.userId;
    const totalCost = req.body.totalCost;
    res.json({ message: `Invoice generated for user ${userId}, total cost: ${totalCost}` });
});
app.listen(port, () => {
    console.log(`Billing API running on http://localhost:${port}`);
});
