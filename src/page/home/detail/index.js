import React from "react";
import { useLocation } from "react-router-dom";
import "./css/style.css";
import Slider from "../../../components/detalBeaches/Slider";
import CommentSection from "../../../components/detalBeaches/CommentSection";
import Sidebar from "../../../components/detalBeaches/Sidebar";
function DetailBeaches() {
  const location = useLocation();
  const { id } = location.state || {};
  return (
    <>
      <Slider id={id} />
      <div className="page-content">
        <div className="content-layout">
          <CommentSection idBeaches={id} />
          <Sidebar />
        </div>
      </div>
    </>
  );
}

export default DetailBeaches;
