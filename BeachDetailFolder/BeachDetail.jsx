import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBeachById } from "../services/api/beachServices";
import { getCommentsByBeachId, postComment } from "../services/api/commentServices";
import "./BeachDetail.css"; // import css riêng

function BeachDetail() {
  const { id } = useParams();
  const [beach, setBeach] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // ảnh đang xem

  // Lấy thông tin bãi biển + bình luận
  useEffect(() => {
    const fetchData = async () => {
      const data = await getBeachById(id);
      setBeach(data);

      const commentData = await getCommentsByBeachId(id);
      setComments(commentData);
    };
    fetchData();
  }, [id]);

  if (!beach) return <p>Đang tải...</p>;

  const handleLike = () => {
    setLiked(!liked);
  };

  // Gửi bình luận
  const handleComment = async () => {
    if (comment.trim() === "") return;

    const newComment = { text: comment, user: "Người dùng ẩn danh", createdAt: new Date() };
    await postComment(id, newComment); // gọi API lưu bình luận
    setComments([...comments, newComment]); // hiển thị ngay trên UI
    setComment("");
  };

  // Hàm điều khiển slider
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === beach.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? beach.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="beach-detail-card">
      {/* Thông tin biển */}
      <h1 className="beach-title">{beach.name}</h1>
      <p><b>Khu vực:</b> {beach.region}</p>
      <p><b>Địa điểm:</b> {beach.location}</p>
      <p className="beach-description">{beach.description}</p>

      {/* Hình ảnh (slider nếu >= 3 ảnh) */}
      <div className="image-slider-container">
        {beach.images.length >= 3 ? (
          <div className="slider">
            <button className="prev-btn" onClick={prevSlide}>❮</button>
            <img
              src={`http://localhost/php_code${beach.images[currentIndex]}`}
              alt={`${beach.name}-${currentIndex}`}
              className="slider-image"
            />
            <button className="next-btn" onClick={nextSlide}>❯</button>
          </div>
        ) : (
          <div className="image-grid">
            {beach.images.map((img, index) => (
              <img
                key={index}
                src={`http://localhost/php_code${img}`}
                alt={`${beach.name}-${index}`}
                className="beach-image"
              />
            ))}
          </div>
        )}
      </div>

      {/* Nút tym */}
      <button
        onClick={handleLike}
        className={`like-btn ${liked ? "liked" : ""}`}
      >
        {liked ? "❤️ Đã thích" : "🤍 Thích"}
      </button>

      {/* Bình luận công khai */}
      <div className="comment-section">
        <h3>Bình luận</h3>
        <div className="comment-input">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Viết bình luận..."
          />
          <button onClick={handleComment}>Gửi</button>
        </div>

        <ul className="comment-list">
          {comments.map((c, i) => (
            <li key={i}>
              <b>{c.user}:</b> {c.text}
              <br />
              <small>{new Date(c.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BeachDetail;
