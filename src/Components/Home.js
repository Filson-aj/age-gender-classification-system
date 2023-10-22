import React from 'react';
import 'tailwindcss/tailwind.css';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 py-4">
        <h1 className="text-4xl font-bold text-center">SmartAds: Personalized Advertising</h1>
      </header>
      <main className="flex-grow flex  bg-gray-200">
        <aside className="w-2/5 bg-gray-200 px-2 border-t border-b">
            <div className="mb-2">
                <h2 className="text-lg font-bold text-gray-800">Video Feed</h2>
                <div className="bg-gray-50 h-64 rounded shadow"></div> {/* Placeholder for video feed */}
            </div>
            <div className='mb-2'>
                <h2 className="text-lg font-bold text-gray-800">Detected Information</h2>
                <div className="bg-gray-50 h-64 rounded shadow text-gray-800 items-left">
                    <div className="p-4 border-b border-gray-200">
                        <strong>Age:</strong> <span>25 years</span>
                    </div>
                    <div className="p-4 border-b border-gray-200">
                        <strong>Category:</strong> <span>Young Adult</span>
                    </div>
                    <div className="p-4 border-b border-gray-200">
                        <strong>Gender:</strong> <span>Male</span>
                    </div>
                </div> {/* Placeholder for detected information */}
            </div>
        </aside>
        <section className="flex-grow p-8 bg-white rounded shadow m-4">
            <h2 className="text-2xl font-bold mb-8 text-gray-600">
            Welcome to the Gender and Age Classification System!
          </h2>
          <p className="text-lg text-gray-800">
            Our cutting-edge system leverages advanced technologies, including TensorFlow.js, to accurately classify
            the gender and age of individuals in real-time. By analyzing facial features and expressions, our system
            provides valuable insights that can revolutionize how you deliver content-specific advertisements.
          </p>
          <p className="text-lg text-gray-800 mt-4">
            With gender and age classification, you can tailor your advertisements to target specific demographics
            effectively. By understanding the gender and age of your audience, you can create personalized and engaging
            content that resonates with their interests, preferences, and needs.
          </p>
          <button className="px-6 py-3 rounded bg-blue-500 text-white text-lg shadow hover:bg-blue-600">
            Start Application
          </button>
        </section>
      </main>
      <footer className="bg-gray-700 py-4 text-center">
        <p>© 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
