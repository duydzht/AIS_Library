import React, { useRef, useEffect, useState } from 'react';
//import SkeletonCard from '../../skeleton/SkeletonCard';
import { Link } from 'react-router-dom';
//import { apiLib } from '../../api/apiConnect';
import { Control, LocalForm } from 'react-redux-form';

function LibItem(props) {
    const { book, onAdd, borrowed, registered } = props;
    const renderButtons = () => {
        if (borrowed.filter((b) => b.id === props.book.id).length > 0) {
            return (
                <div className='text-success'>
                    <i className='fa fa-check-square-o' aria-hidden='true'>
                        {' '}
                        Borrowed
                    </i>
                </div>
            );
        } else if (
            registered.filter((b) => b.id === props.book.id).length > 0
        ) {
            return (
                <div className='text-info'>
                    <i className='fa fa-check' aria-hidden='true'>
                        {' '}
                        Registered
                    </i>
                </div>
            );
        } else {
            return (
                <button
                    onClick={() => onAdd(props.book)}
                    className='btn__signup'
                >
                    <i className='fa fa-plus' aria-hidden='true'></i>
                    <i className='fa fa-shopping-cart' aria-hidden='true'></i>
                </button>
            );
        }
    };
    return (
        <div className=''>
            <div className='containers'>
                <div className='card '>
                    <Link
                        className='content link__react'
                        to={`/library/${book.id}`}
                    >
                        <div className='imgBx'>
                            <img src={book.image} alt='' />
                        </div>
                        <div className='contentBx'>
                            <h3>
                                {book.name}
                                <br />
                                <span>{book.author}</span>
                            </h3>
                        </div>
                    </Link>
                    <ul className='sci'>
                        {/* <li>{book.description}</li> */}
                        <li>{renderButtons()}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

const Library = (props) => {
    const { onAdd, borrowed, registered, library, searchName } = props;

    // =======* GET lại book để hiển thị ngay add, edit *========
    //const [bookList, setBookList] = useState([]);
    // const retrieveBooks = async () => {
    //     const response = await apiLib.get('/ext/book');
    //     return response.data;
    // };
    // useEffect(() => {
    //     const getBook = async () => {
    //         const allBooks = await retrieveBooks();
    //         if (allBooks) setBookList(allBooks);
    //     };
    //     getBook();
    // }, []);
    // ------------------------------------------------------------

    //==================================================//

    const renderLibrary = library.map((book) => {
        if (book.bookStatus === 'ACTIVE') {
            return (
                <div className='col-12 col-md-4 col-lg-3 mt-3' key={book.id}>
                    <LibItem
                        key={book.id}
                        book={book}
                        onAdd={onAdd}
                        borrowed={borrowed}
                        registered={registered}
                    />
                </div>
            );
        } else return '';
    });

    return (
        <>
            <div className='row'>
                <div className='form-group mt-3'>
                    <select className='select__sort'>
                        <option value=''>Sort by</option>
                        <option value='Male'>Name</option>
                        <option value='Female'>Publish Date</option>
                        <option value='Different'>Category</option>
                    </select>
                </div>
                <Link to='/add' className='link__react '>
                    <button className='btn__add mt-3 ml-3'>
                        <i className='fa fa-plus' aria-hidden='true'></i>
                        <i className='fa fa-book' aria-hidden='true'></i>
                    </button>
                </Link>

                <Link to='/basket' className='link__react '>
                    <button className='btn_primary mt-3 ml-3'>
                        <i className='fa fa-shopping-cart'></i>
                    </button>
                </Link>

                {/* formsearch */}
                <LocalForm onSubmit={searchName}>
                    <div className='searchBox'>
                        <Control
                            model='.name'
                            type='text'
                            id='search'
                            name='search'
                            placeholder='Search'
                            className='searchInput'
                        />
                        <button type='submit' className='searchButton'>
                            <i className='fa fa-search' aria-hidden='true'></i>
                        </button>
                    </div>
                </LocalForm>
            </div>
            <div className='row'>
                {renderLibrary}
                {/* {renderLibrary.length > 0
                    ? renderLibrary
                    : [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                          <SkeletonCard key={n} />
                      ))} */}
            </div>
        </>
    );
};

export default Library;
