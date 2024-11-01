/* eslint-disable @next/next/no-img-element */
"use client";

import DashboardLayout from '@/components/Dashboard/Layout';
import { useEffect, useState } from 'react';

interface UserData {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  profilePic: string | null;
}

const UserSettingsPage = (props) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [newProfilePic, setNewProfilePic] = useState<File | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUser = localStorage.getItem('userData');
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (!user || !user.id) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      try {
        // Fetch user data
        const response = await fetch(`http://amsha-gen-96609f863a46.herokuapp.com/api/user/${user.id}`);
        const data = await response.json();

        if (response.ok) {
          setUserData(data.data.user);
        } else {
          setError(data.message || 'Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('An error occurred while fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfilePicUpload = async () => {
    setSuccessMessage(null);

    if (!newProfilePic) {
      setError('Please select an image file');
      return;
    }

    const storedUser = localStorage.getItem('userData');
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || !user.id) {
      setError('User not logged in');
      return;
    }

    const formData = new FormData();
    formData.append("file", newProfilePic);

    try {
      const response = await fetch(
        `https://amsha-gen-96609f863a46.herokuapp.com/api/user/profilepic/${user.id}/spring-tut-1`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Profile picture uploaded successfully.');
        setUserData((prev) => prev && { ...prev, profilePic: data.filePath });
      } else {
        setError(data.message || 'Failed to upload profile picture');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setError('An error occurred while uploading profile picture.');
    }
  };

  if (loading) return <p>Loading user settings...</p>;
  if (error) return <p>{error}</p>;

  return (
    <DashboardLayout>
      <div style={{ margin: '0 0 0 200px', fontFamily: 'Arial, sans-serif' }}>
        <h2>User Settings</h2>
        {userData && (
          <div style={{ fontSize: '18px' }}>
            <p><strong>Full Name:</strong> {userData.fullName}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>

            <div style={{ marginTop: '20px' }}>
              <h3>Update Profile Picture</h3>
              {userData.profilePic && (
                <img
                  src={userData.profilePic}
                  alt="Profile"
                  style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                />
              )}
              <input
                type="file"
                onChange={(e) => setNewProfilePic(e.target.files ? e.target.files[0] : null)}
                style={{ marginTop: '10px' }}
              />
              <button onClick={handleProfilePicUpload} style={{ marginTop: '10px' }}>Upload Picture</button>
            </div>

            {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserSettingsPage;
