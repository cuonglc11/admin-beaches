import React, { useState } from "react";
import "./style/BeachCard.css";
import { url } from "../api/function";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaHeart, FaRegComment } from "react-icons/fa";
import DOMPurify from "dompurify";

function BeachCard({ beach }) {
  const thumbnail =
    beach.images && beach.images.length > 0
      ? url + "" + beach.images[0].img_link
      : "default.jpg";
  const navigate = useNavigate();
  const truncateHTML = (html, maxLength = 100) => {
    const text = new DOMParser().parseFromString(html, "text/html").body
      .textContent;
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };
  const [mapModalOpen, setMapModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition p-4">
        <img
          src={thumbnail}
          alt={beach.name}
          className="w-full h-48 object-cover rounded-md cursor-pointer"
          onClick={() => navigate("/detail-beaches/" + beach.id)}
        />
        <h2
          className="mt-3 text-xl font-semibold text-gray-800 cursor-pointer hover:text-blue-600"
          onClick={() => navigate("/detail-beaches/" + beach.id)}
        >
          {beach.name}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          <b className="text-gray-700">Regions:</b> {beach.region.name}
        </p>
        <div
          className="mt-2 text-gray-600 text-sm"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(truncateHTML(beach.description, 120)),
          }}
        />

        <div className="flex items-center justify-between mt-3 w-full">
          {beach.latitude && beach.longitude && (
            <button
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
              onClick={() => setMapModalOpen(true)}
            >
              <FaMapMarkerAlt /> Map
            </button>
          )}
          <div className="flex items-center justify-between gap-3">
            <FaHeart />
            <FaRegComment className="text-lg" />
            <span>1</span>
          </div>
        </div>
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
