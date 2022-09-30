import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import "./Nav.css"

function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect( () => {
    window.addEventListener("scroll", () => {
      if(window.scrollY > 50){
        setShow(true);
      } else{
        setShow(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  return (
    <nav className={`nav ${show && "nav__black"} `}>
        <img 
          alt='Netfilx logo'
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/170px-Netflix_2015_logo.svg.png"
          className='nav__logo'
          onClick={() => window.location.reload()}
        />

        <input value={searchValue} onChange={handleChange} className="nav__input" type="text" placeholder='영화를 검색해 주세요.'/>

        { <img
          alt='User logged'
          src='https://w7.pngwing.com/pngs/18/3/png-transparent-netflix-logo-icon.png'
          className='nav__avatar'
        />}
    </nav>
  )
}

export default Nav
