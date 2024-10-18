import type { NextApiRequest, NextApiResponse } from 'next';

const teamMembers = [
  {
    name: "Samuel Kodilu",
    role: "CEO & Founder",
    image: "/images/team/ceo.jpg",
    description: "Samuel is the visionary behind the company, leading with a passion for innovation and growth.",
  },
  {
    name: "Robert Aundo",
    role: "COO",
    image: "/images/team/coo.jpeg",
    description: "Robert ensures smooth operations and implements strategic plans for company growth.",
  },
  {
    name: "Justine Timberlake Omwenga",
    role: "CFO",
    image: "/images/team/cfo.jpg",
    description: "Justine manages financial planning and risks, ensuring the company’s financial health.",
  },
  {
    name: "Andrew Kyosi",
    role: "Head of Marketing",
    image: "/images/team/head of coporate.jpg",
    description: "Andrew leads our marketing efforts, crafting strategies to enhance brand visibility.",
  },
];

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    // Respond with the team member data
    res.status(200).json(teamMembers);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
