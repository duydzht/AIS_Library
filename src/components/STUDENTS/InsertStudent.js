import React from 'react';

class InsertStudent extends React.Component {
    state = {
        name: '',
        dob: '',
        gender: '',
        rollNumber: '',
        status: '',
        username:''
    };

    add = (e) => {
        e.preventDefault();
        if (
            this.state.name === '' ||
            this.state.rollNumber === '' ||
            this.state.gender === '' ||
            this.state.status === '' ||
            this.state.dob === ''
        ) {
            alert('ALl the fields are mandatory!');
            return;
        }
        this.props.insertStudent(this.state);
        this.setState({
            name: '',
            dob: '',
            gender: '',
            rollNumber: '',
            status: '',
            username: '',
        });
    };
    render() {
        return (
            <div className='text-center mt-5'>
                <div className='wrapper'>
                    <div className='blog_post_signup'>
                        <h2>Create New Srudent</h2>
                        <form onSubmit={this.add} className='form__group'>
                            <div className='col-10 col-md-6 offset-md-2'>
                                <div>
                                    <label className=''>Full Name:</label>
                                    <input
                                        className='form__control'
                                        type='text'
                                        name='name'
                                        placeholder='Your Full-Name'
                                        value={this.state.name}
                                        onChange={(e) =>
                                            this.setState({
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div>
                                    <label className=''>Date Of Birth:</label>
                                    <input
                                        className='form__control'
                                        type='date'
                                        name='dob'
                                        placeholder='dob'
                                        value={this.state.dob}
                                        onChange={(e) =>
                                            this.setState({
                                                dob: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <div className='form-group'>
                                    <label>Sex:</label>
                                    <select
                                        className='form__control'
                                        value={this.state.gender}
                                        onChange={(e) =>
                                            this.setState({
                                                gender: e.target.value,
                                            })
                                        }
                                    >
                                        <option value=''></option>
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                        <option value='Different'>
                                            Different
                                        </option>
                                    </select>
                                </div>

                                <div className='form-group'>
                                    <label>Status:</label>
                                    <select
                                        className='form__control'
                                        value={this.state.status}
                                        onChange={(e) =>
                                            this.setState({
                                                status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value=''></option>
                                        <option value='ACTIVE'>ACTIVE</option>
                                        <option value='INACTIVE'>
                                            INACTIVE
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label className=''>Roll Number:</label>
                                    <input
                                        className='form__control'
                                        type='text'
                                        name='rollNumber'
                                        placeholder='rollNumber'
                                        value={this.state.rollNumber}
                                        onChange={(e) =>
                                            this.setState({
                                                rollNumber: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className=''>Username:</label>
                                    <input
                                        className='form__control'
                                        type='text'
                                        name='username'
                                        placeholder='username'
                                        value={this.state.username}
                                        onChange={(e) =>
                                            this.setState({
                                                username: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <button className='btn__signup mt-2'>INSERT</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default InsertStudent;
