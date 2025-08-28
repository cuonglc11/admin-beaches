import React from "react";
import { useNavigate } from "react-router-dom";
import "./BeachCard.css";

function BeachCard({ beach }) {
  const navigate = useNavigate();

  // Lấy ảnh đầu tiên làm thumbnail (nếu có)
  const thumbnail = beach.images && beach.images.length > 0 ? beach.images[0] : "default.jpg";

  return (
    <div className="beach-card" onClick={() => navigate(`/beach/${beach.id}`)}>
      <img src={thumbnail} alt={beach.name} className="beach-thumbnail" />
      <h2>{beach.name}</h2>
      <p><b>Khu vực:</b> {beach.region}</p>
      <p>{beach.description}</p>
    </div>
  );
}

export default BeachCard;