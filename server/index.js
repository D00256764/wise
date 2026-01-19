require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require('bcryptjs')
const UserModel = require("./models/User")

const app = express()
app.use(express.json())
app.use(cors())

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    console.error('❌ MONGODB_URI is not defined. Please set it in your environment.');
} else {
    mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000,
    })
        .then(() => console.log('✅ Connected to MongoDB'))
        .catch(err => {
            console.error('❌ Connection error:', err);
        });

    mongoose.connection.on('error', err => {
        console.error('MongoDB connection error (event):', err);
    });
}

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

        const user = await UserModel.findOne({ email });
        if (!user) return res.status(400).json({ message: 'No account with that email' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'The password is incorrect' });

        // Successful login — return safe user info
        return res.json({ message: 'Success', user: { name: user.name, email: user.email } });
    } catch (err) {
        console.error('Login error', err);
        return res.status(500).json({ message: 'Server error during login' });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' });

        // Check for existing user
        const existing = await UserModel.findOne({ email });
        if (existing) return res.status(400).json({ message: 'An account with that email already exists' });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const created = await UserModel.create({ name, email, password: hash });
        // Return created user (safe fields only)
        return res.status(201).json({ message: 'Registered', user: { name: created.name, email: created.email } });
    } catch (err) {
        console.error('Register error', err);
        return res.status(500).json({ message: 'Server error during registration' });
    }
});

app.get("/user-stats/:id", (req, res) => {
    res.json({
        lessonsCompleted: 5,
        points: 1250,
        progressData: [
            { date: 'Jan 1', lessonsCompleted: 1 },
            { date: 'Jan 5', lessonsCompleted: 3 },
            { date: 'Jan 10', lessonsCompleted: 5 },
        ]
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});

// Serve client static files when deployed (assumes Vite build output at ../client/dist)
const path = require('path');
const clientDist = path.join(__dirname, '..', 'client', 'dist');

const fs = require('fs');
// Logging to help debug deploys where client build may be missing
console.log('Server __dirname:', __dirname);
console.log('Expected client dist path:', clientDist);
if (fs.existsSync(clientDist)) {
    console.log('Client build found — serving static files from', clientDist);
    try {
        const files = fs.readdirSync(clientDist);
        console.log('Client dist contents:', files);
    } catch (err) {
        console.error('Failed to read client dist contents', err);
    }

    app.use(express.static(clientDist));

    // Return index.html for any unmatched route (client-side routing)
    app.get('*', (req, res) => {
        res.sendFile(path.join(clientDist, 'index.html'));
    });
} else {
    console.log('No client build found at', clientDist);
    // If no client build is present, provide a helpful root message
    app.get('/', (req, res) => {
        res.send('API is running. No client build found.');
    });
}