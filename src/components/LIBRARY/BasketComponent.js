import React from 'react';
import { Link } from 'react-router-dom';

const RenderCardItem = (props) => {
    const { book, onRemove } = props;

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
                    <div className='d-flex align-items-center'>
                        <button className='btn' onClick={() => onRemove(book)}>
                            <i className='fa fa-trash mb-1 text-danger'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

function Basket(props) {
    const { cartItems, onAdd, onRemove, regisBook } = props;
    // for(let i=0; i<cartItems.length; i++) {
    //     console.log(cartItems[i].id);
    // }
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
                    <div className='text-center mb-5 mt-5'>
                        <button
                            className='btn__signup'
                            type='button'
                            onClick={() =>{
                                regisBook();
                            }}
                        >
                            Register All
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Basket;
