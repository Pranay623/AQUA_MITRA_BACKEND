import express from 'express';
import History from '../models/historymodel.js';

const historyRouter = express.Router();

historyRouter.post('/save', async (req, res) => {
    const { userId, city, state, country, weather, population } = req.body;

    if (!userId || !city || !state || !country) {
        return res.status(400).json({
            status: 'Failed',
            message: 'User ID, city, state, and country are required',
        });
    }
    if (city === 'Ghaziabad') {
        return res.status(200).json({
            status: 'Ignored',
            message: 'History for the city "Ghaziabad" is not saved.',
        });
    }

    try {
        const newHistory = new History({
            userId,
            city,
            state,
            country,
            weather,
            population,
            date: new Date(),
        });

        await newHistory.save();

        res.status(200).json({
            status: 'SUCCESS',
            message: 'History saved successfully',
            data: newHistory,
        });
    } catch (error) {
        console.error('Error saving history:', error);
        res.status(500).json({
            status: 'Failed',
            message: 'An error occurred while saving history',
        });
    }
});

historyRouter.get('/get', async (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({
            status: 'Failed',
            message: 'User ID is required',
        });
    }

    try {
        const history = await History.find({ userId }).sort({ date: -1 });

        if (!history || history.length === 0) {
            return res.status(404).json({
                status: 'Failed',
                message: 'No history found for the user',
            });
        }

        res.status(200).json({
            status: 'SUCCESS',
            data: history,
        });
    } catch (error) {
        console.error('Error retrieving history:', error);
        res.status(500).json({
            status: 'Failed',
            message: 'An error occurred while fetching history',
        });
    }
});

export default historyRouter;
