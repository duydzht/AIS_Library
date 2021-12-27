import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    state = {
        username: '',
        password: '',
    };
    login = (e) => {
        e.preventDefault();
        this.props.login(this.state);
    };
    render() {
        return (
            <div className='text-center'>
                <div className='wrapper'>
                    <div className='blog_post_signup'>
                    <img
                        className='btMainLogo'
                        data-hw='4.5277777777778'
                        src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K'
                        alt='AISolutions'
                        width="50px"
                    /> {' '}
                    <span className="logo__login">React-app</span>
                        <form  className='form__group' onSubmit={this.login}>
                            <input
                                className='form__control mt-2'
                                type='text'
                                name='username'
                                value={this.state.username}
                                placeholder='USER NAME'
                                required
                                onChange={(e) =>
                                    this.setState({
                                        username: e.target.value,
                                    })
                                }
                            />
                            <input
                                className='form__control mt-2'
                                type='password'
                                name='password'
                                value={this.state.password}
                                placeholder='PASSWORD'
                                required
                                onChange={(e) =>
                                    this.setState({
                                        password: e.target.value,
                                    })
                                }
                            />
                            <div className=''>
                                <div>
                                    <input
                                        type='checkbox'
                                        value=''
                                        className='m-3'
                                    />
                                    Remember me
                                </div>
                                <Link to='/signup' className='link__react'>
                                    Forgot password?
                                </Link>
                            </div>
                            <button type='submit' className='btn_primary mt-3'>LOGIN</button>
                            <h4>If you don't have Account, Register here</h4>
                        </form>
                        <Link to='/signup'>
                            <button className='btn__signup'>SIGN UP</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}
export default Login;
