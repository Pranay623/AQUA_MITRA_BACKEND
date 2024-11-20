import express from 'express';

const pre = express.Router();

pre.post('/predict', async (req, res) => {
    try {
        const { temperature, population } = req.body;

        if (!temperature || !population) {
            return res.status(400).json({ message: 'Temperature and population are required' });
        }

        const waterConsumptionForecast = Math.min((population * 0.5) + (temperature * 0.3), 100);
        const waterAvailabilityPrediction = (population * 0.2) + (temperature * 1000);
        let waterReusePotential = (population * 0.4) / temperature;
        waterReusePotential = Math.max(1, Math.min(waterReusePotential, 100));
        const disasterReserve = Math.min((population * 0.1) + (temperature * 0.05), 100);

        res.json({
            waterConsumptionForecast,   
            waterAvailabilityPrediction,    
            waterReusePotential,        
            disasterReserve             
        });
    } catch (error) {
        console.error('Error calculating predictions:', error);
        res.status(500).json({ message: 'Error while calculating predictions' });
    }
});

export default pre;
