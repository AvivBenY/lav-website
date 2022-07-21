import Image from 'next/image';
import React, { useState } from 'react'
import styles from '../../styles/UploadImg.module.scss'


export default function UploadImg() {
    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [previewSource, setPreviewSource] = useState([]);
    
    const handleFileInputChange = (e) => {
        const files = e.target.files;
        for (const file of files) {            
            previewFile(file);
        }
    }

    const previewFile = (file) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
            setPreviewSource(p => [...p, reader.result]);
        }
    }

    const handleSubmitFile = (e) =>{ 
        e.preventDefault();
        if(!previewSource) {
            console.log('returned');
            return};
        uploadImg(previewSource);
    }

    const uploadImg = async (imagesArray) => {
        console.log(imagesArray);
        try {
            await fetch('/api/photo', {
                method: 'POST',
                body: JSON.stringify({ data: imagesArray }),
                headers: { 'Content-type': 'application/json' }
            })
            location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (


    <div>UploadImg <br/>
    <form onSubmit={handleSubmitFile}>
        <input 
        multiple
        type='file' name='image' 
        onChange={handleFileInputChange} 
        value={fileInputState} 
        // className={styles.form-input}
        />
        <button 
        // className={styles.btn} 
        type='submit' >Submit</button>
    </form>
    {previewSource.length > 0 && previewSource?.map( src =>(
        <Image key={src} src={src} alt='loadedImg' width={300} height={300}/>
    ))}
    </div>


        // <div className={styles.mainDiv}>
        //     <div className={styles.container-upload}>
        //         <div className={styles.upload-box}>
        //             <div className={styles.content}>
        //                 <div className={styles.upload-icon}>
        //                     <Image src="https://res.cloudinary.com/www-santhoshthomas-xyz/image/upload/v1620293451/RapTor/folder_1_ipacc2.png" 
        //                     alt="" width={250} height={250}/>
        //                 </div>

        //                 <h5 className={styles.text}>Drag and Drop Your Files Here</h5>
        //                 <p>Or</p>

        //                 <div className={styles.uploadbtnwrapper}>
        //                     <button className={styles.btn}>Upload</button>
        //                     <input
        //                         type='file' name='image'
        //                         onChange={handleFileInputChange}
        //                         value={fileInputState}/>
        //                 </div>
        //                 {previewSource && (
        //                     <Image src={previewSource} alt='loadedImg' width={300} height={300} />
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </div>
  )
}



    //<div>UploadImg <br/>
    // <form onSubmit={handleSubmitFile}>
    //     <input 
    //     type='file' name='image' 
    //     onChange={handleFileInputChange} 
    //     value={fileInputState} 
    //     // className={styles.form-input}
    //     />
    //     <button 
    //     // className={styles.btn} 
    //     type='submit' >Submit</button>
    // </form>
    // {previewSource && (
    //     <Image src={previewSource} alt='loadedImg' width={300} height={300}/>
    // )}
    // </div>