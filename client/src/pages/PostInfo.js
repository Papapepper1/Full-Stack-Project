import React, { useState, useEffect } from 'react';
import { supabase } from '../client';
import { Link, useParams } from 'react-router-dom';
import './PostInfo.css';
import PostComments from '../components/PostComments.js'; // Import the PostComments component

const PostInfo = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data, error } = await supabase
                    .from('Posts')
                    .select()
                    .eq('id', id)
                    .single();

                if (error) {
                    console.error('Error fetching post:', error.message);
                } else {
                    console.log('Fetched post:', data);
                    setPost(data);
                }
            } catch (error) {
                console.error('Error fetching post:', error.message);
            }
        };

        fetchPost();
    }, [id]);

    const handleUpvote = async () => {
        await supabase
            .from('Posts')
            .update({ upvotes: post.upvotes + 1 })
            .eq('id', id);
        setPost(prevPost => ({ ...prevPost, upvotes: prevPost.upvotes + 1 }));
    };

    return (
        <div className="PostInfo">
            {post ? (
                <div className="PostInfoContainer">
                    <h1>Title: {post.title}</h1>
                    <p>Post: {post.post}</p>
                    {post.image && post.image.trim() !== '' && (
                        <img src={post.image} alt="Post Image" />
                    )}
                    <p>Upvotes: {post.upvotes}</p>
                    <button onClick={handleUpvote}>Upvote</button><br />
                    <Link to={`/edit/${post.id}`}>Want To Edit Your Post? Click Here!</Link>
                    
                    {/* Render the PostComments component and pass the postId */}
                    <PostComments postId={id} />
                </div>
            ) : (
                <h2>No Post Found!</h2>
            )}
        </div>
    );
};

export default PostInfo;
