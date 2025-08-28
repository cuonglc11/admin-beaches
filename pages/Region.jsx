import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BeachCard from "../components/BeachCard";
import { getBeaches, getRegions } from "../services/api/beachServices";

export default function Region() {
  const { region } = useParams(); // lấy id từ URL (nếu có)
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(region || "all");
  const [beaches, setBeaches] = useState([]);

  // Lấy danh sách khu vực từ DB
  useEffect(() => {
    getRegions().then(setRegions);
  }, []);

  // Lấy danh sách bãi biển theo khu vực
  useEffect(() => {
    getBeaches(selectedRegion).then(setBeaches);
  }, [selectedRegion]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Danh sách bãi biển</h2>

      <div className="mb-6">
        <label htmlFor="region" className="mr-3 font-medium">Chọn khu vực:</label>
        <select
          id="region"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="all">Tất cả</option>
          {regions.map(r => (
            <option key={r.id} value={r.id}>{r.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {beaches.map(beach => (
          <BeachCard key={beach.id} beach={beach} />
        ))}
      </div>
    </div>
  );
}
