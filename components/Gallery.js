import React, { useEffect, useState } from 'react'
import Image from "next/image"
import styles from '../styles/Gallery.module.css'

 export default function Gallery() {

   const [imageUrls, setimageUrls] = useState(null)

   useEffect(() => {
     const loadImages = async () => {
       try {
         const res = await fetch('api/photo');
         // const res = await fetch('https:res.cloudinary.com/dlojdpg6j/image/');
         const data = await res.json();
         console.log("DATA", data);
         setimageUrls(data);
       } catch (error) {
         console.log(error);
       }
     }
     loadImages();
   }, [])
   
    return (
      <div className={styles.galleryDiv}>
      
       {
         !!imageUrls && imageUrls.map(imageUrl => {
           return (
           <div key={imageUrl} className={styles.image}>
             <a href={imageUrl}><Image
               alt='cloudinary image'
               src={imageUrl}
               width={450}
               height={300}
             /></a>
           </div>)
         })}
     </div>
   )
}
