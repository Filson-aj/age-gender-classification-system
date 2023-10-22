import { useState, useEffect } from "react";

import { loadModels, getFullFaceDescription, createMatcher } from "../API/face";

//import image to text api
const testImg = require('../Assests/images/Peace.JPG');

//import face profile
const JSON_PROFILE = require('../descriptors/bnk48.json');

//Initial State
const INIT_STATE = {
    imageURL: testImg,
    fullDec: null,
    detections: null,
    descriptors: null,
    match: null,
    age: null,
    gender: null,
};

const ImageInput = () =>{
    const [state, setState] = useState(INIT_STATE);
    let drawBox = null;

    if(state.detections){
        drawBox = state.detections.map((detection, i) =>{
            let _H = detection.box.height;
            let _W = detection.box.width;
            let _X = detection.box._x;
            let _Y = detection.box._y;
            return(
                <div key={i}>
                    <div
                        style={{
                            position: 'absolute',
                            border: 'solid',
                            borderColor: 'blue',
                            height: _H,
                            width: _W,
                            transform: `translate(${_X}px, ${_Y}px)`
                        }}>
                            {!!state.match && !!state.match[i] ? (
                                <p
                                    style={{
                                        backgroundColor: 'blue',
                                        border: 'solid',
                                        borderColor: 'blue',
                                        width: _W,
                                        marginTop: 0,
                                        color: '#fff',
                                        transform: `translate(-3px,${_H}px)`
                                    }}>
                                        {state.match[i]._label}<br/>{state.gender[i]}<br/>{Math.round(state.age[i])} Years old
                                    </p>
                            ) : null}
                        </div>
                </div>
            );
        });
    }

    const handleImage = async(image = state.imageURL) =>{
        await getFullFaceDescription(image).then(fullDec =>{
            if(!!fullDec){
                //console.log(fullDesc);
                setState(prevState =>({
                    ...prevState,
                    fullDec,
                    age: fullDec.map(fd => fd.age),
                    gender: fullDec.map(fd => fd.gender),
                    detections: fullDec.map(fd => fd.detection),
                    descriptors: fullDec.map(fd => fd.descriptor),
                }));
            }
        });

        if(!!state.descriptors && !! state.faceMatcher){
            const match = await state.descriptors.map(descriptor => 
                state.faceMatcher.findBestMatch(descriptor));
            setState(prevState => ({...prevState, match}));
        }
    };

    const handleFileChange = async(e) => {
        resetState();
        setState(prevState =>({
            ...prevState,
            imageURL: URL.createObjectURL(e.target.files[0]),
            loading: true,
        }));

        handleImage();
    };

    const resetState = () => setState({...INIT_STATE});

    useEffect(() => {
        const initializeModel = async () => {
            await loadModels();
            setState(async(prevState) => ({
                ...prevState,
                faceMatcher: await createMatcher(JSON_PROFILE),
            }));
            await handleImage(state.imageURL);
        };
        initializeModel();
    }, [JSON_PROFILE, state.imageURL]);

    return (
        <div>
          <input
            id="myFileUpload"
            type="file"
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png"
          />
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute' }}>
              <img src={state.imageURL} alt="imageURL" />
            </div>
            {!!drawBox ? drawBox : null}
          </div>
        </div>
    );
};

export default ImageInput;