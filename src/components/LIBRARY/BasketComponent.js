import React from 'react';
import { Link } from 'react-router-dom';

const RenderCardItem = (props) => {
    const { book, onAdd, onRemove } = props;

    return (
        <div className=''>
            <div className='containers'>
                <div className='card'>
                    <Link className='link__react' to={`/library/${book.id}`}>
                        <div className='content'>
                            <div className='imgBx'>
                                <img src={book.image} alt='' />
                            </div>
                            <div className='contentBx'>
                                <h3>
                                    {book.name}
                                    <br />
                                    <span>Quantity: {book.qty}</span>
                                </h3>
                            </div>
                        </div>
                    </Link>
                    <ul className='sci'>
                        <li>
                            <div className='row'>
                                <button
                                    onClick={() => onRemove(book)}
                                    className='btn__signup'
                                >
                                    -
                                </button>{' '}
                                <button
                                    onClick={() => onAdd(book)}
                                    className='btn__signup'
                                >
                                    +
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

function Basket(props) {
    const { cartItems, onAdd, onRemove } = props;

    return (
        <div className='text-center'>
            <h2 className='text-light'>BASKET BOOK</h2>
            <div>
                {cartItems.length === 0 && 
                <div className='text-center' style={{height:'500px'}}>
                    <div className="text-light">
                        <h3>Basket book is empty!</h3>
                    </div>
                </div>}
                <div className='row'>
                    {cartItems.map((item) => (
                        <section className='col-12 col-md-3 mt-3' key={item.id}>
                            <RenderCardItem
                                book={item}
                                onAdd={onAdd}
                                onRemove={onRemove}
                            />
                        </section>
                    ))}
                </div>

                {cartItems.length !== 0 && (
                    <>
                        <div className=''>
                            <button
                                className='btn_primary'
                                onClick={() =>
                                    alert(
                                        'The request was successfully sent..!'
                                    )
                                }
                            >
                                Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Basket;
