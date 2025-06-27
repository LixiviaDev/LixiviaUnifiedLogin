import React from 'react'
import SharedInterface from '../../layouts/sharedLayout/sharedLayout';
import LoginForm from '../../components/forms/loginForm';

export default function Login(props: any) {
    return(
        <>
        <SharedInterface flexflow="row">
            <LoginForm />
        </SharedInterface>
        </>
    );
}