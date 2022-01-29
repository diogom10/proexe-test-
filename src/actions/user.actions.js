import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from "../services/dashboard.service";

export const getUsers = createAsyncThunk(
    'user/fetchUsers',
    async ( args, { dispatch } ) => {
        const response = await fetchUsers();
        dispatch( addUser( response.payload ) )
    }
);
const initialState = {
    value: [],
    sort: false
};

export const validateEmailRegex = ( email ) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !regex.test( email );
}

export const removeOriginObject = ( value ) => {
    if ( value ) {
        return JSON.parse( JSON.stringify( value ) );
    }
    return null;
}


export const userReducer = createSlice( {
    name: 'user',
    initialState,
    reducers: {
        addUser: ( state, action ) => {
            state.value = action.payload
        },
        deleteUser: ( state, action ) => {
            state.value.splice( action.payload, 1 )
        },
        updateUser: ( state, action ) => {
            const { data, index } = action.payload
            if ( data ) {
                state.value[ index ].name = data.name.value;
                state.value[ index ].username = data.username.value;
                state.value[ index ].email = data.email.value;
                state.value[ index ].address.city = data.city.value;
            }
        },
        setSort: ( state, action ) => {
            const users = removeOriginObject( action.payload.users )
            state.sort = !state.sort
            if ( state.sort ) {
                state.value = users.sort( ( a, b ) => {
                    if ( a.username < b.username ) return -1;
                    if ( a.username > b.username ) return 1;
                    return 0;
                } )
            } else {
                state.value = users.sort( ( a, b ) => {
                    if ( a.username > b.username ) return -1;
                    if ( a.username < b.username ) return 1;
                    return 0;
                } )
            }
        },
    },
} );

export const { addUser, deleteUser, updateUser, setSort } = userReducer.actions;

export default userReducer.reducer;
