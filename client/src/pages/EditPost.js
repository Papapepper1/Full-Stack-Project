import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css';
import { supabase } from '../client';

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({ id: null, title: "", post: "", image: "", upvotes: 0 });

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from('Posts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching post:', error);
        } else {
            setPost(data);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updatePost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .update({ title: post.title, post: post.post, image: post.image, upvotes: post.upvotes })
            .eq('id', id);

        window.location = '/';
    };

    const deletePost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .delete()
            .eq('id', id);

        window.location = '/';
    };

    return (
        <div>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br />

                <label htmlFor="post">Post</label><br />
                <textarea id="post" name="post" value={post.post} onChange={handleChange}></textarea><br />
                <br />

                <label htmlFor="image">Image URL</label><br />
                <input type="text" id="image" name="image" value={post.image} onChange={handleChange} /><br />
                <br />

                <input type="submit" value="Submit" onClick={updatePost} />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    );
};

export default EditPost;
