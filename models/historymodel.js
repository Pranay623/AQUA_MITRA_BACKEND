
import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    weather: {
        temperature: { type: Number}, 
    },
    population: { type: Number, required: false },
    date: { type: Date, default: Date.now },
});

const History = mongoose.model('History', HistorySchema);
export default History;
