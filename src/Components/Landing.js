import { Fragment } from "react";

const Landing = props =>{
    const { videoStarted, startVideo, stopVideo } = props;
    return(
        <Fragment>
            <h2 className="text-2xl font-bold mb-8 text-gray-600">
                Welcome to the Automatic Age and Gender Classification System!
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
            <div className="space-x-4 p-4">
                <button
                  className={`px-4 py-2 rounded bg-blue-500 text-white ${videoStarted ? 
                    'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={videoStarted}
                  onClick={startVideo}
                >
                  Start Video
                </button>
                <button
                  className={`px-4 py-2 rounded bg-red-500 text-white ${!videoStarted ? 
                    'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!videoStarted}
                  onClick={stopVideo}
                >
                  Stop Video
                </button>
            </div>
        </Fragment>
    );
};

export default Landing;