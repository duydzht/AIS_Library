import React from 'react';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
    render() {
        return (
            <div className='text-center'>
                <div className='wrapper'>
                    <div className='blog_post_signup'>
                        <h1>Register Form</h1>
                        <form action='#' method='post' className='form__group'>
                            <div className=''>
                                <input
                                    className='form__control mt-2'
                                    placeholder='User Name'
                                    type='text'
                                    required
                                />
                            </div>
                            <div className=''>
                                <input
                                    className='form__control mt-2'
                                    placeholder='Email'
                                    type='email'
                                    required
                                />
                            </div>
                            <div className=''>
                                <input
                                    className='form__control mt-2'
                                    placeholder='Password'
                                    type='password'
                                    required
                                />
                            </div>
                            <div className=''>
                                <input
                                    className='form__control mt-2'
                                    placeholder='Confirm Password'
                                    type='password'
                                    required
                                />
                            </div>
                            <div className=''>
                                <input type='checkbox' name='checkbox' className='m-2' />I
                                Accept Terms & Conditions
                            </div>
                            <Link to='/library'>
                                <input
                                    className='btn__signup'
                                    type='submit'
                                    value='REGISTER'
                                />
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;
