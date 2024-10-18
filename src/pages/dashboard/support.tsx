import { useEffect, useState } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';
import { SavingsGroup, DiscussionTopic } from '@/types/communitySupport'; // Adjust the import path as necessary

const CommunitySupport = () => {
  const [savingsGroups, setSavingsGroups] = useState<SavingsGroup[]>([]);
  const [discussionTopics, setDiscussionTopics] = useState<DiscussionTopic[]>([]);

  useEffect(() => {
    const fetchCommunitySupport = async () => {
      try {
        const response = await fetch('/api/communitySupport');
        const data = await response.json();

        setSavingsGroups(data.savingsGroups);
        setDiscussionTopics(data.discussionTopics);
      } catch (error) {
        console.error('Error fetching community support data:', error);
      }
    };

    fetchCommunitySupport();
  }, []);

  return (
    <DashboardLayout>
      <div className="community-support">
        <h3>Community & Peer Support</h3>

        {/* Savings Groups Section */}
        <div className="section savings-groups">
          <h4>Savings Groups</h4>
          <ul>
            {savingsGroups.map((group, index) => (
              <li key={index}>
                <strong>{group.name}</strong>: {group.description}
              </li>
            ))}
          </ul>
        </div>

        {/* Discussion Forums Section */}
        <div className="section discussion-forums">
          <h4>Discussion Forums</h4>
          <ul>
            {discussionTopics.map((topic, index) => (
              <li key={index}>
                <strong>{topic.title}</strong>: {topic.description}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Styling */}
      <style jsx>{`
        .community-support {
          padding: 20px;
          padding-left: 250px; /* Padding from the sidebar */
          font-family: 'sans-serif';
        }

        h3 {
          font-size: 28px;
          font-weight: 600;
          color: #333;
          margin-bottom: 30px;
        }

        .section {
          background-color: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 30px;
        }

        h4 {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 15px;
          color: #2c3e50;
        }

        ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        li {
          margin: 5px 0;
          font-size: 16px;
        }

        strong {
          color: #2980b9;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default CommunitySupport;
