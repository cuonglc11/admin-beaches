import React, { useState } from "react";
import "./style/BeachCard.css";
import { url } from "../api/function";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

function BeachCard({ beach }) {
  const thumbnail =
    beach.images && beach.images.length > 0
      ? url + "" + beach.images[0].img_link
      : "default.jpg";
  const navigate = useNavigate();

  // modal map state
  const [mapModalOpen, setMapModalOpen] = useState(false);

  return (
    <>
      <div className="beach-card">
        <img
          src={thumbnail}
          alt={beach.name}
          className="beach-thumbnail"
          onClick={() => navigate("/detail-beaches/" + beach.id)}
        />
        <h2 onClick={() => navigate("/detail-beaches/" + beach.id)}>
          {beach.name}
        </h2>
        <p>
          <b>Regions:</b> {beach.region.name}
        </p>
        <div dangerouslySetInnerHTML={{ __html: beach.description }} />

        {/* Nút mở bản đồ nếu có tọa độ */}
        {beach.latitude && beach.longitude && (
          <button className="map-btn" onClick={() => setMapModalOpen(true)}>
            <FaMapMarkerAlt /> Map
          </button>
        )}
      </div>

      {/* Modal Map */}
      {mapModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              onClick={() => setMapModalOpen(false)}
              className="close-btn"
            >
              ✕
            </button>
            <iframe
              src={`https://www.google.com/maps?q=${beach.latitude},${beach.longitude}&hl=es;z=14&output=embed`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Map"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

export default BeachCard;
