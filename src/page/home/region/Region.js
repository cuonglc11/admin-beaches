import React, { useEffect, useState } from "react";
import "./style.css";
import { listRegion, listRegionBeaches } from "../../../api/function";
import BeachCard from "../../../components/BeachCard";
function RegionBeaches() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [regions, setRegions] = useState([]);
  const [beaches, setBeaches] = useState([]);

  const handleSelect = (value) => {
    setSelectedRegion(value);
    setIsOpen(false);
  };
  useEffect(() => {
    fetchDataSelect();
  }, []);
  useEffect(() => {
    fetchBeaches(selectedRegion);
  }, [selectedRegion]);
  const fetchBeaches = async (value) => {
    try {
      const rs = await listRegionBeaches(value === "all" ? null : value);
      setBeaches(rs.data?.data || []);
    } catch (error) {}
  };
  const fetchDataSelect = async () => {
    try {
      const rs = await listRegion();
      setRegions(rs.data?.data || []);
    } catch (error) {}
  };
  const selectedRegionName =
    selectedRegion === "all"
      ? "All"
      : regions.find((r) => r.id === selectedRegion)?.name || "Select area";

  return (
    <>
      <div className="region-container">
        <h2 className="title">🌊 List of beaches</h2>
        <div className="dropdown">
          <button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
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
        <div className="grid">
          {beaches.length > 0 ? (
            beaches.map((beach) => (
              <div key={beach.id} className="card-wrapper">
                <BeachCard beach={beach} />
              </div>
            ))
          ) : (
            <p className="empty">There are no beaches in this area.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default RegionBeaches;
