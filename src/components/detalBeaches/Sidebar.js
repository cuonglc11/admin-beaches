import React, { useEffect, useState } from "react";
import { listBeachesRegion, url } from "../../api/function";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ id }) => {
  const [listBeaches, setListBeaches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fechData();
  }, [id]);
  const fechData = async () => {
    console.log(id);
    try {
      const rs = await listBeachesRegion(id);
      // console.log(rs);
      setListBeaches(rs?.data?.data || []);
    } catch (error) {}
  };
  const detailBeaches = (value) => {
    // console.log(value);
    navigate("/detail-beaches/" + value.id);
  };

  return (
    <aside className="sidebar">
      <h2 className="section-title">Nearby Beaches</h2>
      <div className="nearby-list">
        {listBeaches.map((beach) => (
          <div
            onClick={() => detailBeaches(beach)}
            className="nearby-item  cursor-pointer"
            key={beach.name}
          >
            <img
              src={url + "" + beach.images[0].img_link}
              alt={beach.name}
              className="nearby-item__image"
            />
            <div className="nearby-item__info">
              <h3 className="nearby-item__name">{beach.name}</h3>
              <p className="nearby-item__location">{beach.location}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
