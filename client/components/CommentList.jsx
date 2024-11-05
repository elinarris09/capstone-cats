import React, { useContext } from 'react'
import Comment from './Comment'
import { UserContext } from '../context/UserProvider'

export default function CommentList(props){
    const { allComments } = useContext(UserContext)
    const { postId } = props

    const filteredComments = allComments.filter(
        comment => comment.post === postId
    )

    const commentElements = filteredComments.map(
        comment => {
            return (
                <Comment {...comment} key={comment._id}/>
            )
        })

    return (
        <div>
            {commentElements}
        </div>
    )
}