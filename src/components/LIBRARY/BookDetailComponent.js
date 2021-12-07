import React from 'react';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

function RenderStaff(props) {
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
                    {localStorage.getItem('admin') ? <Link
                        className='btn_primary'
                        to={{
                            pathname: `/edit`,
                            state: { book: props.book },
                        }}
                    >
                        EDIT
                    </Link>: ('') }
                    {localStorage.getItem('admin') ? <button
                        className='btn_primary ml-2'
                        onClick={() => props.deleteBook(props.book.id)}
                    >
                        DELETE
                    </button> : ('')}
                    
                </div>
            </div>
        </div>
    );
}

const BookDetail = (props) => {
    const deleteBookHandler = (id) => {
        if (localStorage.getItem('admin')) {
            if (confirm('WARNING: Do you want to delete this book?')) {//eslint-disable-line
                props.deleteBookId(id);
            } else {
                return;
            }
        } else {
            alert('You can not delete this book!');
            return;
        }
    };
    if (props.book != null) {
        return (
            <div className='container'>
                <div>
                    <RenderStaff
                        book={props.book}
                        deleteBook={deleteBookHandler}
                        books={props.books}
                        onAdd={props.onAdd}
                    />
                </div>
            </div>
        );
    } else return <div></div>;
};

export default BookDetail;
