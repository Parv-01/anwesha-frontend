import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/gallery.module.css";

import { VintageTV } from "../components/tv/VintageTV";
import { galleryImagesManifest } from "../components/Gallery/galleryImagesManifest";

export default function GalleryPage() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setFadeOut(scrollPosition > window.innerHeight / 9);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ send manifest into TV input format
  const driveLikeImages = galleryImagesManifest.map((url, idx) => ({
    name: `Image ${idx + 1}`,
    url,
  }));

  return (
    <>
      <Head>
        <title>Anwesha 2024 Glimpse</title>
      </Head>

      <div className={styles.container}>
        {/* ✅ Psychedelic animated BG */}
        <div className={styles.psyBackground}>
          <div className={styles.psyGradient}></div>
          <div className={styles.psyParticles}></div>
        </div>

        {/* Fullscreen Text with Fading Effect */}
        <div
          className={`${styles.fullscreenText} ${fadeOut ? styles.fadeOut : ""}`}
        >
          <div className={styles.glimpse}>GLIMPSE</div>
          <div className={styles.anwesha}>
            <span className={styles.anweshaA}>A</span>
            NWESHA
            <span className={styles.anwesha24}>&apos;24</span>
          </div>
        </div>

        {/* ✅ TV ONLY */}
        <div className={styles.tvWrapper}>
          <VintageTV
            images={driveLikeImages}
            youtubeLinks={[
              "https://www.youtube.com/watch?v=S-ukmg7hPnk",
              "https://www.youtube.com/watch?v=FSBZHSo1zVw",
            ]}
          />
        </div>
      </div>
    </>
  );
}
