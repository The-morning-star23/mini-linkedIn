import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    
    // onSnapshot listens for real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsData);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading feed...</p>;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <div className="font-bold">
              <Link to={`/profile/${post.authorId}`} className="text-indigo-600 hover:underline">
                {post.authorName}
              </Link>
            </div>
            <span className="text-gray-500 text-sm ml-2">
              · {new Date(post.createdAt?.toDate()).toLocaleString()}
            </span>
          </div>
          <p className="text-gray-800">{post.text}</p>
        </div>
      ))}
    </div>
  );
}

export default PostFeed;