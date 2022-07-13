import Image from 'next/image';
import React, { useState } from 'react'
// import styles from '../styles/UploadImg.module.css'


export default function UploadImg() {
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    const previewFile = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setPreviewSource(reader.result);
        }
    }

    const handleSubmitFile = (e) =>{ 
        e.preventDefault();
        if(!previewSource) {
            console.log('returned');
            return};
        uploadImg(previewSource);

    }

    const uploadImg = async(base64EncodedImage) =>{
        console.log(base64EncodedImage);
        try {
            await fetch('/api/photo', {
                method: 'POST',
                body: JSON.stringify({data: base64EncodedImage}),
                headers: {'Content-type': 'application/json'}
            })
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>UploadImg <br/>
    <form onSubmit={handleSubmitFile}>
        <input 
        type='file' name='image' 
        onChange={handleFileInputChange} 
        value={fileInputState} 
        // className={styles.form-input}
        />
        <button 
        // className={styles.btn} 
        type='submit' >Submit</button>
    </form>
    {previewSource && (
        <Image src={previewSource} alt='loadedImg' width={300} height={300}/>
    )}
    </div>
  )
}
