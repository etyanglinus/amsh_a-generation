// pages/api/communitySupport.js
export default function handler(req, res) {
    if (req.method === 'GET') {
      const savingsGroups = [
        { name: 'Graduation Trip Fund', description: 'Join to save collectively for an unforgettable graduation trip!' },
        { name: 'Emergency Fund Pool', description: 'Contribute to a shared fund to help members in need.' },
        { name: 'First Job Outfits', description: 'Save together for essential work attire for your first job.' },
      ];
  
      const discussionTopics = [
        { title: 'Budgeting Tips', description: 'Share your best strategies for budgeting as a student.' },
        { title: 'Saving for Emergencies', description: 'Discuss how to build an emergency fund effectively.' },
        { title: 'Investing Basics', description: 'Ask questions and share resources on getting started with investing.' },
      ];
  
      // Send the data as a response
      res.status(200).json({ savingsGroups, discussionTopics });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  