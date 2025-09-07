import React, { useEffect, useState } from "react";
import "./style.css";
import { listRegion, listRegionBeaches } from "../../../api/function";
import BeachCard from "../../../components/BeachCard";
import { useParams } from "react-router-dom";

function RegionBeaches() {
  const [beaches, setBeaches] = useState([]);
  const [region, setRegion] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetchBeaches();
  }, [id]);
  const fetchBeaches = async () => {
    try {
      const rs = await listRegionBeaches(id);
      console.log(rs.data?.message);
      setRegion(rs.data?.message || "");
      setBeaches(rs.data?.data || []);
    } catch (error) {}
  };

  return (
    <>
      <div className="region-container">
        <h2 className="title">
          🌊 List of beaches to region :{" "}
          <span className="text-[red]">{region}</span>
        </h2>

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
