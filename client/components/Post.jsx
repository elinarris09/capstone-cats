import React, { useState, useContext } from 'react'
import { UserContext } from '../context/UserProvider'
import CommentContainer from './CommentContainer'
import { FiHeart } from "react-icons/fi";
import { FiThumbsDown } from "react-icons/fi";


export default function Post(props) {

    const { title, description, imgUrl, userId, username, _id, upvotes, downvotes } = props
    const { user, handleUpvote, handleDownvote, deletePost, editPost } = useContext(UserContext)
    const [editToggle, setEditToggle] = useState(false)
    const [edit, setEdit] = useState({
        title: title || "",
        description: description || "",
        imgUrl: imgUrl || ""
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
        editPost(edit, _id)
        setEditToggle(!editToggle)
    }

    let isUser = userId === user._id

    return (
        <div id='post'>
            <h1 id='post-username'>Posted by: {username}</h1>
            <h2 id='post-title'>Title: {title}</h2>
            <h4 id='post-description'>{description}</h4>

            <img id="post-img" src={imgUrl}/>

            <div id='like-dislike'>
            {/* <button onClick={() => handleUpvote(_id)}>Upvote</button> */}
            <p id='post-upvotes'><FiHeart onClick={() => handleUpvote(_id)} id='heart'/>{upvotes.length}</p>
            {/* <button onClick={() => handleDownvote(_id)}>Downvote</button> */}
            <p id='post-downvotes'><FiThumbsDown onClick={() => handleDownvote(_id)} id='dislike'/>{downvotes.length}</p>
            </div>

            <CommentContainer postId={_id}/>
            
            { 
                isUser && (
                    <>
                        <button onClick={() => deletePost(_id)}>Delete Post</button>
                        
                        { !editToggle 

                        ? 

                        <button onClick={() => setEditToggle(prevToggle => !prevToggle)}>Edit Post</button>

                        :

                        <>

                        <form onSubmit={handleSubmit}>
                            <input value={edit.title} name="title" onChange={handleChange}/>
                            <input value={edit.description} name="description" onChange={handleChange}/>
                            <input value={edit.imgUrl} name="imgUrl" onChange={handleChange}/>
                            <button>Save Edited Post</button>
                        </form>

                        <button
                            onClick={() => setEditToggle(prevToggle => !prevToggle)}
                        >
                        Close Edit Post Form
                        </button>
                        </>

                        }
                    </>
                )
            }
        </div>
    )
}