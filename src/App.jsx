import { useEffect, useState } from "react";

function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then(response => response.json())
      .then(data => setComments(data.posts));
  }, []);

  return (
    <div className="container">
      <div className="comments-content">
        {comments.map(comment => (
          <div key={comment.id} className="comment-item">
            <h3>{comment.title}</h3>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
