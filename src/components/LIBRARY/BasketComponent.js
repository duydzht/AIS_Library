import React from 'react';
import { Link } from 'react-router-dom';

const RenderCardItem = (props) => {
    const { book, onAdd, onRemove } = props;

    return (
        <div className='d-flex justify-content-center row'>
            <div className='col-md-8'>
                <div className='d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded'>
                    <Link className='' to={`/library/${book.id}`}>
                        <div className='mr-1'>
                            <img
                                className='rounded'
                                src={book.image}
                                width={70}
                                height={70}
                                alt=''
                            />
                        </div>
                    </Link>
                    <div className='d-flex flex-column align-items-center product-details'>
                        <span className='font-weight-bold'>{book.name}</span>
                        <div className='d-flex flex-row product-desc'>
                            <div className='size mr-1'>
                                <span className='text-grey'>Author:</span>
                                <span className='font-weight-bold'>
                                    &nbsp;{book.author}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex flex-row align-items-center qty'>
                        <i
                            className='fa fa-minus text-danger'
                            onClick={() => onRemove(book)}
                        />
                        <h5 className='text-grey mt-1 mr-1 ml-1'>{book.qty}</h5>
                        <i
                            className='fa fa-plus text-success'
                            onClick={() => onAdd(book)}
                        />
                    </div>

                    <div className='d-flex align-items-center'>
                        <i className='fa fa-trash mb-1 text-danger' />
                    </div>
                </div>
            </div>
        </div>
    );
};

function Basket(props) {
    const { cartItems, onAdd, onRemove } = props;

    return (
        <div className=''>
            <div className='mt-2'>
                <div className='p-2 m-auto text-center basket__book'>
                    <h3>
                        <i
                            className='fa fa-shopping-basket'
                            aria-hidden='true'
                        ></i>{' '}
                        Basket Book
                    </h3>
                </div>
            </div>
            {cartItems.length === 0 && (
                <div className='text-center' style={{ height: '500px' }}>
                    <div className='text-danger'>
                        <h3>Basket book is empty!</h3>
                    </div>
                </div>
            )}

            {cartItems.map((item) => (
                <RenderCardItem book={item} onAdd={onAdd} onRemove={onRemove} />
            ))}

            {cartItems.length !== 0 && (
                <>
                    <div className='text-center'>
                        <div className='mt-4 mb-4'>
                            <div className='d-flex col-md-7 m-auto p-2 bg-white rounded'>
                                <input
                                    type='text'
                                    className='form-control border-0 gift-card'
                                    placeholder='discount code/gift card'
                                />
                                <button
                                    className='btn btn-outline-warning btn-sm ml-2'
                                    type='button'
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='text-center mb-5'>
                        <button
                            className='btn__signup'
                            type='button'
                            onClick={() =>
                                alert('The request was successfully sent..!')
                            }
                        >
                            Register Borrow
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Basket;
