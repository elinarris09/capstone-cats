import React, { useState, useContext } from 'react'
import Form from './Form'
import About from './About'
import { UserContext } from '../context/UserProvider'

export default function Auth() {
    const { login, signup, errMsg, resetAuthError } = useContext(UserContext)
    const [isMember, setIsMember] = useState(false)

    const toggleForm = () => {
        setIsMember(!isMember)
        resetAuthError()
    }
    
    return (
        <div id="auth">
            <About />
            
            {
                isMember ? 
                <>
                <Form 
                isMember={isMember}
                submit={login}
                errMsg={errMsg}
                />
                <button onClick={toggleForm}>Create An Account?</button>
                </>
                :
                <>
                <Form 
                isMember={isMember} 
                submit={signup}
                errMsg={errMsg}
                />
                <button onClick={toggleForm}>Already A Member?</button>
                </>
            }

        </div>
    )
}