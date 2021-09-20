import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './AdminPage.scss';

const AdminPage = props => {
    const renderAuth = () => {
        if(!props.isAdminLoggedIn) {
            return (
                <div className='admin-page__nav'>
                    <Link to='/admin/login' className='admin-page__link'>Login</Link>
                    <Link to='/admin/signup' className='admin-page__link'>Sign Up</Link>
                </div>
            );
        }
    };

    return (
        <section className='admin-page'>
            {renderAuth()}
        </section>
    )
};

const mapStateToProps = state => {
    return { isAdminLoggedIn: state.auth.isLoggedIn };
};

export default connect(mapStateToProps)(AdminPage);