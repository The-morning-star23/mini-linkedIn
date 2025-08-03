import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp, getDoc, doc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

function CreatePost() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || !auth.currentUser) return;

    setLoading(true);
    try {
      // Get the current user's name from the 'users' collection
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      const userName = userDoc.exists() ? userDoc.data().name : 'Anonymous';

      // Add a new document to the 'posts' collection
      await addDoc(collection(db, 'posts'), {
        text: text,
        authorId: auth.currentUser.uid,
        authorName: userName,
        createdAt: serverTimestamp(),
      });
      setText(''); // Clear the textarea after posting
    } catch (error) {
      console.error("Error creating post:", error);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          rows="3"
        ></textarea>
        <div className="text-right mt-2">
          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;