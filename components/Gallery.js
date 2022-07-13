import React, { useEffect, useState } from 'react'
import { Image, Transformation } from "cloudinary-react";


export default function Gallery() {
  const [imageIds, setimageIds] = useState()

  const loadImages = async () => {
    try {
      const res = await fetch('api/photo');
      const data = await res.json();
      console.log("DATA", data);
      setimageIds(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadImages();
  }, [])

  return (
    <div>Gallery<br />
      {imageIds && imageIds.map((imageId, index) => {
        <div>
          <Image key={index}
            cloudName='dlojdpg6j'
            alt='didntLoad'
            publicId={imageId}>

          </Image>
        </div>
      })}
    </div>
  )
}
