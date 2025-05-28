const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const { validationResult } = require("express-validator");

const app = express();

// Import routes
const authenticationMiddleware = require('./middleware/authenticationMiddleware');
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const eventRouter = require("./routes/event");
const bookingRouter = require("./routes/booking");
const uploadRouter = require("./routes/uploadRoutes");
const forgotPasswordRoutes = require("./routes/forgotPassword");

// Load environment variables
require('dotenv').config();

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later'
});
app.use('/api/', limiter);

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// Cookie parser
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 600 // Cache preflight request for 10 minutes
};
app.use(cors(corsOptions));

// Input validation middleware
const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Public routes
app.use("/api/v1", authRouter);
app.use("/api/v1", forgotPasswordRoutes);
app.use("/api/v1/events", eventRouter);

// Protected routes
app.use("/api/v1/users", authenticationMiddleware, validateRequest, userRouter);
app.use("/api/v1/bookings", authenticationMiddleware, validateRequest, bookingRouter);
app.use("/api/v1/upload", authenticationMiddleware, validateRequest, uploadRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: {
            message: 'Route not found',
            status: 404
        }
    });
});

// MongoDB connection with improved options
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
};

mongoose.connect(process.env.MONGO_URI, mongooseOptions)
    .then(() => {
        console.log('✅ MongoDB connected successfully');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    })
    .catch((err) => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1); // Exit with failure
    });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    // Don't exit the process in production
    if (process.env.NODE_ENV !== 'production') {
        process.exit(1);
    }
});

module.exports = app;