import React, { useEffect, useState } from "react";
import { listBeachesRegion, url } from "../../api/function";

const Sidebar = ({ beach }) => {
  const nearbyBeaches = [
    {
      name: "Bãi biển Non Nước",
      location: "Cách 5km về phía Nam",
      image: "https://picsum.photos/id/1015/100/70",
    },
    {
      name: "Bãi Rạng - Sơn Trà",
      location: "Cách 8km về phía Bắc",
      image: "https://picsum.photos/id/1016/100/70",
    },
    {
      name: "Bãi biển Lăng Cô",
      location: "Cách 25km (Qua đèo Hải Vân)",
      image: "https://picsum.photos/id/1018/100/70",
    },
  ];
  const [listBeaches, setListBeaches] = useState([]);
  useEffect(() => {
    fechData();
  }, []);
  const fechData = async () => {
    try {
      const rs = await listBeachesRegion(beach.id, beach.region_id);
      console.log(rs?.data?.data);
      setListBeaches(rs?.data?.data || []);
    } catch (error) {}
  };
  const detailBeaches = (value) => {};

  return (
    <aside className="sidebar">
      <h2 className="section-title">Nearby Beaches</h2>
      <div className="nearby-list">
        {listBeaches.map((beach) => (
          <a
            href="#"
            onClick={() => detailBeaches(beach)}
            className="nearby-item"
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
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
