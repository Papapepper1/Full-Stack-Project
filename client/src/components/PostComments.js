import React, { useState, useEffect } from 'react';
import { supabase } from '../client';

const PostComments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        fetchComments();
    }, [postId]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Customize the format as needed
    };


    const fetchComments = async () => {
        try {
            const { data, error } = await supabase
                .from('Comments')
                .select('*')
                .eq('postId', postId);

            if (error) {
                console.error('Error fetching comments:', error.message);
            } else {
                setComments(data || []);
            }
        } catch (error) {
            console.error('Error fetching comments:', error.message);
        }
    };

    const handleAddComment = async () => {
        if (newComment.trim() === '') return;

        try {
            const { data, error } = await supabase
                .from('Comments')
                .insert({ postId, content: newComment });

            if (error) {
                console.error('Error adding comment:', error.message);
            } else {
                setComments([...comments, data[0]]);
                setNewComment('');
            }
        } catch (error) {
            console.error('Error adding comment:', error.message);
        }
    };

    return (
        <div>
            <h2>Comments</h2>
            <div>
                {comments.map(comment => (
                    <div key={comment.id}>
                        <p>{comment.content}</p>
                        <p>Posted on: {formatDate(comment.createdAt)}</p>
                    </div>
                ))}
            </div>
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
            <button onClick={handleAddComment}>Add Comment</button>
        </div>
    );
};

export default PostComments;
