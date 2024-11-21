import React from 'react';
import './Comments.css';

const Comments = () => {
    const placeholderComments = [
        { id: 1, username: "John Doe", comment: "This is very insightful!" },
        { id: 2, username: "Jane Smith", comment: "I love the unbiased perspective here." },
    ];

    return (
        <div className="comments-section">
            <h2>Comments</h2>
            <div className="add-comment">
                <input
                    type="text"
                    placeholder="Your Name"
                    className="comment-input"
                />
                <textarea
                    placeholder="Add your comment..."
                    className="comment-textarea"
                />
                <button className="submit-button">Submit</button>
            </div>
            <div className="comments-list">
                {placeholderComments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p><strong>{comment.username}</strong>: {comment.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
