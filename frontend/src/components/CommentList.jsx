import Comment from "./Comment";

export default function CommentList({ comments = [], handleDeleteComment, currentUser }) {
  return (
    <div className="mt-4 space-y-4">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment 
            key={comment._id} 
            comment={comment} 
            handleDeleteComment={handleDeleteComment} 
            currentUser={currentUser} 
          />
        ))
      ) : (
        <p className="text-gray-500">No comments yet. Be the first!</p>
      )}
    </div>
  );
}
