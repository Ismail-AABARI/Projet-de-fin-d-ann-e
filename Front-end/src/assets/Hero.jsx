import styles from "../style";
import { discount, robot } from "../assets";
import GetStarted from "./GetStarted"; // Assurez-vous que le chemin est correct
import Produit from "../assets/produitpng.png";
import Charts from '../assets/marketing.png';
import Customer from '../assets/Customers.png';
import { useEffect, useState } from "react";

const Hero = () => {
  const [heroCount , setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount(count => (count === 2 ? 0 : count + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const images = [Produit, Charts ,Customer]; // Liste des images
  return (
    <>
      <section className={`flex md:flex-row flex-col ${styles.paddingY}`}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 text-white div-top navlinks`}>
          <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
            <img src={discount} alt="discount" className="w-[32px] h-[32px]" />
            <p className={`${styles.paragraph} ml-2`}>
              <span className="title-colores">20%</span> Reduction pour{" "}
              <span className="title-colores">1ere</span> Analyse
            </p>
          </div>

          <div className="flex flex-row justify-between items-center w-full">
            <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] title-color ss:leading-[100.8px] leading-[75px] title-colores">
              Optimisez vos <span className="commande">Commandes</span> <br className="sm:block hidden" />{" "}
              <span className="title-colores">avec notre service.</span>{" "}
            </h1>
            <div className="ss:flex hidden md:mr-4 mr-0">
              <GetStarted /> {/* Ajout du composant GetStarted ici */}
            </div>
          </div>

          <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] title-color ss:leading-[100.8px] leading-[75px] w-full">
          </h1>
          <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Augmentez vos gains grâce à notre analyse approfondie des commandes.
          </p>
        </div>

        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        {/*   <img src={Charts} alt="billing" className={`w-[80%] h-[70%] relative z-[5] images-card`} /> */}
          <img src={images[heroCount]} alt="billing" className={`w-[80%] h-[70%] relative z-[5] images-card ${images[heroCount] === Charts ? 'images-cards' : ''} ${images[heroCount] === Produit ? 'image-card' : ''}`} />
          {/* gradient start */}
          <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
          <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
          <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
          {/* gradient end */}
        </div>
        <div className={`ss:hidden ${styles.flexCenter} designer`}>
          <GetStarted /> {/* Ajout du composant GetStarted ici */}
        </div>
      </section>
    </>
  );
};

export default Hero;
