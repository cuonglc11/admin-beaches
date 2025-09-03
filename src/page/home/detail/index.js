import React from "react";
import { useLocation } from "react-router-dom";
import "./css/style.css";
import Slider from "../../../components/detalBeaches/Slider";
import CommentSection from "../../../components/detalBeaches/CommentSection";
import Sidebar from "../../../components/detalBeaches/Sidebar";
function DetailBeaches() {
  const location = useLocation();
  const { beaches } = location.state || {};
  return (
    <>
      <Slider
        id={beaches.id}
        beachTitle={beaches.name}
        beachDescription={beaches.description}
      />
      <div className="page-content">
        <div className="content-layout">
          <CommentSection idBeaches={beaches.id} />
          <Sidebar beach={beaches} />
        </div>
      </div>
    </>
  );
}

export default DetailBeaches;
