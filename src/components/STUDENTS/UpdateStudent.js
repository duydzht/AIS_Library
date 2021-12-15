import React from 'react';

class UpdateStudent extends React.Component {
    constructor(props) {
        super(props);
        const { id, name, dob, gender, rollNumber, status, userName } =
            props.location.state.student;
        this.state = {
            id,
            name,
            dob,
            gender,
            rollNumber,
            status,
            userName
        };
    }

    
    update = (e) => {
        e.preventDefault();
        if (
            this.state.name === '' ||
            this.state.rollNumber === '' ||
            this.state.gender === '' ||
            this.state.status === '' ||
            this.state.userName === '' ||
            this.state.dob === ''
        ) {
            alert('ALl the fields are mandatory!');
            return;
        }
        this.props.updateStudentHandler(this.state);
        this.setState({
            name: '',
            dob: '',
            gender: '',
            rollNumber: '',
            status: '',
            userName: '',
        });
        this.props.history.push('/student-list');
    };
    render() {
        return (
            <div className='text-center mt-5'>
                <div className='wrapper'>
                    <div className='blog_post_signup'>
                        <h2>Update Student</h2>
                        <form onSubmit={this.update} className='form__group'>
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
                                        name='userName'
                                        placeholder='userName'
                                        value={this.state.userName}
                                        onChange={(e) =>
                                            this.setState({
                                                userName: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <button className='btn__signup mt-2'>UPDATE</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateStudent;
