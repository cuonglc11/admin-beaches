// pages/Home.jsx
import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import BeachCard from "../components/BeachCard";
import { getBeaches } from "../services/api/beachServices";
import "./BeachList.css"

function Home() {
  const { searchQuery } = useContext(SearchContext);
  const [beaches, setBeaches] = useState([]);

  useEffect(() => {
    const fetchBeaches = async () => {
      try {
        const data = await getBeaches();
        setBeaches(data);
      } catch (error) {
        console.error("Lỗi khi load beaches:", error);
      }
    };
    fetchBeaches();
  }, []);

  // Lọc theo search query
  const filteredBeaches = beaches.filter((beach) =>
    beach.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>Danh sách bãi biển</h1>
      <div className="beach-list">
        {filteredBeaches.length > 0 ? (
          filteredBeaches.map((beach) => (
            <BeachCard key={beach.id} beach={beach} />
          ))
        ) : (
          <p>Không tìm thấy bãi biển nào.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
