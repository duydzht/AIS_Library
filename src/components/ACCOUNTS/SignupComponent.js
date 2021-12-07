import React from 'react';

class Signup extends React.Component {
    state = {
        username: '',
        password: '',
        enabled: true,
        status: 'OK',
        accountNonExpired: true,
        accountNonLocked: true,
        credentialsNonExpired: true,
        authorities: 'mem',
    };
    addAcc = (e) => {
        e.preventDefault();
        if (this.state.username === '' || this.state.password === '') {
            alert('ALl the fields are mandatory!');
            return;
        }
        this.props.addAccount(this.state);
        this.setState({
            username: '',
            password: '',
        });
    };
    render() {
        return (
            <div className='text-center'>
                <div className='wrapper'>
                    <div className='blog_post_signup'>
                        <h1>Register Form</h1>
                        <form onSubmit={this.addAcc} className='form__group'>
                            <div className=''>
                                <div>User Name</div>
                                <input
                                    className='form__control mt-2'
                                    placeholder='User Name'
                                    type='text'
                                    required
                                    value={this.state.username}
                                    onChange={(e) =>
                                        this.setState({
                                            username: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className=''>
                                <div>Password</div>
                                <input
                                    className='form__control mt-2'
                                    placeholder='Password'
                                    type='password'
                                    required
                                    value={this.state.password}
                                    onChange={(e) =>
                                        this.setState({
                                            password: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className=''>
                                <div>Confirm Password</div>
                                <input
                                    className='form__control mt-2'
                                    placeholder='Confirm Password'
                                    type='password'
                                />
                            </div>
                            <div className=''>
                                <input
                                    type='checkbox'
                                    name='checkbox'
                                    className='m-2'
                                />
                                I Accept Terms & Conditions
                            </div>
                            <button className='btn__signup' type='submit'>
                                {' '}
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Signup;
