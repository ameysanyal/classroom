import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
// import authRoutes from './routes/auth'
import principalRoutes from './routes/principal.route.js'
import dotenv from 'dotenv'

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

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


// app.use('/api/auth', authRoutes);
app.use('/api/principal', principalRoutes);
// app.use('/api/teacher', teacherRoutes);
// app.use('/api/student', studentRoutes);


// auth.js: Handles authentication-related routes (login, signup).
// principal.js: Handles routes for the principal (creating classrooms, managing teachers and students).
// teacher.js: Handles routes specific to teacher functionalities (managing their own classroom, viewing and editing students).
// student.js: Handles routes specific to student functionalities (viewing their classroom, interacting with other students).