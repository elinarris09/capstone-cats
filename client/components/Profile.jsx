import React, { useEffect, useContext } from "react";
import { UserContext } from '../context/UserProvider';
import PostList from './PostList';
import PostForm from "./PostForm";

export default function Profile() {
    const { user: { username }, getUserPosts, posts, getAllComments } = useContext(UserContext)

    useEffect(() => {
        getUserPosts()
        getAllComments()
    }, [])

    return(
        <>
            <h1>Hi {username}, good to see you!</h1>
            <PostForm />
            <PostList posts={posts} />
        </>
    )
}