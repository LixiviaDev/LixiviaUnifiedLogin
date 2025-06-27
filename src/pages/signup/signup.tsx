import React from 'react'
import SharedInterface from '../../layouts/sharedLayout/sharedLayout';
import SignupForm from '../../components/forms/signupForm';

export default function Signup(props: any) {
    return(
        <>
        <SharedInterface flexflow="row">
            <SignupForm />
        </SharedInterface>
        </>
    );
}