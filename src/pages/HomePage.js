import React from 'react';
import CreatePost from '../components/posts/CreatePost';
import PostFeed from '../components/posts/PostFeed';
import { useAuth } from '../context/AuthContext';

function HomePage() {
  const { currentUser } = useAuth();

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Public Feed</h1>
      {currentUser && <CreatePost />}
      <PostFeed />
    </div>
  );
}

export default HomePage;