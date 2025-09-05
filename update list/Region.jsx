import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BeachCard from "../components/BeachCard";
import { getBeaches, getRegions } from "../services/api/beachServices";
import "./Region.css";

export default function Region() {
  const { region } = useParams();
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(region || "all");
  const [beaches, setBeaches] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getRegions().then(setRegions);
  }, []);

  useEffect(() => {
    getBeaches(selectedRegion).then(setBeaches);
  }, [selectedRegion]);

  const handleSelect = (value) => {
    setSelectedRegion(value);
    setIsOpen(false);
  };

  const selectedRegionName =
    selectedRegion === "all"
      ? "Tất cả"
      : regions.find((r) => r.id === selectedRegion)?.name || "Chọn khu vực";

  return (
    <div className="region-container">
      <h2 className="title">🌊 Danh sách bãi biển</h2>

      {/* Custom Dropdown */}
      <div className="dropdown">
        <button
          className="dropdown-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedRegionName}
          <span className="arrow">{isOpen ? "▲" : "▼"}</span>
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            <div
              className="dropdown-item"
              onClick={() => handleSelect("all")}
            >
              Tất cả
            </div>
            {regions.map((r) => (
              <div
                key={r.id}
                className="dropdown-item"
                onClick={() => handleSelect(r.id)}
              >
                {r.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Danh sách bãi biển */}
      <div className="grid">
        {beaches.length > 0 ? (
          beaches.map((beach) => (
            <div key={beach.id} className="card-wrapper">
              <BeachCard beach={beach} />
            </div>
          ))
        ) : (
          <p className="empty">Không có bãi biển nào trong khu vực này.</p>
        )}
      </div>
    </div>
  );
}
