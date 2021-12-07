import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <footer className='site-footer'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <h6>About</h6>
                        </div>
                        <div className='col-xs-6 col-md-3'>
                            <h6>Categories</h6>
                        </div>
                        <div className='col-xs-6 col-md-3'>
                            <h6>Quick Links</h6>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 col-sm-6 col-xs-12'>
                            <p className='copyright-text'>
                                Copyright © 2017 All Rights Reserved by Scanfcode.
                            </p>
                        </div>
                        <div className='col-md-4 col-sm-6 col-xs-12'>
                            <ul className='social-icons'>
                                <li>
                                    <a className='facebook' href='https://www.facebook.com/duy.zp'>
                                        <i className='fa fa-facebook' />
                                    </a>
                                </li>
                                <li>
                                    <a className='twitter' href='https://twitter.com/'>
                                        <i className='fa fa-twitter' />
                                    </a>
                                </li>
                                <li>
                                    <a className='dribbble' href='https://www.skype.com/'>
                                        <i className='fa fa-skype ' />
                                    </a>
                                </li>
                                <li>
                                    <a className='linkedin' href='https://github.com/duydzht/'>
                                        <i className='fa fa-github' />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
export default Footer;
