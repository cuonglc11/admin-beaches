import React from "react";
import "./style/BeachCard.css";
import { url } from "../api/function";
import { useNavigate } from "react-router-dom";

function BeachCard({ beach }) {
  console.log(beach);
  const thumbnail =
    beach.images && beach.images.length > 0
      ? url + "" + beach.images[0].img_link
      : "default.jpg";
  const navigate = useNavigate();
  return (
    <div
      className="beach-card"
      onClick={() => navigate("/detail-beaches/" + beach.id)}
    >
      <img src={thumbnail} alt={beach.name} className="beach-thumbnail" />
      <h2>{beach.name}</h2>
      <p>
        <b>Regions:</b> {beach.region.name}
      </p>
      <div dangerouslySetInnerHTML={{ __html: beach.description }} />
    </div>
  );
}

export default BeachCard;
