import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { NavLink, useHistory } from 'react-router-dom';

const Header = (props) => {
    const history = useHistory();
    const logout = () => {
        // localStorage.removeItem("accessAcc");
        // localStorage.getItem("admin") ? localStorage.removeItem("admin") : localStorage.removeItem("mem");
        // history.replace('/login')
    };

    //=======> ACTIVE LINK <========//

    //====Library ====//
    const Library = () => {
        const match = useRouteMatch({
            path: '/library',
        });
        return (
            <li>
                <NavLink
                    className={match ? 'nav__link active_link' : 'nav__link'}
                    to='/library'
                >
                    <span className='fa fa-list-alt fa-lg'></span> Library
                </NavLink>
            </li>
        );
    };

    //====Administer ====//
    const Administer = () => {
        const match = useRouteMatch({
            path: '/admin',
        });
        return (
            <li>
                <NavLink
                    className={match ? 'nav__link active_link' : 'nav__link'}
                    to='/admin'
                >
                    <span className='fa fa-info-circle fa-lg'></span> Administer
                </NavLink>
            </li>
        );
    };
    
    //==== Student ====//
    const Student = () => {
        const match = useRouteMatch({
            path: '/student-list',
        });
        return (
            <li>
                <NavLink
                    className={match ? 'nav__link active_link' : 'nav__link'}
                    to='/student-list'
                >
                    <span className='fa fa-graduation-cap fa-lg'></span> Student
                </NavLink>
            </li>
        );
    };

    //==== Basket ====//
    const Basket = () => {
        const match = useRouteMatch({
            path: '/basket',
        });
        return (
            <li>
                <NavLink
                    className={match ? 'nav__link active_link' : 'nav__link'}
                    to='/basket'
                >
                    <i className='fa fa-shopping-cart' aria-hidden='true'></i>
                    {props.countCartItems ? (
                        <button className='badge'>
                            {props.countCartItems}
                        </button>
                    ) : (
                        ''
                    )}
                </NavLink>
            </li>
        );
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
                        src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K'
                        alt='AISolutions'
                        width="50px"
                    /> {' '}
                    React-app
                </div>
                <div className='menu'>
                    <ul>
                        <Library />
                        <Administer />
                        <Student />
                        <Basket />
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
