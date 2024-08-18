import React from 'react';

function About() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">About Our Blog</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to our blog! Here, we share insights, stories, and tips that inspire and inform our readers.
        Our mission is to create a community where everyone can find valuable information on topics they care about.
      </p>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-4">
          Our mission is to curate high-quality content that entertains and educates. We strive to engage with our audience and provide them with the tools they need to thrive in their everyday lives.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Meet the Author</h2>
        <div className="flex items-center">
          <img
            src="path/to/your/image.jpg" 
            alt="Author"
            className="w-24 h-24 rounded-full border-2 border-gray-300 mr-4"
          />
          <div>
            <h3 className="text-xl font-bold">John Doe</h3>
            <p className="text-lg text-gray-700">
              John is a passionate writer who loves sharing knowledge and insights on various topics. With over 10 years of experience in the blogging field, he aims to build a platform that connects and inspires others.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
        <p className="text-lg text-gray-700 mb-4">
          We envision a world where knowledge is shared freely and everyone has access to the information they seek. Our blog serves as a catalyst for discussion, learning, and growth.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Get Involved</h2>
        <p className="text-lg text-gray-700">
          We love hearing from our readers! Feel free to reach out to us with ideas, feedback, or if you’d like to contribute to our blog. Your voice matters, and together, we can make a difference.
        </p>
      </section>

      <div className="mt-8 text-center">
        <a 
          href="/contact" // Link to your contact page
          className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}

export default About;