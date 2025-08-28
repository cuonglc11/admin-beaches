// pages/BeachDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBeachById } from "../services/api/beachServices";

function BeachDetail() {
  const { id } = useParams();
  const [beach, setBeach] = useState(null);

  useEffect(() => {
    const fetchBeach = async () => {
      const data = await getBeachById(id);
      setBeach(data);
    };
    fetchBeach();
  }, [id]);

  if (!beach) return <p>Đang tải...</p>;

  return (
    <div className="beach-detail">
      <h1>{beach.name}</h1>
      <p><b>Khu vực:</b> {beach.region}</p>
      <p><b>Địa điểm:</b> {beach.location}</p>
      <p>{beach.description}</p>
      <h3>Hình ảnh:</h3>
      <div className="image-gallery">
        {beach.images.map((img, index) => (
          <img key={index} src={img} alt={`${beach.name}-${index}`} className="beach-img" />
        ))}
      </div>
    </div>
  );
}

export default BeachDetail;
