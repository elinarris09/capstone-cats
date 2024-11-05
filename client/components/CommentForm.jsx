import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserProvider'

export default function CommentForm(props) {
    const { addComment } = useContext(UserContext)
    const { postId } = props
    const [formData, setFormData] = useState({
        text: ''
    })

    function handleChange(e){
        const { name, value } = e.target
        setFormData(prevData => {
            return{
                ...prevData,
                [name]: value
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        addComment(postId, formData)
        setFormData({text: ''})
    }

    return(
        <form onSubmit={handleSubmit}>
            <input
                placeholder='Comment'
                name='text'
                value={formData.text}
                onChange={handleChange}
            />
            <button>Leave Comment</button>
        </form>
    )
}