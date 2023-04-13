import { onChecking, onLogin, onLogout } from "./"

export const checkingAuthetication = ( email, password ) => {
    return async( dispatch ) => {

        dispatch( onChecking() )

        const result = {
            email: 'Leonard@prueba.com',
            uid: 'SDFGHJKLKJHGFD',
            displayName: 'LEONARD'
        }

        if( !result) return dispatch( onLogout( result.errorMessage ))

        dispatch( onLogin( result ))
    }
}