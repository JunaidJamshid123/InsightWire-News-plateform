import React, { useState } from 'react';
import './Comments.css';

const Comments = () => {
    const [comments, setComments] = useState([
        { id: 1, username: "John Doe", comment: "This is very insightful!" },
        { id: 2, username: "Jane Smith", comment: "I love the unbiased perspective here." },
    ]);
    const [newComment, setNewComment] = useState("");

    const handleCommentSubmit = () => {
        if (newComment.trim() !== "") {
            const updatedComments = [
                ...comments,
                { id: comments.length + 1, username: "Anonymous", comment: newComment.trim() },
            ];
            setComments(updatedComments);
            setNewComment("");
        }
    };

    return (
        <div className="comments-section">
            <h2 className="section-title">Comments</h2>
            <div className="add-comment">
                <textarea
                    placeholder="Write your comment here..."
                    className="comment-textarea"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button className="submit-button" onClick={handleCommentSubmit}>
                    Post Comment
                </button>
            </div>
            <div className="comments-list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <p>
                            <strong>{comment.username}</strong>: {comment.comment}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
