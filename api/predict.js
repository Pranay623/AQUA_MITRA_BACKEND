import express from 'express';

const pre = express.Router();

pre.post('/predict', async (req, res) => {
    try {
        const { temperature, population } = req.body;

        if (!temperature || !population) {
            return res.status(400).json({ message: 'Temperature and population are required' });
        }

         const waterConsumptionForecast = Math.max(1, (population * 0.1) / Math.sqrt(temperature + 1));
        const waterAvailabilityPrediction = Math.max(1, (population * 0.05) / Math.log(temperature + 2));
        let waterReusePotential = Math.sqrt(population) / (temperature + 1);
        waterReusePotential = Math.max(1, Math.min(waterReusePotential, 100));
        const disasterReserve = Math.max(1, Math.min((population * 0.05) / (temperature + 2), 50));

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
