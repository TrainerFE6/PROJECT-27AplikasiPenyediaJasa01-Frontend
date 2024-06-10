import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from './Button';
import { FaBars } from "react-icons/fa";
import classes from './Navbar.module.css';
import jasaku from '../assets/jasaku.png';
import { AuthContext } from '../AuthContext';

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const location = useLocation();
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        console.log("Current location:", location.pathname);
    }, [location]);

    const handleToggle = () => {
        setToggle(!toggle);
    }

    const getNavLinkClass = (path) => {
        return location.pathname === path ? classes.active : '';
    }

    return (
        <div>
            <div className={classes.navbar}>
                <Link to="/" className={classes.noUnderline}>
                    <div className={classes.navbarIcon}>
                        <img src={jasaku} alt="Icon Jasaku" />
                        <span>JasaKu</span>
                    </div>
                </Link>
                <div className={classes.navbarList}>
                    <Link to="/" className={`${classes.list} ${getNavLinkClass('/')}`}>
                        Home
                    </Link>
                    <Link to="/catalog" className={`${classes.list} ${getNavLinkClass('/catalog')}`}>
                        Layanan
                    </Link>
                    <Link to="/about" className={`${classes.list} ${getNavLinkClass('/about')}`}>
                        About Us
                    </Link>
                </div>
                <div className={classes.navbarButton}>
                    {isLoggedIn ? (
                        <img src={jasaku} alt="Profile" className={classes.profilePicture} />
                    ) : (
                        <>
                            <Link to="/signup"><SecondaryButton>Register</SecondaryButton></Link>
                            <Link to="/login"><PrimaryButton>Login</PrimaryButton></Link>
                        </>
                    )}
                </div>
                <div className={classes.toggleButton}>
                    <button onClick={handleToggle}>
                        <p>
                            <FaBars />
                        </p>
                    </button>
                </div>
            </div>

            <div className={classes.navMobile} style={{ display: toggle ? 'block' : 'none' }}>
                <div className={classes.navbarListMobile}>
                    <Link to="/" className={`${classes.listMobile} ${getNavLinkClass('/')}`}>
                        Home
                    </Link>
                    <Link to="/catalog" className={`${classes.listMobile} ${getNavLinkClass('/catalog')}`}>
                        Layanan
                    </Link>
                    <Link to="/about" className={`${classes.listMobile} ${getNavLinkClass('/about')}`}>
                        About Us
                    </Link>
                </div>
                <div className={classes.navbarButtonMobile}>
                    {isLoggedIn ? (
                        <img src={jasaku} alt="Profile" className={classes.profilePicture} />
                    ) : (
                        <>
                            <SecondaryButton>Register</SecondaryButton>
                            <PrimaryButton>Login</PrimaryButton>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
