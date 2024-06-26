import React from "react";
import { Link } from "react-router-dom";
const Button = ({ styles }) => (
  <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-white buttons-color rounded-[10px] outline-none ${styles}`}>
    <Link to="/register" >  Rejoignez-nous</Link>
  </button>
);

export default Button;
