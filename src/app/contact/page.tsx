import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Amsha Generation",
  description: "This is Contact Page for Startup Nextjs Template",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="At Amsha Generation, we value your feedback and are here to assist you with any questions or concerns you may have. Whether you're looking for more information about our services, need assistance with your account, or just want to share your thoughts, please don’t hesitate to get in touch."
      />

      <Contact />
    </>
  );
};

export default ContactPage;
