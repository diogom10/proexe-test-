import * as React from 'react';
import styles from './main.module.css';
import { Button, TextField } from "@mui/material";
import { useReducer, useState } from "react";
import { addUser, updateUser, validateEmailRegex } from "../actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, browserHistory } from "react-router-dom";

const DEFAULT_USER = {
    name: { value: '', error: '' },
    username: { value: '', error: '' },
    email: { value: '', error: '' },
    city: { value: '', error: '' }
}

export default function AddUser() {
    const dispatch = useDispatch();
    const [ user, setUser ] = useState( DEFAULT_USER )
    let { value } = useSelector( state => state.user );
    const [ , forceUpdate ] = useReducer( x => x + 1, 0 );
    const navigate = useNavigate();

    const setValueForm = ( fieldName, value ) => {
        user[ fieldName ].value = value
        user[ fieldName ].error = ''
        forceUpdate()
        setUser( user )
    }

    const goBack = () => navigate( -1 )

    const save = () => {
        if ( formIsValid() ) {
            const newUser = {
                id: value.length + 1,
                name: user.name.value,
                username: user.username.value,
                email: user.email.value,
                address: { city: user.city.value },
            }
            dispatch(addUser( [ ...value, newUser ]))
            goBack()
        }
    }

    const formIsValid = () => {
        console.log( 'value', value )
        let valid = true;
        if ( user.name.value === '' ) {
            user.name.error = 'field required';
            valid = false;
        }
        if ( user.username.value === '' ) {
            user.username.error = 'field required';
            valid = false;
        } else if ( value.some( a => a?.username === user.username.value ) ) {
            user.username.error = 'username already used';
            valid = false;
        }

        if ( user.email.value === '' ) {
            user.email.error = 'field required'
            valid = false;
        } else if ( validateEmailRegex( user.email.value ) ) {
            user.email.error = 'email invalid format';
            valid = false;
        } else if ( value.some( a => a?.email === user.email.value ) ) {
            user.email.error = 'email already used';
            valid = false;
        }

        setUser( user )
        forceUpdate()
        return valid
    }

    return (
        <div className={ styles.container }>
            <div className={ styles.wrapper }>
                <div className={ styles.infoTable }>
                    <span className={ styles.title }>Add User</span>
                </div>
                <div className={ styles.containerInput }>
                    <TextField className={ styles.inputSpace } id="standard-basic standard-error-helper-text"
                               error={ user.name.error !== '' }
                               helperText={ user.name.error }
                               onChange={ e => setValueForm( 'name', e.target.value ) } label="Name"
                               variant="standard"/>

                    <TextField className={ styles.inputSpace } id="standard-basic standard-error-helper-text"
                               error={ user.username.error !== '' }
                               helperText={ user.username.error }
                               onChange={ e => setValueForm( 'username', e.target.value ) }
                               label="Username"
                               variant="standard"/>

                    <TextField className={ styles.inputSpace } id="standard-basic standard-error-helper-text"
                               error={ user.email.error !== '' }
                               helperText={ user.email.error }
                               onChange={ e => setValueForm( 'email', e.target.value ) } label="Email"
                               variant="standard"/>

                    <TextField className={ styles.inputSpace } id="standard-basic standard-error-helper-text"
                               error={ user.city.error !== '' }
                               helperText={ user.city.error }
                               onChange={ e => setValueForm( 'city', e.target.value ) } label="City"
                               variant="standard"/>
                </div>
                <div className={ styles.containerButtons }>
                    <Button variant="contained" onClick={ goBack } color="error">Back</Button>
                    <Button variant="contained" onClick={ save }>Save</Button>
                </div>
            </div>
        </div>
    )

}
