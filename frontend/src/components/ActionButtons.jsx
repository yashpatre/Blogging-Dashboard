// src/components/ActionButtons.jsx
export default function ActionButtons({ onLike, onComment, onShare, liked = false, likeCount = 0 }) {
  return (
    <div className="flex justify-around text-gray-500 mt-4 border-t pt-2">
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onLike?.(); }}
        className="flex items-center gap-2 hover:text-primary"
      >
        <span>{liked ? "❤️" : "🤍"}</span>
        <span>{likeCount}</span>
      </button>

      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onComment?.(); }}
        className="flex items-center gap-1 hover:text-primary"
      >
        💬 Comment
      </button>

      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onShare?.(); }}
        className="flex items-center gap-1 hover:text-primary"
      >
        ↗ Share
      </button>
    </div>
  );
}
