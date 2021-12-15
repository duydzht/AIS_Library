import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Header = (props) => {
    const history = useHistory();
    const logout = () => {
        // localStorage.removeItem("accessAcc");
        // localStorage.getItem("admin") ? localStorage.removeItem("admin") : localStorage.removeItem("mem");
        // history.replace('/login')
    };
    return (
        <React.Fragment>
            <nav className='sticky-top'>
                <div className='menu-icon'>
                    <i className='fa fa-bars fa-2x'></i>
                </div>
                <div className='logo'>
                    <img
                        className='btMainLogo'
                        data-hw='4.5277777777778'
                        src='https://aisolutionsjsc.com/wp-content/uploads/2021/07/logo-ai.png'
                        alt='AISolutions'
                        width='250px'
                    />
                </div>
                <div className='menu'>
                    <ul>
                        <li>
                            <NavLink
                                className='nav-link nav__link'
                                to='/library'
                            >
                                <span className='fa fa-list-alt fa-lg'></span>{' '}
                                Library
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='nav-link nav__link' to='/admin'>
                                <span className='fa fa-info-circle fa-lg'></span>{' '}
                                Administer
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className='nav-link nav__link'
                                to='/student-list'
                            >
                                <span className='fa fa-graduation-cap fa-lg'></span>{' '}
                                Student
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className='nav-link nav__link'
                                to='/basket'
                            >
                                <i
                                    className='fa fa-shopping-cart'
                                    aria-hidden='true'
                                ></i>
                                {props.countCartItems ? (
                                    <button className='badge'>
                                        {props.countCartItems}
                                    </button>
                                ) : (
                                    ''
                                )}
                            </NavLink>
                        </li>
                        {/* <li>
                            <NavLink className='nav-link nav__link' to='/login'>
                                <span
                                    onClick={logout}
                                    className='fa fa-sign-out fa-lg'
                                ></span>{' '}
                            </NavLink>
                        </li> */}
                        {/* <li>
                            <NavLink className='nav-link nav__link' to='/information'>
                                <span className='fa fa-user fa-lg'></span>{' '}
                            </NavLink>
                        </li> */}
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
};
export default Header;
