import Calculator from "@/components/calculator/page"; // Adjust the import path as necessary
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: " Amsha Generation",
  description: "Welcome to Amsha Generation, your financial solution.",
  // other metadata
};

const LandingPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Savings Calculator"
        description="Welcome to Amsha Generation, your go-to platform for financial solutions."
      />

      <div style={{ padding: '20px' }}>
        <h2>Our Financial Calculator</h2>
        <Calculator /> {/* Displaying the Calculator component here */}
      </div>
    </>
  );
};

export default LandingPage;
