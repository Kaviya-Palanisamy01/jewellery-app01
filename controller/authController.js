import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendEmailOTP, sendSMSOTP } from '../utils/otp.js';
import nodemailer from 'nodemailer';

dotenv.config();

// @desc    Register user
// @route   POST /fullstack/signup
// @access  Public
export const registerUber = async (req, res) => {
    try {
        const { firstName, lastName, phone, email, password, confirmPassword, role } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !phone || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Email validation
        const emailPattern = /^[^@\s]+@[^@\s]+\.(com|in|edu)$/i;
        if (!emailPattern.test(email)) {
            return res.status(400).json({ message: 'Email must be valid and end with .com, .in, or .edu' });
        }
        // Password validation
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{7,9}$/;
        if (!passwordPattern.test(password)) {
            return res.status(400).json({ message: 'Password must be 7-9 characters, include uppercase, lowercase, number, and special character' });
        }

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user (no OTP, no verification)
        await User.create({
            firstName,
            lastName,
            phone,
            email,
            password,
            role // allow role to be set from request body
        });

        res.status(201).json({
            success: true,
            message: 'Registration successful. You can now log in.'
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Login user
// @route   POST /fullstack/login
// @access  Public
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide an email and password' });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if account is locked
        if (user.isLocked) {
            await sendActivationEmail(user.email, user._id);
            return res.status(403).json({ message: 'Account is locked due to multiple failed login attempts. Activation link sent to your email.' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
            if (user.failedLoginAttempts >= 3) {
                user.isLocked = true;
                await sendActivationEmail(user.email, user._id);
            }
            await user.save();
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        user.failedLoginAttempts = 0;
        await user.save();

        sendTokenResponse(user, 200, res);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Helper to send activation email
const sendActivationEmail = async (email, userId) => {
    const activationLink = `${process.env.FRONTEND_URL}/activate-account/${userId}`;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Account Activation',
        html: `<p>Your account has been locked due to multiple failed login attempts.</p><p>Click <a href="${activationLink}">here</a> to activate your account.</p>`
    });
};

// @desc    Activate locked account
// @route   POST /fullstack/activate-account
// @access  Public
export const activateAccount = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.isLocked = false;
        user.failedLoginAttempts = 0;
        await user.save();
        res.status(200).json({ success: true, message: 'Account activated. You can now log in.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get current logged in user
// @route   GET /fullstack/me
// @access  Private
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    res.status(statusCode).json({
        success: true,
        token,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            role: user.role
        }
    });
};
