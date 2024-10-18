// src/pages/dashboard/resources.tsx

import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { Course, Workshop, FAQ } from '@/types/resources'; // Adjust the import path as necessary

const EducationalResources = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    const fetchEducationalResources = async () => {
      try {
        const response = await fetch('/api/educationalResources');
        const data = await response.json();

        setCourses(data.courses);
        setWorkshops(data.workshops);
        setFaqs(data.faqs);
      } catch (error) {
        console.error('Error fetching educational resources:', error);
      }
    };

    fetchEducationalResources();
  }, []);

  return (
    <DashboardLayout>
      <div className="educational-resources-section">
        <h3>Educational Resources</h3>

        {/* Financial Literacy Courses */}
        <div className="resource-section">
          <h4>Financial Literacy Courses</h4>
          <ul>
            {courses.map((course, index) => (
              <li key={index}>
                <a href={course.link}>{course.title}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Workshops & Webinars */}
        <div className="resource-section">
          <h4>Workshops & Webinars</h4>
          <ul>
            {workshops.map((workshop, index) => (
              <li key={index}>
                <a href={workshop.link}>{workshop.title}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQs */}
        <div className="resource-section">
          <h4>Frequently Asked Questions (FAQs)</h4>
          <ul>
            {faqs.map((faq, index) => (
              <li key={index}>
                <strong>{faq.question}</strong>: {faq.answer}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style jsx>{`
        .educational-resources-section {
          padding: 20px;
          padding-left: 240px;
        }

        h3 {
          font-size: 28px;
          font-weight: 600;
          color: #333;
          margin-bottom: 30px;
          font-family: 'sans-serif';
        }

        .resource-section {
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        h4 {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 15px;
          color: #2c3e50;
          font-family: 'sans-serif';
        }

        ul {
          list-style-type: none;
          padding: 0;
        }

        li {
          margin: 5px 0;
          font-family: 'sans-serif';
        }

        a {
          color: royalblue;
          text-decoration: underline;
        }

        a:hover {
          text-decoration: none;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default EducationalResources;
