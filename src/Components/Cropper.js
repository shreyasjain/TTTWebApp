import React, { useState } from 'react'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/lib/ReactCrop.scss';

function Cropper() {
    const [src,selectFile] = useState("")
    
    const handleFileChange = (e) => {
        selectFile(URL.createObjectURL(e.target.files[0]))
    }

    const [image,setImage] = useState(null)
    const [crop,setCrop] = useState({aspect: 1/1})
    const [result,setResult] = useState(null)

    function getCroppedImg() {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
       
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height,
        );
        const base64Image = canvas.toDataURL('image/jpeg');
        // canvas.toBlob(blob =>{
            setResult(base64Image)
        // })
    }
    
    return (
        <div className="cropper-container">
            <div style={{"flex-direction":"column"}} className="row">
            <div className="col-6">
            <form>
                <input className="cropper-input" type="file" accept="image/*" onChange={handleFileChange} />
            </form>
            </div>
            {src && <div className="col-6">
                <ReactCrop src={src} onImageLoaded={setImage} crop={crop} onChange={setCrop}/>
                <button onClick={getCroppedImg}>Click me</button>
            </div>   }
            {result && 
            <div className="col-6">
                hi
                <img src={result} alt="cropped image" className="img-fluid" />
            </div>
            }
            </div>
        </div>
    )
}

export default Cropper
