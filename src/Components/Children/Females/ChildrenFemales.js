import { Fragment } from "react";

import { girls } from "../../../Assests/constants/data";

const ChildrenFemales = () =>{

    return(
        <Fragment>
            <h2 className="text-2xl font-bold mb-8 text-gray-600">
                Welcome to the Girls Zone!! Hope You Enjoy Yourself!!!
            </h2>
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-8 text-gray-600">Children Content</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {girls.map((girl, index) => (
                    <div key={index} className="bg-white rounded-lg shadow">
                        <img src={girl.imageSrc} alt={girl.title} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-4">
                        <h2 className="text-lg font-bold mb-2">{girl.title}</h2>
                        <p className="text-gray-700 mb-4">{girl.description}</p>
                        <a href={girl.link} className="text-blue-500 hover:text-blue-700">
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

export default ChildrenFemales;