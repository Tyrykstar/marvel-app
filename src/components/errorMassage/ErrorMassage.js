import img from './error.gif';
import { useState } from 'react';

const ErrorMassage = (props = img) => {
    console.log(props.i);
    const [srcImg, setSrcImg] = useState(props.i);
    console.log('srcImg', srcImg)
    console.log(img)

    const RenderImg = () => {
        const whatImg = srcImg ? true : false;

        if(whatImg) {
            return (
                <img style={{display: 'block', width: "1000px", height: "400px", objectFit: 'contain', margin: "0 auto"}} 
                src={srcImg} alt="error"/>
            )
        }else {
            return(
                <img style={{display: 'block', width: "250px", height: "250px", objectFit: 'contain', margin: "0 auto"}} 
                src={img} alt="error"/>
            )
        }

    }

    return (
        // srcImg ? (<img style={{display: 'block', width: "1200px", height: "500px", objectFit: 'contain', margin: "0 auto"}} 
        //         src={srcImg} alt="error"/>) : 
        //         (<img style={{display: 'block', width: "250px", height: "250px", objectFit: 'contain', margin: "0 auto"}} 
        //         src={img} alt="error"/>)
        <div>
            <RenderImg/>
        </div>
        // <img src={process.env.PUBLIC_URL + '/error.gif'}/>
    )
}

export default ErrorMassage;