import { useState, useContext } from "react"
import { UserContext } from "../context/UserProvider"

export default function PostForm() {
    const { addPost } = useContext(UserContext)
    const initState = {
        title: "",
        description: "",
        imgUrl: ""
    }

    const [formData, setFormData] = useState(initState)

    function handleChange(e) {
        const {name, value} = e.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        addPost(formData)
        setFormData(initState)
    }

    return (
        <form id='post-form' onSubmit={handleSubmit}>
            <input
            name="title"
            placeholder="cat title or name"
            value={formData.title}
            onChange={handleChange}
            />
            <input
            name="description"
            placeholder="cat description"
            value={formData.description}
            onChange={handleChange}
            />
            <input
            name="imgUrl"
            placeholder="image URL of cat"
            value={formData.imgUrl}
            onChange={handleChange}
            />
            <button>Submit</button>
        </form>
    )
}