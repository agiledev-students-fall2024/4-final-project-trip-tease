import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { addCommentToActivity } from '../../api/apiUtils'; // Utility function
import { fetchUserProfile } from '../../api/apiUtils'; // Updated function to get user profile
import './ActivityComments.css';

const ActivityComments = ({ activityId, comments, refreshActivities }) => {
  const [newComment, setNewComment] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user details on component mount
  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const user = await fetchUserProfile(); // Use the updated function
        setCurrentUser(user); // Store user data
      } catch (error) {
        console.error('Error fetching current user:', error.message);
      }
    };
    loadCurrentUser();
  }, []);

  const handleAddComment = async () => {
    if (newComment.trim() === '' || !currentUser) return; // Prevent if no user or empty comment

    const commentData = {
      commentString: newComment,
      userId: currentUser.id, // Use the dynamic userId from the fetched user
    };

    try {
      await addCommentToActivity(activityId, commentData);
      setNewComment('');
      refreshActivities(); // Reload activity data including comments
    } catch (err) {
      console.error('Error adding comment:', err.message);
    }
  };

  return (
    <div className="comments-section">
      <h3 className="comments-title">Comments</h3>
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment-item">
              <div className="comment-header">
                <img
                  src={`data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='30'>${comment.cachedAvatar}</text></svg>`}
                  alt="User emoji avatar"
                  className="comment-avatar"
                />
                <div className="comment-metadata">
                  <span className="comment-author">
                    {comment.cachedUsername || 'Anonymous'}
                  </span>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="comment-text">{comment.commentString}</p>
            </div>
          ))
        ) : (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        )}
      </div>
      <div className="comment-input-container">
        <textarea
          className="comment-input"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        ></textarea>
        <button className="comment-submit-button" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
    </div>
  );
};

ActivityComments.propTypes = {
  activityId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      commentString: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      cachedUsername: PropTypes.string,
      cachedAvatar: PropTypes.string,
    })
  ).isRequired,
  refreshActivities: PropTypes.func.isRequired,
};

export default ActivityComments;
