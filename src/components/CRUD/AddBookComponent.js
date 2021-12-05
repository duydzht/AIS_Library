import React from 'react';

class AddBook extends React.Component {
    state = {
        image: '',
        name: '',
        author: '',
        publishDate: '',
        bookStatus: '',
        category: '',
        description: '',
        pageNumber: '',
        quantity: '',
    };

    add = (e) => {
        e.preventDefault();
        if (this.state.image === '' || this.state.name === '') {
            alert('ALl the fields are mandatory!');
            return;
        }
        this.props.addBook(this.state);
        this.setState({
            image: '',
            name: '',
            author: '',
            publishDate: '',
            bookStatus: '',
            category: '',
            description: '',
            pageNumber: '',
            quantity: '',
        });
        alert('Thêm Thành công!');
        this.props.history.push('/library');
    };
    render() {
        return (
            <div className='text-center mt-5'>
                <div className='wrapper'>
                    <div className='blog_post_signup'>
                        <h2>Create New Book</h2>
                        <form action='/library' onSubmit={this.add}  className='form__group'>
                            <div class='row'>
                                <div className='col-10 col-md-6'>
                                    <div>
                                        <label className=''>Link Image:</label>
                                        <input
                                            className='form__control'
                                            type='text'
                                            name='image'
                                            placeholder='image'
                                            value={this.state.image}
                                            onChange={(e) =>
                                                this.setState({
                                                    image: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className=''>Name:</label>
                                        <input
                                            className='form__control'
                                            type='text'
                                            name='name'
                                            placeholder='Name'
                                            value={this.state.name}
                                            onChange={(e) =>
                                                this.setState({
                                                    name: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className=''>Author:</label>
                                        <input
                                            className='form__control'
                                            type='text'
                                            name='author'
                                            placeholder='author'
                                            value={this.state.author}
                                            onChange={(e) =>
                                                this.setState({
                                                    author: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className=''>
                                            Publish date:
                                        </label>
                                        <input
                                            className='form__control'
                                            type='date'
                                            name='publishDate'
                                            placeholder='publishDate'
                                            value={this.state.publishDate}
                                            onChange={(e) =>
                                                this.setState({
                                                    publishDate: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className='col-10 col-md-6'>
                                    <div>
                                        <label className=''>Status:</label>
                                        <input
                                            className='form__control'
                                            type='text'
                                            name='bookStatus'
                                            placeholder='bookStatus'
                                            value={this.state.bookStatus}
                                            onChange={(e) =>
                                                this.setState({
                                                    bookStatus: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className=''>Category:</label>
                                        <input
                                            className='form__control'
                                            type='text'
                                            name='category'
                                            placeholder='category'
                                            value={this.state.category}
                                            onChange={(e) =>
                                                this.setState({
                                                    category: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className=''>Page Number:</label>
                                        <input
                                            className='form__control'
                                            type='number'
                                            name='pageNumber'
                                            placeholder='pageNumber'
                                            value={this.state.pageNumber}
                                            onChange={(e) =>
                                                this.setState({
                                                    pageNumber: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className=''>Quantity:</label>
                                        <input
                                            className='form__control'
                                            type='number'
                                            name='quantity'
                                            placeholder='quantity'
                                            value={this.state.quantity}
                                            onChange={(e) =>
                                                this.setState({
                                                    quantity: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='text-center mt-2'>
                                <label className=''>Description:</label>
                                <div>
                                    <input
                                        className='form__control'
                                        type='text'
                                        name='description'
                                        placeholder='description'
                                        value={this.state.description}
                                        onChange={(e) =>
                                            this.setState({
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <button className='btn__signup mt-2'>Create</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddBook;
