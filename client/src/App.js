import './App.css';
import React from 'react';
import { useRoutes, useParams } from 'react-router-dom';
import ReadPosts from './pages/ReadPosts';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import PostInfo from './pages/PostInfo';
import Card from './components/Card'; // Import Card component
import SearchBar from './components/SearchBar';
import { Link } from 'react-router-dom';

const App = () => {
    const posts = [
        // Define your posts data here if needed
    ];

    // Sets up routes
    let element = useRoutes([
        {
            path: "/",
            element: <ReadPosts data={posts} />
        },
        {
            path: "/edit/:id",
            element: <EditPost data={posts} />
        },
        {
            path: "/new",
            element: <CreatePost />
        },
        {
            path: "/post/:id", // New route for displaying post info
            element: <PostInfo />
        }
    ]);

    return (
        <div className="App">
            <div className="header">
                <h1>NHL Hub</h1>
                <h2>Discuss About Anything NHL!</h2>
                <Link to="/"><button className="headerBtn">Explore Posts</button></Link>
                <Link to="/new"><button className="headerBtn">Create Post</button></Link>
            </div>
            {element}
        </div>
    );
}

export default App;
