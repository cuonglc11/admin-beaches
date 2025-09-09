import React, { useEffect, useState } from "react";
import "./style.css";
import { listRegion, listRegionBeaches } from "../../../api/function";
import BeachCard from "../../../components/BeachCard";
import { useParams } from "react-router-dom";

function RegionBeaches() {
  const [beaches, setBeaches] = useState([]);
  const [region, setRegion] = useState("");
  const { id } = useParams();
  const [mapData, setMapData] = useState(null);
  useEffect(() => {
    fetchBeaches();
  }, [id]);
  const fetchBeaches = async () => {
    try {
      const rs = await listRegionBeaches(id == "all" ? null : id);
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
                <BeachCard
                  beach={beach}
                  onOpenMap={(lat, lng) => setMapData({ lat, lng })}
                />
              </div>
            ))
          ) : (
            <p className="empty">There are no beaches in this area.</p>
          )}
        </div>
      </div>
      {mapData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-4 w-[90%] md:w-[60%] relative">
            <button
              onClick={() => setMapData(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
            >
              ✕
            </button>
            <iframe
              src={`https://www.google.com/maps?q=${mapData.lat},${mapData.lng}&hl=es;z=14&output=embed`}
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

export default RegionBeaches;
