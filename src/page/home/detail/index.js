import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/style.css";
import Slider from "../../../components/detalBeaches/Slider";
import CommentSection from "../../../components/detalBeaches/CommentSection";
import Sidebar from "../../../components/detalBeaches/Sidebar";
import { detailBeaches } from "../../../api/function";
function DetailBeaches() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [slides, setSlides] = useState([]);
  const [description, setDescription] = useState("");
  useEffect(() => {
    const fetchDataImage = async () => {
      if (id) {
        try {
          const rs = await detailBeaches(id);
          setDescription(rs?.data?.data?.description);
          if (rs?.data?.data === null) {
            navigate("/this-page-does-not-exist");
          }

          const images = rs?.data?.data?.images || [];
          console.log(images);
          const formattedSlides = images.map((img) => ({
            id: img.id,
            image: img.img_link,
          }));
          setSlides(formattedSlides);
        } catch (error) {
          console.error("Failed to fetch slider images:", error);
          setSlides([]);
        }
      }
    };
    fetchDataImage();
  }, [id]);
  return (
    <>
      <Slider slide={slides} />
      <div className="page-content">
        <div
          className="text-gray-600 text-sm mb-4"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <div className="content-layout">
          <CommentSection idBeaches={id} />
          <Sidebar id={id} />
        </div>
      </div>
    </>
  );
}

export default DetailBeaches;
