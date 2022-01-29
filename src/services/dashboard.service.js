
const url = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data'

export const fetchUsers = async () => {
    try {
        const result = await fetch(  url, {
            method: 'GET',
        } );
        if ( result.status === 200 ) {
            const response = await result.json();
            return { success: true, payload: response };
        }
        return { success: false};
    } catch ( error ) {
        console.log( 'error', error );
        return { success: false, payload: error };
    }
};




