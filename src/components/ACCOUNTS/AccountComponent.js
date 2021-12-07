import React from 'react';

const Account = (props) => {
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
                        <hr />
                        <div className='row'>
                            <div className='col-6 text-center'>
                                <h4>Username:</h4>
                                <h5>{props.users.username}</h5>
                            </div>
                            <div className='col-6 text-center'>
                                <h4>Password:</h4>
                                <h5>{props.users.password}</h5>
                            </div>
                        </div>
                        <hr />
                        <div className='row'>
                            <div className='col-6 text-center'>
                                <h4>Authorities:</h4>
                                <h5>{props.users.authorities}</h5>
                            </div>
                            <div className='col-6 text-center'>
                                <h4>Status:</h4>
                                <h5>{props.users.status}</h5>
                            </div>
                        </div>
                        <hr />
                        <button
                            className='btn__lock_acc'
                            onClick={() => props.deleteAccount(props.users.id)}
                        >
                            <i className="fa fa-lock" aria-hidden="true"></i>{' '}
                            
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
