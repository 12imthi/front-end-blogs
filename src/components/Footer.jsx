import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <h3 className="text-lg font-semibold">Stay Connected</h3>
        <p className="mt-2">Follow us on our social media channels.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <a
            href="https://www.facebook.com/YourPage" // Replace with your Facebook URL
            className="text-gray-400 hover:text-gray-300"
            aria-label="Facebook"
            target="_blank" // Open in a new tab
            rel="noopener noreferrer" // For security
          >
            Facebook
          </a>
          <a
            href="https://twitter.com/YourProfile" // Replace with your Twitter URL
            className="text-gray-400 hover:text-gray-300"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com/YourProfile" // Replace with your Instagram URL
            className="text-gray-400 hover:text-gray-300"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          <a
            href="www.linkedin.com/in/mohamed-imthiyaz-a73948212" // Replace with your LinkedIn URL
            className="text-gray-400 hover:text-gray-300"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
        <div className="mt-4 border-t border-gray-700 pt-4">
          <p className="text-sm">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


export default Footer