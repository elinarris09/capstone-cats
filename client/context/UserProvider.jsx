import React, { useState } from "react"
import axios from 'axios'

export const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        posts: [],
        errMsg: ""
    }


    const [userState, setUserState] = useState(initState)
    const [allPosts, setAllPosts] = useState([])
    const [allComments, setAllComments] = useState([])
    
    async function signup(creds) {
        try {
            const res = await axios.post('/api/auth/signup', creds)
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevState => {
                return {
                    ...prevState,
                    user: user,
                    token: token
                }
            })
        } catch (err) {
            handleAuthError(err.response.data.errMsg)
        }
    }

    async function login(creds) {
        try {
            const res = await axios.post('/api/auth/login', creds)
            const { user, token } = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevState => {
                return {
                    ...prevState,
                    user: user,
                    token: token
                }
            })
        } catch (err) {
            handleAuthError(err.response.data.errMsg)
        }
    }

    async function logout() {
        try {
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    token: "",
                    user: {}
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    function handleAuthError(errMsg) {
        setUserState(prevState => {
            return{
                ...prevState,
                errMsg
            }
        })
    }

    function resetAuthError() {
        setUserState(prevState => {
            return {
                ...prevState,
                errMsg: ""
            }
        })
    }

    //get all posts
    async function getAllPosts() {
        try {
            const res = await userAxios.get('/api/main/posts')
            setAllPosts(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    //upvote
    async function handleUpvote(postId) {
        try {
            const res = await userAxios.put(`/api/main/posts/upvotes/${postId}`)
            setAllPosts(prevPosts => prevPosts.map(post => post._id === postId ? res.data : post))
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    posts: prevUserState.posts.map(
                        post => post._id === postId ? res.data : post
                    )
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    //downvotes
    async function handleDownvote(postId) {
        try {
            const res = await userAxios.put(`/api/main/posts/downvotes/${postId}`)
            setAllPosts(prevPosts => prevPosts.map(post => post._id === postId ? res.data : post))
            setUserState(prevUserState => {
                return {
                    ...prevUserState,
                    posts: prevUserState.posts.map(
                        post => post._id === postId ? res.data : post
                    )
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    //get all posts from one user
    async function getUserPosts() {
        try {
            const res = await userAxios.get('/api/main/posts/user')
            setUserState(prevState => {
                return {
                    ...prevState,
                    posts: res.data
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    //add one post
    async function addPost(newPost) {
        try {
            const res = await userAxios.post('/api/main/posts', newPost)
            setUserState(prevState => {
                return {
                    ...prevState,
                    posts: [...prevState.posts, res.data]
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    //delete post
    async function deletePost(id) {
        try {
            const res = await userAxios.delete(`/api/main/posts/${id}`)
            setAllPosts(prevPosts => {
                return (
                    prevPosts.filter(post => post._id !== id)
                )
            })
            setUserState(prevUserState => {
                return {
                ...prevUserState,
                posts: prevUserState.posts.filter(post => post._id !== id)
                }
            })
        }
        catch(err) {
            console.log(err)
        }
    }
    
    //update or edit post
    async function editPost(updates, id) {
        try {
            const res = await userAxios.put(`/api/main/posts/${id}`, updates)
            setAllPosts(prevPosts => 
                prevPosts.map(
                    post => 
                    post._id !== id ? post : res.data
                )
            )
            setUserState(prevState => {
                return {
                    ...prevState,
                    posts: prevState.posts.map(
                        post => 
                        post._id !== id ? post : res.data)
                }
            })
        } catch (err) {
            console.log('edit post function error', err)
        }
    }

    //get all comments
    async function getAllComments(){
        try {
            const res = await userAxios.get('/api/main/comments')
            setAllComments(res.data)
        } catch (err) {
            console.log(err)
        }
    }

    //add comment
    async function addComment(id, comment) {
        try {
            const res = await userAxios.post(`/api/main/comments/${id}`, comment)
            setAllComments(prevComments => {
                return [
                    ...prevComments,
                    res.data
                ]
            })
        } catch (error) {
            console.log(error)
        }
    }

    //delete comment
    async function deleteComment(id) {
        try {
            const res = await userAxios.delete(`/api/main/comments/${id}`)
            setAllComments(prevComments => prevComments.filter
                (comment => comment._id !== id)
            )
        } catch (err) {
            console.log(err)
        }
    }

    //edit comment
    async function editComment(updates, id) {
        try {
            const res = await userAxios.put(`/api/main/comments/${id}`, updates)
            setAllComments(prevComments => 
                prevComments.map(
                    comment => comment._id !== id ? comment : res.data
                )
            )
            getAllComments()
        } catch (err) {
            console.log('error in frontend, edit comment function', err)
        }
    }

    return (
        <UserContext.Provider value={{
            ...userState,
            signup,
            login,
            logout,
            addPost,
            editPost,
            getAllPosts,
            allPosts,
            deletePost,
            getUserPosts,
            handleAuthError,
            resetAuthError,
            handleUpvote,
            handleDownvote,
            getAllComments,
            allComments,
            addComment,
            deleteComment,
            editComment
            }}>
                {props.children}
        </UserContext.Provider>
    )
}