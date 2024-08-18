import React from 'react';

function PrivacyPolicy() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
      <p className="text-lg text-gray-700 mb-4">
        Your privacy is important to us. This privacy policy explains how we collect, use, and safeguard your information when you visit our blog.
      </p>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Information We Collect</h2>
        <p className="text-lg text-gray-700 mb-4">
          We collect various types of information in order to provide and improve our services to you. The types of information we may collect include:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Personal identification information (e.g., name, email address)</li>
          <li>Usage data (e.g., IP address, browser type)</li>
          <li>Cookies and tracking data</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">How We Use Your Information</h2>
        <p className="text-lg text-gray-700 mb-4">
          We may use the information we collect for the following purposes:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>To improve our website and user experience</li>
          <li>To communicate with you, including responding to your inquiries</li>
          <li>To send newsletters and promotional materials (with your consent)</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Data Security</h2>
        <p className="text-lg text-gray-700 mb-4">
          We take the security of your data seriously and implement appropriate technical and organizational measures to protect your information against unauthorized access, loss, or misuse.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Your Rights</h2>
        <p className="text-lg text-gray-700 mb-4">
          You have the right to request access to the personal information we hold about you, to request corrections to any inaccuracies, and to request deletion of your information in certain circumstances.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Changes to This Privacy Policy</h2>
        <p className="text-lg text-gray-700 mb-4">
          We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
        </p>
      </section>

      <footer className="mt-8 text-center">
        <p className="text-lg text-gray-700">
          If you have any questions about this privacy policy, please contact us at
          <a href="mailto:info@example.com" className="text-blue-500 underline">
            info@example.com
          </a>.
        </p>
      </footer>
    </div>
  );
}

export default PrivacyPolicy