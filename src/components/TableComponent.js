import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useReducer, useState } from "react";
import { Button, TextField } from "@mui/material";
import styles from '../routes/main.module.css';
import { useDispatch } from "react-redux";
import { updateUser, validateEmailRegex } from "../actions/user.actions";

const StyledTableCell = styled( TableCell )( ( { theme } ) => ( {
    [ `&.${ tableCellClasses.head }` ]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [ `&.${ tableCellClasses.body }` ]: {
        fontSize: 14,
    },
} ) );

const StyledTableRow = styled( TableRow )( ( { theme } ) => ( {
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
} ) );

const DEFAULT_USER = {
    name: { value: '', error: '' },
    username: { value: '', error: '' },
    email: { value: '', error: '' },
    city: { value: '', error: '' }
}
export default function TableComponent( navigation ) {
    const { td, th, handleDelete } = navigation
    const [ idEdit, setIdEdit ] = useState( null )
    const [ userEdit, setUserEdit ] = useState( DEFAULT_USER )
    const [ , forceUpdate ] = useReducer( x => x + 1, 0 );
    const dispatch = useDispatch();
    const editRow = ( data ) => {
        userEdit.name.value = data?.name;
        userEdit.username.value = data?.username;
        userEdit.email.value = data?.email;
        userEdit.city.value = data?.address?.city;
        setIdEdit( data?.id );
    }

    const cancelEdit = () => {
        setIdEdit( DEFAULT_USER );
    }
    const setValueForm = ( fieldName, value ) => {
        userEdit[ fieldName ].value = value
        userEdit[ fieldName ].error = ''
        setUserEdit( userEdit )
        forceUpdate();
    }

    const confirmEdit = ( index, data ) => {
        if ( formIsValid( data ) ) {
            dispatch( updateUser( { data: userEdit, index } ) )
            setIdEdit( null );
        }
    }

    const formIsValid = ( data ) => {
        let valid = true;
        if ( userEdit.name.value === '' ) {
            userEdit.name.error = 'field required';
            valid = false;
        }
        if ( userEdit.username.value === '' ) {
            userEdit.username.error = 'field required';
            valid = false;
        } else if ( data.filter( a => idEdit !== a?.id ).some( a => a?.username === userEdit.username.value ) ) {
            userEdit.username.error = 'username already used';
            valid = false;
        }

        if ( userEdit.email.value === '' ) {
            userEdit.email.error = 'field required'
            valid = false;
        } else if ( validateEmailRegex( userEdit.email.value ) ) {
            userEdit.email.error = 'email invalid format';
            valid = false;
        } else if ( data.filter( a => idEdit !== a?.id ).some( a => a?.email === userEdit.email.value ) ) {
            userEdit.email.error = 'email already used';
            valid = false;
        }
        setUserEdit( userEdit )
        forceUpdate();
        return valid
    }

    if(td.length) {
        return (
            <TableContainer component={ Paper }>
                <Table sx={ { minWidth: 700 } } aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            { th.map( ( row, index ) => (
                                <StyledTableCell key={ index } align="center">{ row }</StyledTableCell>
                            ) ) }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { td.map( ( row, index ) => (
                            <StyledTableRow key={ index }>
                                <StyledTableCell component="th" scope="row">
                                    { row?.id }
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    { idEdit === row.id ? (
                                        <TextField id="standard-basic standard-error-helper-text"
                                                   error={ userEdit.name.error !== '' }
                                                   helperText={ userEdit.name.error }
                                                   defaultValue={ row?.name }
                                                   onChange={ e => setValueForm( 'name', e.target.value ) } label="Name"
                                                   variant="standard"/> ) : row?.name }
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    { idEdit === row.id ? (
                                        <TextField id="standard-basic standard-error-helper-text"
                                                   error={ userEdit.username.error !== '' }
                                                   helperText={ userEdit.username.error }
                                                   defaultValue={ row?.username }
                                                   onChange={ e => setValueForm( 'username', e.target.value ) }
                                                   label="Username"
                                                   variant="standard"/> ) : row?.username }
                                < /StyledTableCell>
                                <StyledTableCell align="center">
                                    { idEdit === row.id ? (
                                        <TextField id="standard-basic standard-error-helper-text"
                                                   error={ userEdit.email.error !== '' }
                                                   helperText={ userEdit.email.error }
                                                   defaultValue={ row?.email }
                                                   onChange={ e => setValueForm( 'email', e.target.value ) }
                                                   label="Email"
                                                   variant="standard"/> ) : row?.email }
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    { idEdit === row.id ? (
                                        <TextField id="standard-basic standard-error-helper-text"
                                                   error={ userEdit.city.error !== '' }
                                                   helperText={ userEdit.city.error }
                                                   defaultValue={ row?.address?.city }
                                                   onChange={ e => setValueForm( 'city', e.target.value ) } label="City"
                                                   variant="standard"/> ) : row?.address?.city }
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    { idEdit === row.id ? ( <Button variant="contained" color="success"
                                                                    onClick={ () => confirmEdit( index, td ) }>Confirm</Button> ) :
                                        <Button variant="contained" color="warning"
                                                onClick={ () => editRow( row ) }>Edit</Button> }
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    { idEdit === row.id ? ( <Button variant="contained" color="error"
                                                                    onClick={ () => cancelEdit() }>Cancel</Button> ) :
                                        <Button variant="contained" color="error"
                                                onClick={ () => handleDelete( index ) }>Delete</Button> }
                                </StyledTableCell>
                            </StyledTableRow>
                        ) ) }
                    </TableBody>
                </Table>
            </TableContainer>

        );
    }else{
        return (<div className={styles.empty}>Looks Empty!</div>)
    }
};