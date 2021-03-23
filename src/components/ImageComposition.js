import React,{useState} from 'react'

function ImageComposition({main , thumb}) {
    const [index , setIndex] = useState(0)
    const images = [main , ...thumb]
   
    return (
        <div className="composition">
            <div className="composition__main">
                <img src={images[index]} alt=""/>
            </div>
            <div className="composition__thumb">
                {images.map((img, idx) => (
                    <img onMouseOver={() => setIndex(idx)} key={idx} src={img} alt="" />
                ))}
            </div>
        </div>
    )
}

export default ImageComposition

