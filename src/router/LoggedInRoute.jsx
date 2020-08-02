import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../store/AuthService'


const LoggedInRoute = ({ component: Component, ...rest }) => {

    const user = useContext(AuthContext)                        
    return (
        <Route                             
            {...rest}                                          
            render={props =>　                                 
                user ? (       
                    <Component {...props} />                  
                ) : (
                        <Redirect to={'/'} />          
                    )
            }
        />
    )
}

export default LoggedInRoute