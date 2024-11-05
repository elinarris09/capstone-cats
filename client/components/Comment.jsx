import React, { useContext, useState } from "react";
import { UserContext } from '../context/UserProvider'

export default function Comment(props){
    const { deleteComment, editComment, user } = useContext(UserContext)
    const { text, username, _id} = props
    const [editToggle, setEditToggle] = useState(false)
    const [edit, setEdit] = useState({
        text: text || ""
    })

    function handleChange(e) {
        const { name, value } = e.target
        setEdit(prevData => {
            return{
                ...prevData,
                [name]: value
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        editComment(edit, _id)
    }

    let isUser = user.username === username

    return (
        <div id='comment'>
            
            <p>{text}</p>
            <small>-{username}</small>
            
            {
                isUser && 
                    <>
                    <button onClick={() => deleteComment(_id)}>Delete Comment</button>
                    
                    { !editToggle 

                    ? 
                    
                    <button onClick={() => setEditToggle(prevToggle => !prevToggle)}>Edit Comment</button>

                    :

                    <>
                    
                    <form onSubmit={handleSubmit}>
                        <input placeholder={text} value={edit.text} name="text" onChange={handleChange}/>
                        <button>Save Comment</button>
                    </form>

                    <button
                        onClick={() => setEditToggle(prevToggle => !prevToggle)}
                    >
                    Close Comment Form
                    </button>
                    </>

                    }
                </>
            }
        
        </div>
    )
}