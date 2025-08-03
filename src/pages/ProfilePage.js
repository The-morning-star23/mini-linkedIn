import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

function ProfilePage() {
  const { userId } = useParams(); // Get the userId from the URL
  const [userProfile, setUserProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect to fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        setUserProfile(userDocSnap.data());
      } else {
        console.log("No such user!");
      }
    };

    fetchUserProfile();
  }, [userId]);

  // Effect to fetch user's posts in real-time
  useEffect(() => {
    const postsQuery = query(
      collection(db, 'posts'),
      where('authorId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ id: doc.id, ...doc.data() });
      });
      setUserPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [userId]);

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  if (!userProfile) {
    return <div className="text-center mt-10">User not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold">{userProfile.name}</h1>
        <p className="text-md text-gray-600 mt-1">{userProfile.email}</p>
        <p className="text-gray-800 mt-4">{userProfile.bio}</p>
      </div>

      {/* User's Posts */}
      <h2 className="text-2xl font-bold mb-4">Posts by {userProfile.name}</h2>
      <div className="space-y-4">
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="text-gray-500 text-sm mb-2">
                {new Date(post.createdAt?.toDate()).toLocaleString()}
              </div>
              <p className="text-gray-800">{post.text}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">This user hasn't posted anything yet.</p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;