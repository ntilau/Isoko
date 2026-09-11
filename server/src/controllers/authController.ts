import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  const { email, password, role, name } = req.body;
  // In a real app, we would validate the input, hash the password, and save to the database
  // For now, we'll just return a success message with the user data (without password)
  const user = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    role,
    name
  };
  res.status(201).json({
    message: 'User registered successfully',
    user,
    token: 'mock-jwt-token'
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  // In a real app, we would validate the credentials and return a JWT
  // For now, we'll just return a success message with mock user data
  const user = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    role: 'business_owner', // In a real app, this would come from the database
    name: email.split('@')[0] // Just for mock
  };
  res.status(200).json({
    message: 'User logged in successfully',
    user,
    token: 'mock-jwt-token'
  });
};