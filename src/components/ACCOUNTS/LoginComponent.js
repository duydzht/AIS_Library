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
        this.props.checkUser(this.state)
    };
    render() {
        return (
            <div className='text-center'>
                <div className='wrapper'>
                    <div className='blog_post_signup'>
                        <h1>Login here</h1>
                        <form  className='form__group' onSubmit={this.login}>
                            <input
                                className='form__control mt-2'
                                type='text'
                                name='username'
                                value={this.state.username}
                                placeholder='USER NAME'
                                required=''
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
                                required=''
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
