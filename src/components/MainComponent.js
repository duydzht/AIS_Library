import React, { useState, useEffect } from 'react';
import Login from './ACCOUNTS/LoginComponent';
import Signup from './ACCOUNTS/SignupComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {
    Switch,
    Route,
    Redirect,
    withRouter,
    useHistory,
} from 'react-router-dom';
import Library from './LIBRARY/LibraryComponent';
import BookDetail from './LIBRARY/BookDetailComponent';
import Basket from './LIBRARY/BasketComponent';
import AddBook from './CRUD/AddBookComponent';
import api from '../api/apiConnect';
import UpdateBook from './CRUD/UpdateBookComponent';
import Account from './ACCOUNTS/AccountComponent';

function Main() {
    // Library
    const [libraryState, setLibraryState] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const history = useHistory();
    //Account
    const [accounts, setAccounts] = useState([]);

    //=> GET Accounts
    const retrieveAccount = async () => {
        const response = await api.get('/account');
        return response.data;
    };
    useEffect(() => {
        const getAccount = () => {
            setTimeout(async () => {
                const allAccounts = await retrieveAccount();
                if (allAccounts) setAccounts(allAccounts);
            }, 2000);
        };
        getAccount();
    }, []);

    // ==> Login
    const loginHandler = (acc) => {
        const accTrue = accounts.find(
            (x) => x.username === acc.username && x.password === acc.password
        );
        if (accTrue) {
            alert('Login successful!');
            history.replace('/library');
            localStorage.setItem('accessAcc', true);
            if (accTrue.authorities === 'admin') {
                localStorage.setItem('admin', true);
                return;
            } else {
                localStorage.setItem('mem', true);
                return;
            }
        } else {
            alert('Login failed! Please check your username or password');
            return;
        }
    };

    const [users, setUsers] = useState([])
    const checkUser = (u) =>{
        const access = accounts.find(
            (a) => a.username === u.username && a.password === u.password
        );
        if(access) setUsers(access)
    }

    //=> GETBooks
    const retrieveBooks = async () => {
        const response = await api.get('/books');
        return response.data;
    };
    useEffect(() => {
        const getBook = () => {
            setTimeout(async () => {
                const allBooks = await retrieveBooks();
                if (allBooks) setLibraryState(allBooks);
            }, 2000);
        };
        getBook();
    }, []);

    //Add & remove book from Cart
    const books = libraryState;
    const [cartItems, setCartItems] = useState([]);
    const onAdd = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
            if (confirm('Vật phẩm đã có trong rỏ, bạn muốn thêm?')) {//eslint-disable-line
                setCartItems(
                    cartItems.map((x) =>
                        x.id === product.id
                            ? { ...exist, qty: exist.qty + 1 }
                            : x
                    )
                );
            }
        } else {
            alert('Add to basket SUCCESSFUL');
            setCartItems([...cartItems, { ...product, qty: 1 }]);
        }
    };
    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.qty === 1) {
            setCartItems(cartItems.filter((x) => x.id !== product.id));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
                )
            );
        }
    };
    // search
    const searchHandler = (searchTerm) => {
        setSearchTerm(searchTerm);
        if (searchTerm !== '') {
            const newBookList = libraryState.filter((book) => {
                return Object.values(book)
                    .join(' ')
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
            });
            setSearchResult(newBookList);
        } else {
            setSearchResult(libraryState);
        }
    };

    // Bookdetail
    const BookWithId = ({ match }) => {
        return (
            <BookDetail
                deleteBookId={deleteBookHandler}
                book={
                    libraryState.filter(
                        (b) => b.id === parseInt(match.params.id, 10)
                    )[0]
                }
            />
        );
    };
    // Add new book
    const addBookHandler = async (book) => {
        const request = {
            id: book.length,
            ...book,
        };
        const response = await api.post('/books', request);
        setLibraryState([...libraryState, response.data]);
    };

    // update book
    const updateBookHandler = async (book) => {
        const response = await api.put(`/books/${book.id}`, book);
        const {
            id,
            // image,
            // name,
            // author,
            // publishDate,
            // bookStatus,
            // category,
            // description,
            // pageNumber,
            // quantity,
        } = response.data;
        setLibraryState(
            libraryState.map((book) => {
                return book.id === id ? { ...response.data } : book;
            })
        );
    };

    // DeleteBook
    const deleteBookHandler = async (id) => {
        await api.delete(`/books/${id}`);
        const newLibrary = libraryState.filter((book) => {
            return book.id !== id;
        });
        setLibraryState(newLibrary);
        history.push('/library');
    };
    return (
        <div>
            {localStorage.getItem('accessAcc') ? (
                <Header countCartItems={cartItems.length} />
            ) : (
                ''
            )}
            <Switch>
                {/* ==> ACCOUNT ROUTE */}
                <Route
                    exact
                    path='/login'
                    render={(props) => (
                        <Login
                            {...props}
                            login={loginHandler}
                            checkUser={checkUser}
                        />
                    )}
                />
                <Route exact path='/signup' component={Signup} />
                <Route
                    exact
                    path='/information'
                    render={(props) => (
                        <Account {...props} users={users} />
                    )}
                />

                {/* ==> LIBRARY ROUTE */}
                <Route exact path='/library/:id' component={BookWithId} />
                <Route
                    exact
                    path='/library'
                    render={(props) => (
                        <Library
                            {...props}
                            libraryState={
                                searchTerm.length < 1
                                    ? libraryState
                                    : searchResult
                            }
                            term={searchTerm}
                            searchKeyWord={searchHandler}
                            books={books}
                            onAdd={onAdd}
                        />
                    )}
                />
                <Route
                    path='/basket'
                    render={(props) => (
                        <Basket
                            {...props}
                            cartItems={cartItems}
                            onAdd={onAdd}
                            onRemove={onRemove}
                        />
                    )}
                />
                <Route
                    path='/add'
                    render={(props) => {
                        if (localStorage.getItem('admin')) {
                            return (
                                <AddBook {...props} addBook={addBookHandler} />
                            );
                        } else {
                            history.replace('/library');
                            alert('You can not add new books!');
                        }
                    }}
                />
                <Route
                    path='/edit'
                    render={(props) => {
                        if (localStorage.getItem('admin')) {
                            return (
                                <UpdateBook
                                    {...props}
                                    updateBookHandler={updateBookHandler}
                                />
                            );
                        } else {
                            history.replace('/library');
                            alert('You can not Edit Book information!');
                        }
                    }}
                />
                <Redirect to='/login' />
            </Switch>
            {localStorage.getItem('accessAcc') ? <Footer /> : ''}
        </div>
    );
}

export default withRouter(Main);
