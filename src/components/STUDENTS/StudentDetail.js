import React, { useEffect, useState } from 'react';
//import { apiStu } from '../../api/apiConnect';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import { apiStu } from '../../api/apiConnect';

const StudentDetail = (props) => {
    //>==========================> BOOK Borrowed With User <==========================<//
    const [bookBorrowedWithUser, setBookBorrowedWithUser] = useState('');
    const getBookBorrowedWithUser = async () => {
        const response = await apiStu.get('/int/student/getBookBorrow', {
            headers: {
                authorization: props.token,
            },
        });
        return response.data;
    };
    useEffect(() => {
        const getStudent = async () => {
            const data = await getBookBorrowedWithUser();
            if (data) setBookBorrowedWithUser(data);
        };
        getStudent();
    }, []);

    //=======================> CHECK GRADUATE =================//
    const [checkGraduate, setCheckGraduate] = useState('');
    const getCheckGraduate = async () => {
        const response = await apiStu.get('/int/student/checkgraduate', {
            headers: {
                authorization: props.token,
            },
        });
        return response.data;
    };
    useEffect(() => {
        const getStudent = async () => {
            const data = await getCheckGraduate();
            if (data) setCheckGraduate(data);
        };
        getStudent();
    }, []);

    if (props.student != null) {
        return (
            <div className='wrapper'>
                <div className='blog_post_signup'>
                    <div className='row'>
                        <div className='col-4 text-center'>
                            <div className='acc_box_img'>
                                <img
                                    src='https://th.bing.com/th/id/OIP.akW-7gQFLjf0btl1MaoOJQHaI6?pid=ImgDet&rs=1'
                                    alt=''
                                />
                            </div>
                            <h4>Web FrontEnd Developers</h4>
                        </div>
                        <div className='col-8 text-center'>
                            <h3>Information</h3>
                            <Link
                                className='btn__table'
                                to={{
                                    pathname: `/student-list/update-student`,
                                    state: { student: props.student },
                                }}
                            >
                                <i
                                    className='fa fa-pencil-square-o'
                                    aria-hidden='true'
                                ></i>
                            </Link>
                            <hr />
                            <div className='row'>
                                <div className='col-6 text-center'>
                                    <h4>Name:</h4>
                                    <h5>{props.student.name}</h5>
                                </div>
                                <div className='col-6 text-center'>
                                    <h4>Birthday:</h4>
                                    <h5>
                                        {dateFormat(
                                            props.student.dob,
                                            'dd/mm/yyyy'
                                        )}
                                    </h5>
                                </div>
                            </div>
                            <hr />
                            <div className='row'>
                                <div className='col-6 text-center'>
                                    <h4>Gender:</h4>
                                    <h5>{props.student.gender}</h5>
                                </div>
                                <div className='col-6 text-center'>
                                    <h4>Roll Number:</h4>
                                    <h5>{props.student.rollNumber}</h5>
                                </div>
                            </div>
                            <hr />
                            <div className='row'>
                                <div className='col-6 text-center'>
                                    <h4>Status:</h4>
                                    <h5>{props.student.status}</h5>
                                </div>
                                <div className='col-6 text-center'>
                                    <h4>UserName:</h4>
                                    <h5>{props.student.userName}</h5>
                                </div>
                            </div>
                            <hr />

                            {/* <button
                            className='btn__lock_acc'
                            onClick={() => props.deleteAccount(props.users.id)}
                        >
                            <i className="fa fa-lock" aria-hidden="true"></i>{' '}
                            
                        </button> */}
                            <h4>Book Borrowed</h4>
                            <div className='text-info'>
                                {bookBorrowedWithUser}
                            </div>
                            <hr />
                            {checkGraduate == false ? (
                                <div className='check_graduate-false'>
                                    <i
                                        className='fa fa-exclamation-circle text-danger'
                                        aria-hidden='true'
                                    ></i>
                                    <h3>This Student can't Graduate</h3>
                                </div>
                            ) : (
                                <div className='check_graduate-true'>
                                    <i
                                        className='fa fa-check-circle text-success'
                                        aria-hidden='true'
                                    ></i>
                                    <h3>Can Graduate</h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } else return <div></div>;
};

export default StudentDetail;
