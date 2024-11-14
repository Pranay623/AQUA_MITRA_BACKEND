import './config/db.js';
import express from 'express';
import cors from 'cors';
const app = express();
const port = 5001;

import router from './api/signup.js';
import signin from './api/signin.js';


app.use(express.json());
app.use(cors());
app.use('/user',router);
app.use('/user',signin);

app.get('/',(req,res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
    console.error("Failed to start server:", err);
});