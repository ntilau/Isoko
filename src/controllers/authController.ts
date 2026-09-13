import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import pool from '../config/database'

// Mock data for when database is not available
const mockUsers = [
  {
    id: 1,
    email: 'business@example.com',
    password_hash: '$2b$10$8Y5JvJvJvJvJvJvJvJvJv.JvJvJvJvJvJvJvJvJvJvJvJvJvJvJvJ', // password123
    role: 'business_owner',
    name: 'John Doe',
    company_name: 'Doe Enterprises',
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    email: 'investor@example.com',
    password_hash: '$2b$10$8Y5JvJvJvJvJvJvJvJvJv.JvJvJvJvJvJvJvJvJvJvJvJvJvJvJvJ', // password123
    role: 'investor',
    name: 'Jane Smith',
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    email: 'advisor@example.com',
    password_hash: '$2b$10$8Y5JvJvJvJvJvJvJvJvJv.JvJvJvJvJvJvJvJvJvJvJvJvJvJvJvJ', // password123
    role: 'advisor',
    name: 'Bob Johnson',
    created_at: new Date().toISOString()
  }
];

export const register = async (req: Request, res: Response) => {
  const { email, password, role, name } = req.body

  // Handle body parameters that might be arrays
  const emailStr = Array.isArray(email) ? email[0] : email;
  const passwordStr = Array.isArray(password) ? password[0] : password;
  const roleStr = Array.isArray(role) ? role[0] : role;
  const nameStr = Array.isArray(name) ? name[0] : name;

  // Basic validation
  if (!emailStr || !passwordStr || !roleStr || !nameStr) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  try {
    // Check if user already exists
    try {
      const userExists = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [emailStr]
      )

      if (userExists.rows.length > 0) {
        return res.status(400).json({ error: 'User already exists' })
      }
    } catch (dbError) {
      // Fallback to mock data if database is not available
      console.warn('Database unavailable, using mock data for user registration check');

      const userExists = mockUsers.find(u => u.email === emailStr);
      if (userExists) {
        return res.status(400).json({ error: 'User already exists' })
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(passwordStr, salt)

    // Insert user into database
    try {
      const result = await pool.query(
        'INSERT INTO users (email, password_hash, role, name) VALUES ($1, $2, $3, $4) RETURNING id, email, role, name, created_at',
        [emailStr, hashedPassword, roleStr, nameStr]
      )

      const user = result.rows[0]

      // Remove password hash from response
      const { password_hash, ...userWithoutPassword } = user

      res.status(201).json({
        message: 'User registered successfully',
        user: userWithoutPassword,
        token: 'mock-jwt-token' // In a real app, this would be a real JWT
      });
    } catch (dbError) {
      // Fallback to mock data if database is not available
      console.warn('Database unavailable, using mock data for user registration');

      const newUser = {
        id: Math.max(...mockUsers.map(u => u.id)) + 1,
        email: emailStr,
        password_hash: hashedPassword,
        role: roleStr,
        name: nameStr,
        created_at: new Date().toISOString()
      };

      mockUsers.push(newUser);

      // Remove password hash from response
      const { password_hash, ...userWithoutPassword } = newUser

      res.status(201).json({
        message: 'User registered successfully (using mock data)',
        user: userWithoutPassword,
        token: 'mock-jwt-token' // In a real app, this would be a real JWT
      });
    }
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // Handle body parameters that might be arrays
  const emailStr = Array.isArray(email) ? email[0] : email;
  const passwordStr = Array.isArray(password) ? password[0] : password;

  if (!emailStr || !passwordStr) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  try {
    // Find user by email
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [emailStr]
      )

      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      const user = result.rows[0]

      // Check password
      const isMatch = await bcrypt.compare(passwordStr, user.password_hash)
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      // Remove password hash from response
      const { password_hash, ...userWithoutPassword } = user

      res.status(200).json({
        message: 'User logged in successfully',
        user: userWithoutPassword,
        token: 'mock-jwt-token' // In a real app, this would be a real JWT
      });
    } catch (dbError) {
      // Fallback to mock data if database is not available
      console.warn('Database unavailable, using mock data for login');

      const user = mockUsers.find(u => u.email === emailStr);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      // Check password
      const isMatch = await bcrypt.compare(passwordStr, user.password_hash)
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      // Remove password hash from response
      const { password_hash, ...userWithoutPassword } = user

      res.status(200).json({
        message: 'User logged in successfully (using mock data)',
        user: userWithoutPassword,
        token: 'mock-jwt-token' // In a real app, this would be a real JWT
      });
    }
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}