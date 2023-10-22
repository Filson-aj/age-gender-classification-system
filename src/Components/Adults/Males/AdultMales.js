import { Fragment } from "react";

import { men } from "../../../Assests/constants/data";

const AdultMales = () =>{

    return(
        <Fragment>
            <h2 className="text-2xl font-bold mb-8 text-gray-600">
                Welcome to the Men Zone!! Hope You Enjoy Yourself!!!
            </h2>
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-8 text-gray-600">Adults Content</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {men.map((man, index) => (
                    <div key={index} className="bg-white rounded-lg shadow">
                        <img src={man.imageSrc} alt={man.title} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-4">
                        <h2 className="text-lg font-bold mb-2">{man.title}</h2>
                        <p className="text-gray-700 mb-4">{man.description}</p>
                        <a href={man.link} className="text-blue-500 hover:text-blue-700">
                            Read More
                        </a>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </Fragment>
    );
};

export default AdultMales;