import { useEffect, useState } from "react";

function App() {
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [selectedCommentReplies, setSelectedCommentReplies] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((data) => setComments(data.posts));
  }, []);

  useEffect(() => {
    if (selectedComment !== null) {
      fetch(`https://dummyjson.com/posts/${selectedComment.id}/comments`)
        .then((response) => response.json())
        .then((data) => setSelectedCommentReplies(data.comments));
    }
  }, [selectedComment]);

  function returnMainScreen() {
    setSelectedComment(null);
    setSelectedCommentReplies(null);
  }

  return (
    <div className="container">
      {selectedCommentReplies ? (
        <CommentDetails
          selectedComment={selectedComment}
          selectedCommentReplies={selectedCommentReplies}
          returnMainScreen={returnMainScreen}
        />
      ) : (
        <Main comments={comments} setSelectedComment={setSelectedComment} />
      )}
    </div>
  );
}

function Main({ comments, setSelectedComment }) {
  return (
    <>
      <div className="comments-content">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item" onClick={() => setSelectedComment(comment)}>
            <div className="comment-data">
              <h3>{comment.title}</h3>
              <p>{comment.body}</p>
            </div>
            <div className="comment-footer">
              <div className="comment-reactions">
                <span>👍 {comment.reactions.likes}</span>
                <span>👎 {comment.reactions.dislikes}</span>
                <span>👁️ {comment.views}</span>
              </div>
              <div className="comment-tags">
                {comment.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function CommentDetails({ selectedComment, selectedCommentReplies, returnMainScreen }) {
  return (
    <>
      <button className="back-btn" onClick={returnMainScreen}>👈 Geri</button>
      <div className="comment-details">
        <div className="comment-details-header">
          <h1>{selectedComment.title}</h1>
          <div className="comment-tags">
            {selectedComment.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p>{selectedComment.body}</p>
        <div className="comment-reactions">
          <span>👍 {selectedComment.reactions.likes}</span>
          <span>👎 {selectedComment.reactions.dislikes}</span>
          <span>👁️ {selectedComment.views}</span>
        </div>
        <div className="comment-replies">
          <h2>Replies</h2>
          {selectedCommentReplies.map((reply) => (
            <div className="comment-reply">
              <div className="reply-user">
                <strong className="user-fullname">{reply.user.fullName}</strong>
                <span className="user-username">@{reply.user.username}</span>
              </div>
              <div className="comment-reply-body">
                <span>👍 {reply.likes}</span>
                <p>{reply.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
