
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const WaitForTransaction = () => {
  const router = useRouter();

  useEffect(() => {
    // Simulate a delay before redirecting the user to the dashboard
    const timer = setTimeout(() => {
      router.push('/dashboard'); // Redirect to the dashboard
    }, 5000); // 5 seconds delay

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <DashboardLayout>
      <div className="wait-container">
        <h2>Please wait while we process your transaction...</h2>
        <p>You will be redirected to your dashboard shortly.</p>

        <style jsx>{`
          .wait-container {
            padding: 20px;
            padding-left: 240px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            text-align: center;
          }

          h2 {
            font-size: 24px;
            font-weight: 600;
            color: #333;
          }

          p {
            font-size: 16px;
            color: #666;
            margin-top: 10px;
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
};

export default WaitForTransaction;
