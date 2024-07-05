// ReadPosts.js
import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import SearchBar from '../components/SearchBar';
import { supabase } from '../client';
import './ReadPosts.css';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const { data, error } = await supabase
            .from('Posts')
            .select()
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching posts:', error.message);
        } else {
            setPosts(data);
            setFilteredPosts(data); // Initialize filteredPosts with all posts
        }
    };

    const handleSearch = (query) => {
        if (query.trim() === "") {
            // If the query is empty, display all posts
            setFilteredPosts(posts);
        } else {
            // Filter posts based on the search query
            const filtered = posts.filter(post =>
                post.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPosts(filtered);
        }
    };

    const handleSortNewest = () => {
        const sorted = [...filteredPosts].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setFilteredPosts(sorted);
    };

    const handleSortMostPopular = () => {
        const sorted = [...filteredPosts].sort((a, b) => b.upvotes - a.upvotes);
        setFilteredPosts(sorted);
    };
    return (
        <div>
            <SearchBar handleSearch={handleSearch} />
            <br />

            <div className="SortButtons">
                <button onClick={handleSortNewest}>Sort by Newest</button>
                <button onClick={handleSortMostPopular}>Sort by Most Popular</button>
            </div>
            <br />
            
            <div className="ReadPosts">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <Card key={post.id} id={post.id} title={post.title} post={post.post} upvotes={post.upvotes} created_at={post.created_at} />
                    ))
                ) : (
                    <h2>No matching posts found.</h2>
                )}
            </div>
        </div>
    );
};

export default ReadPosts;
