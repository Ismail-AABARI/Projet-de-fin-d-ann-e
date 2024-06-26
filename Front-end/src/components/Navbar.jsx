import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { close, menu  } from '../assets';
import { navLinks } from '../constants';
import './Navbar.css'
// import { logo } from '../assets';
import newLogo from '../assets/logo5.png'

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar nav">
      <img src={newLogo} alt="" className="w-[280px] h-[75px] newlogo" />

      <ul className={`list-none sm:flex hidden justify-end items-center flex-1 navlinks1 ${toggle ? 'hidden' : 'flex'}`}>
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-gray-200" : "text-white"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"} ${
              nav.id === "login" ? "rounded-[30px] px-[30px] py-[10px] bg-blue-400 text-white font-bold no-underline text-[15px] login" : ""
            }`}
            onClick={() => setActive(nav.title)}
          >
            {nav.id === 'login' ? (
              <RouterLink to="/login">{nav.title}</RouterLink>
            ) : (
              <ScrollLink to={nav.id} smooth={true} duration={500}>{nav.title}</ScrollLink>
            )}
          </li>
        ))}
      </ul>

      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? 'hidden' : 'flex'
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar1`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? 'text-white' : 'text-dimWhite'
                } ${index === navLinks.length - 1 ? 'mb-0' : 'mb-4'}`}
                onClick={() => setActive(nav.title)}
              >
                {nav.id === 'login' ? (
                  <RouterLink to="/login">{nav.title}</RouterLink>
                ) : (
                  <ScrollLink to={nav.id} smooth={true} duration={500}>{nav.title}</ScrollLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

