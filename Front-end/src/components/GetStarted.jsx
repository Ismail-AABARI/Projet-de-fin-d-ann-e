import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import styles from "../style";
import { arrowUp } from "../assets";
import './animations.css';

const GetStarted = () => {
  const navigate = useNavigate(); // Initialiser le hook useNavigate

  const handleClick = () => {
    navigate('/register'); // Rediriger vers /register
  };

  return (
    <div
      className={`animated-button ${styles.flexCenter} w-[100px] h-[100px] rounded-full buttons-color p-[2px] cursor-pointer`}
      style={{ background: 'linear-gradient(130deg, #2996de,#e3d6e9)' }}
      onClick={handleClick} // Ajouter l'événement onClick
    >
      <div className={`${styles.flexCenter} flex-col w-[100%] h-[100%] rounded-full`}>
        <div className={`${styles.flexStart} flex-row`}>
          <p className="font-poppins font-medium text-[14px] leading-[18px]">
            <span className="text-white">Get</span>
          </p>
          <img src={arrowUp} alt="arrow-up" className="w-[18px] h-[18px] object-contain rotate-icon" />
        </div>
        <p className="font-poppins font-medium text-[14px] leading-[18px]">
          <span className="text-white">Started</span>
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
