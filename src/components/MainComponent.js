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
import { useSpring, animated } from 'react-spring';

function Main() {
    const animation = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 500 });
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
    const [users, setUsers] = useState([]);
    const loginHandler = (acc) => {
        const accTrue = accounts.find(
            (x) => x.username === acc.username && x.password === acc.password
        );
        if (accTrue) {
            setUsers(accTrue);
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

    // ===> ADD ACCOUNT ----

    const addAccount = async (acc) => {
        if (accounts.find((x) => x.username === acc.username)) {
            alert('User đã tồn tại!');
            history.replace('/signup');
            return;
        } else {
            const request = {
                id: acc.length + 1000,
                ...acc,
            };
            const response = await api.post('/account', request);
            setAccounts([...accounts, response.data]);
            alert('Đăng kí thành công');
            history.replace('/login');
        }
    };

    // =====> DELETE ACCOUNT-----
    const deleteAccount = async (id) => {
        const confirmDelete = prompt(
            'WARNING! This action will be deleted your account forever! Enter your password to continue'
        );
        if (confirmDelete === users.password) {
            await api.delete(`/account/${id}`);
            const logout = () => {
                localStorage.removeItem('accessAcc');
                localStorage.getItem('admin')
                    ? localStorage.removeItem('admin')
                    : localStorage.removeItem('mem');
                alert('The account has been disabled.');
                history.replace('/login');
            };
            logout();
        } else {
            alert('Cancelled action Or Your password is incorrect!');
            return;
        }
    };
    //!  mai chuyển nút add to cart rồi làm animation
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
            const conFirm = confirm('Vật phẩm đã có trong rỏ, bạn muốn thêm?'); //eslint-disable-line
            if (conFirm === true) {
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
    // ====> Search....
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

    // ====> DeleteBook
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
            <animated.div style={animation}>
                <Switch>
                    {/* ==> ACCOUNT ROUTE */}
                    <Route
                        exact
                        path='/login'
                        render={(props) => (
                            <Login {...props} login={loginHandler} />
                        )}
                    />

                    <Route
                        exact
                        path='/signup'
                        render={(props) => (
                            <Signup {...props} addAccount={addAccount} />
                        )}
                    />
                    <Route
                        exact
                        path='/information'
                        render={(props) => (
                            <Account
                                {...props}
                                users={users}
                                deleteAccount={deleteAccount}
                            />
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
                                    <AddBook
                                        {...props}
                                        addBook={addBookHandler}
                                    />
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
            </animated.div>
            {localStorage.getItem('accessAcc') ? <Footer /> : ''}
        </div>
    );
}

export default withRouter(Main);
