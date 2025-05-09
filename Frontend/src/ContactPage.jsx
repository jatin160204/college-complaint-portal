import React from 'react';
import Navbar from "./Navbar";


const ContactPage = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
            <Navbar />

      <h2 className="text-2xl font-bold mb-4"> Contact Information</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold"> College Contact</h3>
        <p className="text-gray-700 mt-2">
          XYZ College,<br />
          123 College Road,<br />
          City, State - 000000<br />
          Phone: (123) 456-7890<br />
          Email: info@xyzcollege.edu
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold"> Admin Contact</h3>
        <p className="text-gray-700 mt-2">
          Name: Mr. Admin Kumar<br />
          Email: admin@xyzcollege.edu<br />
          Phone: (987) 654-3210
        </p>
      </section>
    </div>
  );
};

export default ContactPage;
