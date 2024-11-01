"use client";

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' instead of 'next/router'
import { useState } from 'react';

const SigninPage = () => {
  const router = useRouter(); // Updated to use the App Router's navigation
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('https://amsha-gen-96609f863a46.herokuapp.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in cookies
        Cookies.set('token', data.data.user.token, { expires: 1 }); // Expires in 1 day

        // Save the user data in localStorage
        localStorage.setItem("userData", JSON.stringify(data.data.user));

        setSuccessMessage('Signin successful! Redirecting to dashboard...');
        
        // Redirect to the dashboard
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        setError(data.message || 'Signin failed!');
      }
    } catch (error) {
      console.error('Signin error:', error);
      setError('An error occurred during signin.');
    }
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Sign into your account
                </h3>
                
                {/* Signin Form */}
                <form onSubmit={handleSignin}>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-6">
                    <button
                      type="submit"
                      className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                {/* Error and Success Messages */}
                {error && <p className="text-center text-red-500">{error}</p>}
                {successMessage && (
                  <p className="text-center text-green-500">{successMessage}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SigninPage;
