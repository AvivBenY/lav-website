import Glide from "@glidejs/glide";
import React, { useCallback, useEffect, useState } from "react";
import "../styles/UploadImg.module.scss";
import styles from "../styles/Gallery.module.css";
import Image from "next/image";
import { useInfo } from "../Context/Context";
import UploadImg from "./adminCmp/UploadImg";
import { useSession } from "next-auth/react";

export default function Gallery() {
  const { photos, setPhotos } = useInfo();
  const { data: session, status: loading } = useSession();
  const [isMobile, setIsMobile] = useState(false);

  const loadImages = useCallback(async () => {
    try {
      const res = await fetch("api/photo");
      const data = await res.json();
      setPhotos(data);
    } catch (error) {
      console.log(error);
    }
  }, [setPhotos]);

  const deleteImage = async (imgId) => {
    const res = await fetch(`/api/photo?_id=${imgId}`, {
      method: "DELETE",
    });
    const contactData = await res.json();
    loadImages();
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 600) {
        setIsMobile(true);
      }
    }
  }, []);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  useEffect(() => {
    if (photos.length > 0) {
      console.log(photos);
      new Glide(".glide", {
        type: "slider",
        autoplay: 2000,
        hoverpause: true,
        perView: 3,
        gap: 10,
      }).mount();
    }
  }, [photos.length]);

  const imgStyle = {
    width: "500px",
    height: "500px",
  };

  return (
    <>
      {!session ? (
        <div className={styles.galleryDiv}>
          <div
            className={"glide"}
            style={{ paddingTop: "5px", paddingRight: "0px" }}
          >
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {photos.length > 0 &&
                  photos.map((photo) => {
                    return (
                      <li
                        className={["glide__slide"] + " " + [styles.slide]}
                        key={photo._id}
                      >
                        <a href={photo.src}>
                          <Image
                            alt="cloudinary image"
                            src={photo.src}
                            width={isMobile ? 1000 : 550}
                            height={isMobile ? 1000 : 550}
                          />
                        </a>
                      </li>
                    );
                  })}
              </ul>
              <div
                // style={{ paddingLeft: "50%" }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: "70px",
                }}
                className="glide__arrows"
                data-glide-el="controls"
              >
                <a className="glide_arrow glide_arrow--left" data-glide-dir="<">
                  <Image
                    alt="cloudinary image"
                    src="/leftArrow.png"
                    width={25}
                    height={25}
                  />
                </a>
                <a
                  className="glide_arrow glide_arrow--right"
                  data-glide-dir=">"
                >
                  <Image
                    alt="cloudinary image"
                    src="/rightArrow.png"
                    width={25}
                    height={25}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.galleryDiv}>
          <UploadImg />
          <div
            className={"glide"}
            style={{ paddingTop: "5px", paddingRight: "0px" }}
          >
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                {photos.length > 0 &&
                  photos.map((photo) => {
                    return (
                      <li
                        className={["glide__slide"] + " " + [styles.slide]}
                        key={photo._id}
                      >
                        <button
                          className={styles.removeBtn}
                          onClick={() => deleteImage(photo._id)}
                        >
                          x
                        </button>
                        <a href={photo.src}>
                          <Image
                            alt="cloudinary image"
                            src={photo.src}
                            width={450}
                            height={450}
                          />
                        </a>
                      </li>
                    );
                  })}
              </ul>
              <div
                style={{ paddingLeft: "50%" }}
                className="glide__arrows"
                data-glide-el="controls"
              >
                <a className="glide_arrow glide_arrow--left" data-glide-dir="<">
                  ⋘
                </a>
                <a
                  className="glide_arrow glide_arrow--right"
                  data-glide-dir=">"
                >
                  ⋙
                </a>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}

//
//   return (
//     <div className={styles.galleryDiv}>
//       <div className={"glide"} style={{ paddingTop: "5px", paddingRight: "0px" }}>
//         <div className="glide__track" data-glide-el="track">

//           <ul className="glide__slides">
//             {photos.length > 0 && photos.map(photo => {
//               return (

//                 <li className={["glide__slide"] + " " + [styles.slide]} key={photo._id}>
//                   <a href={photo.src}><Image
//                     alt='cloudinary image'
//                     src={photo.src}
//                     width={450}
//                     height={450}
//                   /></a>
//                 </li>
//               )
//             })}

//           </ul>
//               {/* ARROWS */}
//           {/* <div className="glide__arrows" data-glide-el="controls">
//             <button
//               className="glide_arrow glide_arrow--left"
//               data-glide-dir="<"
//             >
//               prev
//             </button>
//             <button
//               className="glide_arrow glide_arrow--right"
//               data-glide-dir=">"
//             >
//               next
//             </button>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react'
// import Image from "next/image"
// import styles from '../styles/Gallery.module.css'
// import { useSession } from "next-auth/react"
// import UploadImg from './admin cmp/UploadImg'

// export default function Gallery(){}

//   const [imageUrls, setimageUrls] = useState(null)
//   const { data: session, status: loading } = useSession();

//   const loadImages = async () => {
//     try {
//       const res = await fetch('api/photo');
//       const data = await res.json();
//       setimageUrls(data);
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   useEffect(() => {
//     loadImages();
//   }, [])

//   const deletePhoto = async (imgId) => {
//     const res = await fetch(`/api/photo?_id=${imgId}`, {
//       method: 'DELETE'
//     })
//     const contactData = await res.json();
//     loadImages();

//   }

//   return (<div>

//     {!session ?
//       <div className={styles.galleryDiv}>
//         {
//           !!imageUrls && imageUrls.map(imageUrl => {
//             return (
//               <div key={imageUrl._id} className={styles.image}>
//                 <a href={imageUrl.src}><Image
//                   alt='cloudinary image'
//                   src={imageUrl.src}
//                   width={450}
//                   height={300}
//                 /></a>
//               </div>)
//           })}
//       </div> :
//       <div>
//         <UploadImg />
//         <div className={styles.galleryDiv}>
//           {
//             !!imageUrls && imageUrls.map(imageUrl => {
//               return (
//                 <div key={imageUrl._id} className={styles.image}>
//                   <button onClick={() => deletePhoto(imageUrl._id)}>x</button>
//                   <a href={imageUrl.src}><Image
//                     alt='cloudinary image'
//                     src={imageUrl.src}
//                     width={450}
//                     height={300}
//                   /></a>
//                 </div>)
//             })}
//         </div>
//       </div>
//     }
//   </div>

//   )
// }
