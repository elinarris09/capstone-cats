import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import PostList from './PostList'

export default function Public() {

    const { getAllPosts, allPosts, user, getAllComments, posts } = useContext(UserContext)

    useEffect(() => {
        getAllPosts()
        getAllComments()
    }, [])

    return (
        <div>
        Public
        <h2>Current User: {user.username}</h2>
        <PostList posts={allPosts}/>
        </div>
    )
}