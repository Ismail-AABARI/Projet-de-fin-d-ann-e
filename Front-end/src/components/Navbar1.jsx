import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { close, logo, menu } from '../assets';
import { navLinks1 } from '../constants';

const Navbar1 = () => {
  const [active, setActive] = useState('Home');
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      {/* <img src={logo} alt="hoobank" className="w-[124px] h-[32px]" /> */}

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks1.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-gray-400" : "text-white"
            } ${index === navLinks1.length - 1 ? "mr-0" : "mr-10"} ${
              nav.id === "dashboard" ? "rounded-[30px] px-[30px] py-[10px] bg-blue-300 text-white font-bold no-underline text-[15px]" : ""
            }`}
            onClick={() => setActive(nav.title)}
          >
            {nav.id === 'dashboard' ? (
              <RouterLink to="/dashboard">{nav.title}</RouterLink>
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
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks1.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? 'text-white' : 'text-dimWhite'
                } ${index === navLinks1.length - 1 ? 'mb-0' : 'mb-4'}`}
                onClick={() => setActive(nav.title)}
              >
                {nav.id === 'dashboard' ? (
                  <RouterLink to="/dashboard">{nav.title}</RouterLink>
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

export default Navbar1;
