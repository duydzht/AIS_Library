import React from 'react';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

function RenderBook(props) {
    const renderButtons = () => {
        if (props.borrowed.filter((b) => b.id === props.book.id).length > 0) {
            return (
                <button
                    className=' btn__signup mb-3'
                    onClick={() => {
                        props.returnBook(props.book.id);
                    }}
                >
                    <i className='fa fa-share-square-o' aria-hidden='true'></i>{' '}
                    Returned Book
                </button>
            );
        } else if (props.registered.filter((b) => b.id === props.book.id).length > 0) {
            return (
                <div>
                    <button
                        className='btn__cancel mb-3'
                        type='button'
                        onClick={() => {
                            props.unRegisBook(props.book.id);
                        }}
                    >
                        UnRegis
                    </button>
                    <button
                        className='btn__borrow'
                        onClick={() => {
                            props.borrowBook(props.book.id);
                        }}
                    >
                        Borrow
                    </button>
                </div>
            );
        } else {
            return (
                <button
                    onClick={() => props.onAdd(props.book)}
                    className='btn__signup mb-3'
                >
                    <i className='fa fa-plus' aria-hidden='true'></i>
                    <i className='fa fa-shopping-cart' aria-hidden='true'></i>
                </button>
            );
        }
    };

    return (
        <div className='container'>
            <div className='wrapper'>
                <div className='blog_post'>
                    <div className='img_pod'>
                        <img src={props.book.image} alt={props.book.name} />
                    </div>
                    <div className='container_copy'>
                        <h3>
                            Publish:{' '}
                            {dateFormat(
                                props.book.publishDate,
                                'dd/mm/yyyy h:MM TT'
                            )}
                        </h3>
                        <h1>{props.book.name}</h1>
                        <h3>{props.book.author}</h3>
                        <h5>Status: {props.book.bookStatus}</h5>
                        <h4>Page Number: {props.book.pageNumber}</h4>
                        <h4>Quantity: {props.book.quantity} (bk)</h4>
                        <h4>Category: {props.book.category}</h4>
                        <p>{props.book.description}</p>
                    </div>
                    <div className='text-center'>
                        {renderButtons()}
                        <br />
                        <Link
                            className='btn__add'
                            to={{
                                pathname: `/edit`,
                                state: { book: props.book },
                            }}
                        >
                            <i
                                className='fa fa-pencil-square-o'
                                aria-hidden='true'
                            ></i>
                        </Link>
                        <button
                            className='btn__add ml-2'
                            onClick={() => props.deleteBook(props.book.id)}
                        >
                            <i className='fa fa-trash' aria-hidden='true'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const BookDetail = (props) => {
    const deleteBookHandler = (id) => {
        const conFirm = confirm('WARNING: Do you want to delete this book?'); //eslint-disable-line
        if (conFirm === true) {
            props.deleteBookId(id);
        } else {
            return;
        }
    };
    if (props.book != null) {
        return (
            <div className='container'>
                <div>
                    <RenderBook
                        book={props.book}
                        deleteBook={deleteBookHandler}
                        books={props.books}
                        onAdd={props.onAdd}
                        regisBook={props.regisBook}
                        unRegisBook={props.unRegisBook}
                        borrowBook={props.borrowBook}
                        returnBook={props.returnBook}
                        registered={props.registered}
                        borrowed={props.borrowed}
                    />
                </div>
            </div>
        );
    } else return <div></div>;
};

export default BookDetail;
