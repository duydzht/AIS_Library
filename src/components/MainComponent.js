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
import { apiLib, apiStu } from '../api/apiConnect';
import UpdateBook from './CRUD/UpdateBookComponent';
import Account from './ACCOUNTS/AccountComponent';
import Admin from './LIBRARY/AdminComponent';
import StudentList from './STUDENTS/StudentList';
import InsertStudent from './STUDENTS/InsertStudent';
import StudentDetail from './STUDENTS/StudentDetail';
import UpdateStudent from './STUDENTS/UpdateStudent';

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
    // const [users, setUsers] = useState([]);
    // const loginHandler = (acc) => {
    //     const accTrue = accounts.find(
    //         (x) => x.username === acc.username && x.password === acc.password
    //     );
    //     if (accTrue) {
    //         setUsers(accTrue);
    //         alert('Login successful!');
    //         history.replace('/library');
    //         localStorage.setItem('accessAcc', true);
    //         if (accTrue.authorities === 'admin') {
    //             localStorage.setItem('admin', true);
    //             return;
    //         } else {
    //             localStorage.setItem('mem', true);
    //             return;
    //         }
    //     } else {
    //         alert('Login failed! Please check your username or password');
    //         return;
    //     }
    // };

    // ===> ADD ACCOUNT ----

    // const addAccount = async (acc) => {
    //     if (accounts.find((x) => x.username === acc.username)) {
    //         alert('User đã tồn tại!');
    //         history.replace('/signup');
    //         return;
    //     } else {
    //         const request = {
    //             id: acc.length + 1000,
    //             ...acc,
    //         };
    //         const response = await api.post('/account', request);
    //         setAccounts([...accounts, response.data]);
    //         alert('Đăng kí thành công');
    //         history.replace('/login');
    //     }
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

    const addBookHandler = async (book) => {
        const request = {
            ...book,
        };
        const response = await apiLib.post('/int/book', request, {
            headers: {
                authorization: token,
            },
        });
        alert(response.data);
        setLibrary([...library, response.data]);
        history.push('/library');
    };

    // =====================> DeleteBook <==========================//

    const deleteBookHandler = async (id) => {
        await apiLib.delete(`/ext/book/${id}`, {
            headers: {
                authorization: token,
            },
        });
        const newLibrary = library.filter((book) => {
            return book.id !== id;
        });
        setLibrary(newLibrary);
        history.push('/library');
    };

    //====================> UPDATE BOOK <==========================//

    const updateBookHandler = async (book) => {
        const response = await apiLib.put(`/ext/book/`, book, {
            headers: {
                authorization: token,
            },
        });
        alert(response.data);
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
            alert('Bạn đã mượn cuốn sách này rồi');
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
        console.log(student);
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
                {/* <Route
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
                    /> */}

                {/* ==> LIBRARY ROUTE */}
                <Route exact path='/library/:id' component={BookWithId} />
                <Route
                    exact
                    path='/library'
                    render={(props) => (
                        <Library
                            {...props}
                            //library={searchResult}
                            searchName={searchName}
                            library={
                                searchResult.length < 1 ? library : searchResult
                            }
                            // term={searchTerm}
                            // searchHandler={searchHandler}
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
                <Redirect to='/library' />
            </Switch>
            <Footer />
        </div>
    );
}

export default withRouter(Main);
