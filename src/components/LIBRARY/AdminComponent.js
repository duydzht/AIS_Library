import React from 'react';
import { Link } from 'react-router-dom';

const RegisterItem = (props) => {
    return (
        <div className='col-10 offset-1'>
            <h3>REGISTERED</h3>
            <div className='d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded'>
                <Link className='' to={`/library/${props.rg.id}`}>
                    <div className='mr-1'>
                        <img
                            className='rounded'
                            src={props.rg.image}
                            width={70}
                            height={70}
                            alt=''
                        />
                    </div>
                </Link>
                <div className='d-flex flex-column align-items-center product-details'>
                    <span className='font-weight-bold'>{props.rg.name}</span>
                    <div className='d-flex flex-row product-desc'>
                        <div className='size mr-1'>
                            <span className='text-grey'>Author:</span>
                            <span className='font-weight-bold'>
                                &nbsp;{props.rg.author}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='d-flex align-items-center'>
                    <button
                        className='btn__cancel'
                        type='button'
                        onClick={() => {
                            props.unRegisBook(props.rg.id);
                        }}
                    >
                        UnRegis
                    </button>
                    <button
                        className='btn__borrow'
                        onClick={() => {
                            props.borrowBook(props.rg.id);
                        }}
                    >
                        Borrow
                    </button>
                </div>
            </div>
        </div>
    );
};

const BorrowedItem = (props) => {
    return (
        <div className='col-10 offset-1'>
            <h3>BORROWED</h3>
            <div className='d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded'>
                <Link className='' to={`/library/${props.br.id}`}>
                    <div className='mr-1'>
                        <img
                            className='rounded'
                            src={props.br.image}
                            width={70}
                            height={70}
                            alt=''
                        />
                    </div>
                </Link>
                <div className='d-flex flex-column align-items-center product-details'>
                    <span className='font-weight-bold'>{props.br.name}</span>
                    <div className='d-flex flex-row product-desc'>
                        <div className='size mr-1'>
                            <span className='text-grey'>Author:</span>
                            <span className='font-weight-bold'>
                                &nbsp;{props.br.author}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='d-flex align-items-center'>
                    <button
                        className=' btn__signup mb-3'
                        onClick={() => {
                            props.returnBook(props.br.id);
                        }}
                    >
                        <i
                            className='fa fa-share-square-o'
                            aria-hidden='true'
                        ></i>{' '}
                        Returned Book
                    </button>
                </div>
            </div>
        </div>
    );
};

const Admin = (props) => {
    const renderRegister = props.registered.map((rg) => {
        return (
            <div className='' key={rg.id}>
                <RegisterItem
                    rg={rg}
                    unRegisBook={props.unRegisBook}
                    borrowBook={props.borrowBook}
                />
            </div>
        );
    });
    const renderBorrowed = props.borrowed.map((br) => {
        return (
            <div className='' key={br.id}>
                <BorrowedItem
                    br={br}
                    returnBook={props.returnBook}
                />
            </div>
        );
    });
    return (
        <div className='card__admin text-center'>
            <div className='d-flex justify-content-center row'>
                <div className='col-6'>{renderRegister}</div>
                <div className='col-6'>{renderBorrowed}</div>
            </div>
        </div>
    );
};

export default Admin;
