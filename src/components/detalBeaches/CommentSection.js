import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { commentApi, commentList, timeAgo, url } from "../../api/function";

const CommentForm = ({ onAddComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddComment(text);
      setText("");
    } else {
      toast.error("You have not written comment content");
    }
  };

  return (
    <form
      className="w-full border rounded-2xl shadow-md p-4 mb-6 bg-white"
      onSubmit={handleSubmit}
    >
      <textarea
        className="w-full border rounded-xl p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Write your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition"
        type="submit"
      >
        Comment
      </button>
    </form>
  );
};

const CommentItem = ({ comment }) => {
  return (
    <div className="flex items-start gap-3 border rounded-xl p-4 shadow-sm mb-4 bg-white w-full">
      <div className="w-12 h-12 rounded-full overflow-hidden border">
        <img
          src={url + "" + comment?.account?.avata}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-semibold text-gray-800">
            {comment?.account?.full_name}
          </span>
          <span className="text-sm text-gray-500">
            {timeAgo(comment.created_at)}
          </span>
        </div>
        <p className="text-gray-700">{comment.message}</p>
      </div>
    </div>
  );
};

const CommentList = ({ comments }) => {
  return (
    <div className="space-y-3 w-full">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

function CommentSection({ idBeaches }) {
  const navigate = useNavigate();
  const [initialComments, setInitComment] = useState([]);

  useEffect(() => {
    fetchDataComment();
  }, [idBeaches]);

  const fetchDataComment = async () => {
    try {
      const rs = await commentList(idBeaches);
      setInitComment(rs?.data?.data);
    } catch (error) {}
  };

  const handleAddComment = async (text) => {
    if (!localStorage.getItem("token") && localStorage.getItem("role") != 2) {
      navigate("/login-account");
      return;
    }
    try {
      const data = { beach_id: idBeaches, message: text };
      await commentApi(data);
      fetchDataComment();
    } catch (error) {}
  };

  return (
    <div className="w-full px-4">
      {localStorage.getItem("token") && localStorage.getItem("role") == 2 ? (
        <section className="mb-8 w-full">
          <h2 className="text-xl font-bold mb-3">Share your comment</h2>
          <CommentForm onAddComment={handleAddComment} />
        </section>
      ) : null}
      <section className="w-full">
        <h2 className="text-xl font-bold mb-3">Comments</h2>
        <CommentList comments={initialComments} />
      </section>
    </div>
  );
}

export default CommentSection;
