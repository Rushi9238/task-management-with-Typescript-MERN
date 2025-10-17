import { Request, Response, NextFunction } from 'express';
import connectDB from '../../db';
import User from '../../models/User.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../../utils/asyncHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'BIrzvSC8np';

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check validation: there are empty fields
  if (!(name && email && password)) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all fields',
      data: null,
    });
  }

  // Check email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email address',
      data: null,
    });
  }

  // Connect to DB
  await connectDB();

  // Check if the user already exists
  const checkExistUser = await User.findOne({ email });

  if (checkExistUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists',
      data: null,
    });
  }

  // Hash the password using bcrypt
  const hashed = await bcrypt.hash(password, 10);

  // Add user to the database
  const userDetails = await User.create({
    name,
    email,
    password: hashed,
  });

  // Remove password from user response
  const filterUserData = await User.findById(userDetails._id).select('-password -createdAt -__v');

  // Check if the user was created successfully
  if (!filterUserData) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while registering the user',
      data: null,
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      _id: filterUserData._id,
      name: filterUserData.name,
      email: filterUserData.email,
      role: filterUserData.role,
    },
    JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );

  // Set JWT token as a cookie
    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

  // Return the response with user data
  const response = res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: {
        user: filterUserData,
        token: token,
      },
  });

  return response;
});
