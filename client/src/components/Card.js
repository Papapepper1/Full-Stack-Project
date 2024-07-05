import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import { supabase } from '../client';

const Card = (props) => {
    const { id, title, post, upvotes, setPost} = props;
    const [localUpvotes, setLocalUpvotes] = useState(upvotes);
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // Customize the format as needed
    };
    

    return (
        <div className="Card">
            <Link to={`/post/${id}`} className="CardLink">
                <p className="title">{title}</p>
            </Link>
            <p className="upvotes">{"Upvotes: " + localUpvotes}</p>
            <p className="createdAt">{"Posted on: " + formatDate(props.created_at)}</p>
        </div>
    );
};

export default Card;
