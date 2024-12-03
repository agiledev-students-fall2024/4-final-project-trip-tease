import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addCommentToActivity } from '../../api/apiUtils'; // New API utility for adding comments
import './PastActivityCard.css';

const PastActivityCard = ({ id, title, description, price, comments, imageUrl }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentList, setCommentList] = useState(comments || []);

  const toggleDetails = () => setIsExpanded((prev) => !prev);

  const addComment = async () => {
    if (newComment.trim()) {
      try {
        const addedComment = await addCommentToActivity(id, { commentString: newComment });
        setCommentList([...commentList, addedComment.commentString]); // Update local comment list
        setNewComment(''); // Clear input
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <div className="past-activity-card">
      <div className="past-activity-header" onClick={toggleDetails}>
        <h3>{title}</h3>
      </div>

      {isExpanded && (
        <div className="past-activity-details">
          <div className="past-details-content">
            <div className="past-description-section">
              <p>{description}</p>
              <p>Price: {price}</p>
            </div>

            <div className="past-image-section">
              <img src={imageUrl} alt={title} className="past-activity-image" />
            </div>
          </div>

          <div className="past-comments-section">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={addComment}>Add Comment</button>

            <div className="past-comments-list">
              {commentList.map((comment, index) => (
                <p key={index}>{comment}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PastActivityCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.string),
  imageUrl: PropTypes.string,
};

PastActivityCard.defaultProps = {
  description: 'No description available',
  price: '$',
  comments: [],
  imageUrl: '',
};

export default PastActivityCard;
