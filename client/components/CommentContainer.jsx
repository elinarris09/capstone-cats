import React, { useState } from 'react'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

export default function CommentContainer(props) {
    const { postId } = props
    const [ isHidden, setIsHidden ] = useState(true)

    function toggleView() {
        setIsHidden(!isHidden)
    }

    return(
        <div id='comment-container'>
            <CommentForm postId={postId}/>
            <button onClick={toggleView}>
                {isHidden ? 'Show Comments' : 'Hide Comments'}
            </button>
            {!isHidden && <CommentList postId={postId}/>}
        </div>
    )
}