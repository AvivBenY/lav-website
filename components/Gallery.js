import React, { useEffect, useState } from 'react'
import Image from "next/image"
import styles from '../styles/Gallery.module.css'
import { useSession } from "next-auth/react"
import UploadImg from './admin cmp/UploadImg'

export default function Gallery() {

  const [imageUrls, setimageUrls] = useState(null)
  const { data: session, status: loading } = useSession();

  const loadImages = async () => {
    try {
      const res = await fetch('api/photo');
      const data = await res.json();
      setimageUrls(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loadImages();
  }, [])

  const deletePhoto = async (imgId) => {
    const res = await fetch(`/api/photo?_id=${imgId}`, {
      method: 'DELETE'
    })
    const contactData = await res.json();
    loadImages();

  }

  return (<div>

    {!session ?
      <div className={styles.galleryDiv}>
        {
          !!imageUrls && imageUrls.map(imageUrl => {
            return (
              <div key={imageUrl._id} className={styles.image}>
                <a href={imageUrl.src}><Image
                  alt='cloudinary image'
                  src={imageUrl.src}
                  width={450}
                  height={300}
                /></a>
              </div>)
          })}
      </div> :
      <div>
        <UploadImg />
        <div className={styles.galleryDiv}>
          {
            !!imageUrls && imageUrls.map(imageUrl => {
              return (
                <div key={imageUrl._id} className={styles.image}>
                  <button onClick={() => deletePhoto(imageUrl._id)}>x</button>
                  <a href={imageUrl.src}><Image
                    alt='cloudinary image'
                    src={imageUrl.src}
                    width={450}
                    height={300}
                  /></a>
                </div>)
            })}
        </div>
      </div>
    }
  </div>

  )
}

