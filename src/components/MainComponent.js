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
import { apiAcc, apiLib, apiStu } from '../api/apiConnect';
import UpdateBook from './CRUD/UpdateBookComponent';
import Account from './ACCOUNTS/AccountComponent';
import Admin from './LIBRARY/AdminComponent';
import StudentList from './STUDENTS/StudentList';
import InsertStudent from './STUDENTS/InsertStudent';
import StudentDetail from './STUDENTS/StudentDetail';
import UpdateStudent from './STUDENTS/UpdateStudent';
import Error from './ErrorComponent';

function Main() {
    // Library
    const [library, setLibrary] = useState([]);
    const history = useHistory();
    const token =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJraWVubm4iLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODA5MS9hY2NvdW50cy9sb2dpbiIsImV4cCI6MTYzNjQ0MTk0OH0.1pUW8ogZBdjD5JKgXumarUwaB6z-kUTp4TH4yhg4jF4';

    //====>Account
    //const [accounts, setAccounts] = useState([]);

    //=> GET Accounts
    // const retrieveAccount = async () => {
    //     const response = await api.get('/account');
    //     return response.data;
    // };
    // useEffect(() => {
    //     const getAccount = () => {
    //         setTimeout(async () => {
    //             const allAccounts = await retrieveAccount();
    //             if (allAccounts) setAccounts(allAccounts);
    //         }, 2000);
    //     };
    //     getAccount();
    // }, []);

    // ==> Login
    const [isLoggedIn, setIsLoggedIn] = useState('');
    const loginHandler = (acc) => {
        apiAcc
            .post(
                `/accounts/login?username=${acc.username}&password=${acc.password}`
            )
            .then((res) => {
                console.log(res.data);
                setIsLoggedIn(true);
            })
            .catch((error) => {
                console.log('ERRORS : ' + error);
                history.push('/error');
            });
    };

    // ===> ADD ACCOUNT ----

    const addAccount = (newAcc) => {
        // const request = {
        //     newAcc,
        // };
        console.log({
            username: newAcc.username,
            password: newAcc.password
        });
        apiAcc
            .post('/accounts', {
                username: newAcc.username,
                password: newAcc.password
            }, {
                headers: {
                    Authorization:
                        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0YWNjIiwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwOTEvYWNjb3VudHMvbG9naW4iLCJleHAiOjE2NDA2MDQ5MzR9.JJRfUVbMwz-LE-GEa3tTula1M-5Djv9fTeQ91KG8JNU',
                },
            })
            .then((response) => {
                console.log('Success');
            })
            .catch((err) => {
                console.log(err);
                history.push('/error');
            });
    };

    //==========> ACCOUNT DETAIL <==========
    // const [account, setAccount] = useState([]);
    // const accountDetail = () => {
    //     apiAcc.get(`accounts/{id}`).then().catch(err => {});
    // };

    // =====> DELETE ACCOUNT-----
    // const deleteAccount = async (id) => {
    //     const confirmDelete = prompt(
    //         'WARNING! This action will be deleted your account forever! Enter your password to continue'
    //     );
    //     if (confirmDelete === users.password) {
    //         await api.delete(`/account/${id}`);
    //         const logout = () => {
    //             localStorage.removeItem('accessAcc');
    //             localStorage.getItem('admin')
    //                 ? localStorage.removeItem('admin')
    //                 : localStorage.removeItem('mem');
    //             alert('The account has been disabled.');
    //             history.replace('/login');
    //         };
    //         logout();
    //     } else {
    //         alert('Cancelled action Or Your password is incorrect!');
    //         return;
    //     }
    // };

    //==============================================LIBRARY CONTROLLER=======================================
    //=> GETBooks
    const retrieveBooks = async () => {
        const response = await apiLib.get('/ext/book');
        return response.data;
    };
    useEffect(() => {
        const getBook = async () => {
            const allBooks = await retrieveBooks();
            if (allBooks) setLibrary(allBooks);
        };
        getBook();
    }, []);

    //======================> ADD NEW BOOK <==========================//

    const addBookHandler = (book) => {
        const request = {
            ...book,
        };
        apiLib
            .post('/int/book', request, {
                headers: {
                    authorization: token,
                },
            })
            .then((res) => {
                alert(res.data);
                setLibrary([...library, book]);
                history.push('/library');
            })
            .catch((err) => {
                console.log(err);
                history.push('/error');
            });
    };

    // =====================> DeleteBook <==========================//

    const deleteBookHandler = (id) => {
        apiLib
            .delete(`/ext/book/${id}`, {
                headers: {
                    authorization: token,
                },
            })
            .then(() => {
                const newLibrary = library.filter((book) => {
                    return book.id !== id;
                });
                setLibrary(newLibrary);
                history.push('/library');
            })
            .catch((err) => {
                console.log(err);
                history.push('/error');
            });
    };

    //====================> UPDATE BOOK <==========================//

    const updateBookHandler = (book) => {
        apiLib
            .put(`/ext/book/`, book, {
                headers: {
                    authorization: token,
                },
            })
            .then((res) => {
                alert(res.data);
            })
            .catch((err) => {
                console.log(err);
                history.push('/error');
            });
        // const {
        //     id,
        //     // image,
        //     // name,
        //     // author,
        //     // publishDate,
        //     // bookStatus,
        //     // category,
        //     // description,
        //     // pageNumber,
        //     // quantity,
        // } = response.data;
        // setLibrary(
        //     library.map((book) => {
        //         return book.id === id ? { ...response.data } : book;
        //     })
        // );
    };

    //==============> Add & remove book from Cart <==============//

    const [cartItems, setCartItems] = useState([]);
    const onAdd = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
            alert('Sách đã có trong rỏ');
        } else {
            alert('Add to basket SUCCESSFUL');
            setCartItems([...cartItems, { ...product }]);
        }
    };
    const onRemove = (product) => {
        setCartItems(cartItems.filter((x) => x.id !== product.id));
    };

    //==============>REGISTER BORROW BOOK<====================//

    const regisBook = async () => {
        const regisBookReq = cartItems.map((item) => {
            return item.id;
        });
        const request = {
            bookId: regisBookReq,
            username: 'duy',
        };
        const response = await apiLib.post('/ext/book/registerbook', request, {
            headers: {
                authorization: token,
            },
        });
        alert(response.data);
        history.push('/library');
    };
    // >==============> UNREGISTER BORROW <==================< //
    const unRegisBook = async (id) => {
        const request = {
            bookId: [id],
            username: 'duy',
        };
        const response = await apiLib.put('/int/book/unregisterbook', request, {
            headers: {
                authorization: token,
            },
        });
        alert(response.data);
        history.push('/library');
    };

    //>================> GET REGISTER BOOK <==================< //
    const [registered, setRegistered] = useState([]);
    const retrieveBooksRegister = async () => {
        const response = await apiLib.get('/int/book/getBookRegister', {
            headers: {
                authorization: token,
            },
        });
        return response.data;
    };
    useEffect(() => {
        const getRegisteredBook = async () => {
            const allRegisteredBook = await retrieveBooksRegister();
            if (allRegisteredBook) setRegistered(allRegisteredBook);
        };
        getRegisteredBook();
    }, []);

    // >==================> BORROW BOOK <===================< //

    const borrowBook = async (id) => {
        console.log(id);
        const request = {
            bookId: [id],
            username: 'duy',
        };
        const response = await apiLib.put('/int/book/borrow', request, {
            headers: {
                authorization: token,
            },
        });
        alert(response.data);
        history.push('/library');
    };

    // >================> GET BORROW BOOK <================< //
    const [borrowed, setBorrowed] = useState([]);
    const retrieveBooksBorrowed = async () => {
        const response = await apiLib.get('/int/book/getBorrowBook', {
            headers: {
                authorization: token,
            },
        });
        return response.data;
    };
    useEffect(() => {
        const getBorrowedBook = async () => {
            const allBorrowedBooks = await retrieveBooksBorrowed();
            if (allBorrowedBooks) setBorrowed(allBorrowedBooks);
        };
        getBorrowedBook();
    }, []);

    //>==================> RETURN BOOK <===================< //
    const returnBook = async (id) => {
        const request = {
            bookId: [id],
            username: 'duy',
        };
        const response = await apiLib.put('/int/book/returnbook', request, {
            headers: {
                authorization: token,
            },
        });
        alert(response.data);
        history.push('/library');
        console.log(id);
    };

    //==============> Bookdetail<==========================//
    const BookWithId = ({ match }) => {
        return (
            <BookDetail
                registered={registered}
                borrowed={borrowed}
                onAdd={onAdd}
                regisBook={regisBook}
                unRegisBook={unRegisBook}
                borrowBook={borrowBook}
                returnBook={returnBook}
                deleteBookId={deleteBookHandler}
                book={
                    library.filter(
                        (b) => b.id === parseInt(match.params.id, 10)
                    )[0]
                }
            />
        );
    };

    //==================================SEARCH=====================================//
    const [searchResult, setSearchResult] = useState([]);
    const searchName = (values) => {
        const sName = values.name;
        if (sName === '') {
            setSearchResult([...library]);
            return;
        } else {
            const result = library.filter((s) =>
                s.name.toLowerCase().match(sName.toLowerCase())
            );
            if (result.length > 0) {
                setSearchResult(result);
            } else {
                alert('No result!');
            }
        }
    };

    //============================================STUDENT CONTROLLER========================================//
    const [students, setStudents] = useState([]);

    //===================> GET Students<===================//
    const retrieveStudents = async () => {
        const response = await apiStu.get('/ext/students', {
            headers: {
                authorization: token,
            },
        });
        return response.data;
    };
    useEffect(() => {
        const getStudent = async () => {
            const allStudents = await retrieveStudents();
            if (allStudents) setStudents(allStudents);
        };
        getStudent();
    }, []);

    //===============> INSERT NEW STUDENT<=================//

    const insertStudent = async (student) => {
        const request = {
            ...student,
        };
        const response = await apiStu.post('/int/students', request, {
            headers: {
                authorization: token,
            },
        });
        setStudents([...students, response.data]);
        history.push('/student-list');
    };

    //===============> STUDENT DETAIL <===================//
    const StudentWithId = ({ match }) => {
        return (
            <StudentDetail
                token={token}
                student={
                    students.filter(
                        (b) => b.id === parseInt(match.params.id, 10)
                    )[0]
                }
            />
        );
    };
    //====================> UPDATE STUDENT <==========================//

    const updateStudentHandler = async (student) => {
        const response = await apiStu.put(
            `/int/students/${student.id}`,
            student,
            {
                headers: {
                    authorization: token,
                },
            }
        );
        const { id } = response.data;
        setStudents(
            students.map((stu) => {
                return stu.id === id ? { ...response.data } : stu;
            })
        );
    };

    return (
        <div>
            <Header countCartItems={cartItems.length} />
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
                {/* <Route
                    exact
                    path='/information'
                    render={(props) => (
                        <Account
                            {...props}
                            users={users}
                            deleteAccount={deleteAccount}
                        />
                    )}
                /> */}

                {/* ==> LIBRARY ROUTE */}
                <Route exact path='/library/:id' component={BookWithId} />
                <Route
                    exact
                    path='/library'
                    render={(props) => (
                        <Library
                            {...props}
                            searchName={searchName}
                            library={
                                searchResult.length < 1 ? library : searchResult
                            }
                            onAdd={onAdd}
                            borrowed={borrowed}
                            registered={registered}
                        />
                    )}
                />
                <Route
                    exact
                    path='/basket'
                    render={(props) => (
                        <Basket
                            {...props}
                            cartItems={cartItems}
                            onRemove={onRemove}
                            regisBook={regisBook}
                        />
                    )}
                />
                <Route
                    exact
                    path='/add'
                    render={(props) => (
                        <AddBook {...props} addBook={addBookHandler} />
                    )}
                />
                <Route
                    exact
                    path='/edit'
                    render={(props) => (
                        <UpdateBook
                            {...props}
                            updateBookHandler={updateBookHandler}
                        />
                    )}
                />
                <Route
                    exact
                    path='/admin'
                    render={(props) => (
                        <Admin
                            {...props}
                            borrowed={borrowed}
                            registered={registered}
                            unRegisBook={unRegisBook}
                            borrowBook={borrowBook}
                            returnBook={returnBook}
                        />
                    )}
                />
                {/* =====>STUDENT ROUTE<===== */}
                <Route
                    exact
                    path='/student-list'
                    render={(props) => (
                        <StudentList {...props} students={students} />
                    )}
                />
                <Route
                    exact
                    path='/student-list/insert-student'
                    render={(props) => (
                        <InsertStudent
                            {...props}
                            insertStudent={insertStudent}
                        />
                    )}
                />
                <Route
                    exact
                    path='/student-list/update-student'
                    render={(props) => (
                        <UpdateStudent
                            {...props}
                            updateStudentHandler={updateStudentHandler}
                            history={history}
                        />
                    )}
                />
                <Route
                    exact
                    path='/student-list/:id'
                    component={StudentWithId}
                />
                <Route exact path='/error' component={Error} />
                <Redirect to='/login' />
            </Switch>
            <Footer />
        </div>
    );
}

export default withRouter(Main);
