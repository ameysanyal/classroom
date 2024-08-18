import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import axios from 'axios'
import principalRoutes from './routes/principal.route.js'
import classroomRoutes from './routes/classroom.route.js'
import loginRoutes from './routes/login.route.js'
import dotenv from 'dotenv'
import cron from 'node-cron';

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

cron.schedule('*/10 * * * *', async () => {
    try {
        const response = await axios.get(`https://classroom-backend-qjs4.onrender.com`);
        console.log(`Pinging backend service, status: ${response.status}`);
    } catch (error) {
        console.error('Error pinging backend service:', error);
    }
});


app.get('/', (req, res) => {
    console.log(req)
    return res.status(255).send('welcome to classroom app backend')
})

// MongoDB Connection
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB Connected')
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch(err => console.log(err));


app.use('/api/login', loginRoutes);
app.use('/api/principal', principalRoutes);
app.use('/api/classroom', classroomRoutes);



