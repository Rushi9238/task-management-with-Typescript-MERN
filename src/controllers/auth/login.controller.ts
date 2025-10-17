import { Request, Response } from 'express';
import connectDB from '../../db';
import User from '../../models/User.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../../utils/asyncHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'BIrzvSC8np';

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { email, password } = await req.body;

    console.log('JWT_SECRET', JWT_SECRET);

    // Check if both email and password are provided
    if (!(email && password)) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in both email and password',
        data: null,
      });
    }

    // Connect to DB
    await connectDB();

    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
        data: null,
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
        data: null,
      });
    }

    // Remove the password field from the user data
    let filterUserData = await User.findById(user._id).select('-password -createdAt -__v');

    // check for filterUserData before proceeding
    if (!filterUserData) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong while fetching user data',
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
    const response = res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: filterUserData,
        token: token,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: null,
    });
  }
});
