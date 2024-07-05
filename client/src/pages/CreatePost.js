import React, { useState } from 'react';
import './CreatePost.css';
import { supabase } from '../client';

const CreatePost = () => {
    const [post, setPost] = useState({ title: "", post: "", image: ""});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const createPost = async (event) => {
        event.preventDefault();
        
        await supabase
            .from('Posts')
            .insert({title: post.title, post: post.post, image: post.image, upvotes: 0})
            .select();
        
        window.location = '/';
    };

    return (
        <div>
            <form>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange} /><br />
                <br />

                <label for="post">Post</label><br />
                <input type="text" id="post" name="post" onChange={handleChange} /><br />
                <br />

                <label for="image">Image URL</label><br />
                <input type="text" id="image" name="image" onChange={handleChange} /><br />

                <input type="submit" value="Submit"  onClick={createPost}/>
            </form>
        </div>
    );
};

export default CreatePost;
