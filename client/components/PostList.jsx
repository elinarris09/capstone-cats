import React from 'react'
import Post from './Post'

export default function PostList(props) {

    const { posts } = props
    console.log(posts)

    const sortedPosts = posts.slice().sort((a, b) => 
            b.upvotes.length - a.upvotes.length
        )
    
    const postElements =
        sortedPosts.map(post => {
            console.log(post._id)
            return (
                <Post {...post} key={post._id} />
            )
        })

    return (
        <div>
            {postElements}
        </div>
    )
}