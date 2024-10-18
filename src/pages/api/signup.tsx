import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, institution, password } = req.body;

    // Validate input
    if (!name || !email || !institution || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      // Check if the email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use.' });
      }

      // Save the new user to the database
      const user = await prisma.user.create({
        data: {
          name,
          email,
          institution,
          password,  // You should hash the password before saving it
        },
      });

      return res.status(201).json({ message: 'Signup successful', user });
    } catch (error) {
      console.error('Error saving user:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
