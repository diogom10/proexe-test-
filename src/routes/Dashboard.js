import * as React from 'react';
import TableComponent from "../components/TableComponent";
import styles from './main.module.css';
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser,setSort } from "../actions/user.actions";
import {useNavigate } from "react-router-dom";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddIcon from '@mui/icons-material/Add';

const th = [
    'Id',
    'Name   ',
    'Username',
    'Email',
    'City',
    'Edit',
    'Delete'
]

export default function Dashboard() {
    const dispatch = useDispatch();
    const { value } = useSelector( state => state.user );
    const navigate = useNavigate();
    const [ open, setOpen ] = useState( false );
    const [ indexToDelete, setIndexToDelete ] = useState( null );

    useEffect( () => {
        if ( !value.length ) {
            dispatch( getUsers() )
        }
    }, [] );


    const close = () => {
        setOpen( false );
    };

    const handleDelete = ( index ) => {
        console.log('index',index)
        setOpen( true )
        setIndexToDelete( index )
    }

    const deleteData = ( index ) => {
        dispatch( deleteUser(index) )
        setOpen( false )
    };
    const sortUserByName = (  ) => dispatch(setSort({users:value}))


    const dialog = () => {
        return (
            <div>
                <Dialog
                    open={ open }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Are you sure?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={ () => deleteData( indexToDelete ) }>YES</Button>
                        <Button onClick={ close }>NO</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    return (
        <div className={ styles.container }>
            <div className={ styles.wrapper }>
                <div className={ styles.infoTable }>
                    <span className={ styles.title }>User List</span>
                    <div>
                        <Button style={{marginRight:5}}  onClick={sortUserByName} variant="contained" >
                            <FilterAltIcon/>
                        </Button>
                        <Button variant="contained" onClick={ () => navigate( '/AddUser' ) }>
                            <AddIcon/>
                        </Button>
                    </div>
                </div>
                <TableComponent th={ th } td={ value } handleDelete={ handleDelete }/>
                { dialog() }
            </div>
        </div>
    )

}
