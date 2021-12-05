import React, { useRef } from 'react';
import SkeletonCard from '../../skeleton/SkeletonCard';
import { Link } from 'react-router-dom';

function LibItem(props) {
    const { product, onAdd } = props;
    return (
        <div className=''>
            <div className='containers'>
                <Link
                    className='card link__react'
                    to={`/library/${product.id}`}
                >
                    <div className='content'>
                        <div className='imgBx'>
                            <img src={product.image} alt='' />
                        </div>
                        <div className='contentBx'>
                            <h3>
                                {product.name}
                                <br />
                                <span>{product.author}</span>
                            </h3>
                        </div>
                    </div>
                    <ul className='sci'>
                        <li>{product.description}</li>
                    </ul>
                </Link>
                <button onClick={() => onAdd(product)} className='btn__signup'>Add To Cart</button>
            </div>
        </div>
    );
}

const Library = (props) => {
    const { books, onAdd } = props;
    const inputEl = useRef('');
    const renderLibrary = books.map((book) => {
        return (
            <section className='col-12 col-md-4 col-lg-3 mt-3' key={book.id}>
                <LibItem key={book.id} product={book} onAdd={onAdd} />
            </section>
        );
    });

    //search
    const getSearchTerm = () => {
        props.searchKeyWord(inputEl.current.value);
    };
    return (
        <>
            <div className='row'>
                <Link to='/add' className='link__react '>
                    <button className='btn_primary mt-3 ml-3'>
                        Add New Book
                    </button>
                </Link>
                <Link to='/basket' className='link__react '>
                    <button className='btn_primary mt-3 ml-3'>
                        Go to Cart
                    </button>
                </Link>


                {/* formsearch */}
                <form className='form__group'>
                    <input
                        ref={inputEl}
                        type='text'
                        value={props.term}
                        onChange={getSearchTerm}
                        placeholder='Search'
                        className='form__control mt-3 ml-2'
                    />
                </form>
            </div>
            <div className='row'>
                {renderLibrary.length > 0
                    ? renderLibrary
                    : [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                          <SkeletonCard key={n} />
                      ))}
            </div>
        </>
    );
};

export default Library;
