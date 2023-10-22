import { Fragment } from "react";

import { boys } from "../../../Assests/constants/data";

const ChildrenMales = () =>{

    return(
        <Fragment>
            <h2 className="text-2xl font-bold mb-8 text-gray-600">
                Welcome to the Boys Zone!! Hope You Enjoy Yourself!!!
            </h2>
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-8 text-gray-600">Children Content</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {boys.map((boy, index) => (
                    <div key={index} className="bg-white rounded-lg shadow">
                        <img src={boy.imageSrc} alt={boy.title} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-4">
                        <h2 className="text-lg font-bold mb-2">{boy.title}</h2>
                        <p className="text-gray-700 mb-4">{boy.description}</p>
                        <a href={boy.link} className="text-blue-500 hover:text-blue-700">
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

export default ChildrenMales;