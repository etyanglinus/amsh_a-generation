"use client";
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'; // Make sure to install bcrypt
import jwt from 'jsonwebtoken'; // Make sure to install jsonwebtoken

const prisma = new PrismaClient();

const SECRET_KEY = process.env.JWT_SECRET; // Make sure to define this in your .env

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
      // Find the user in the database
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      // Compare the hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }

      // Create a JWT token (you can add more claims if needed)
      const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: '1h', // Set the expiration time for the token
      });

      // Return the token and user info
      return res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
          // Add other user properties you want to return
        },
      });
    } catch (error) {
      console.error('Error during sign-in:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
