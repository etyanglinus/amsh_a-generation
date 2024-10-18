export default function handler(req, res) {
    if (req.method === 'GET') {
      const courses = [
        { title: 'Budgeting Basics', link: '#' },
        { title: 'Investing 101', link: '#' },
        { title: 'Managing Credit', link: '#' },
      ];
  
      const workshops = [
        { title: 'How to Build Credit', link: '#' },
        { title: 'Navigating Life After College', link: '#' },
      ];
  
      const faqs = [
        { question: 'What is a budget?', answer: 'A budget is a plan that helps you manage your money.' },
        { question: 'How can I start saving?', answer: 'Start by setting a savings goal and creating a plan to reach it.' },
      ];
  
      // Send the data as a response
      res.status(200).json({ courses, workshops, faqs });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  