import React, { useEffect, useState } from "react";
import { favorites } from "../../../api/function";

function Favorites() {
  const [beaches, setBeaches] = useState([]);

  useEffect(() => {
    fectData();
  }, []);
  const fectData = async () => {
    try {
      const rs = await favorites();
      console.log(rs);
    } catch (error) {}
  };
  return <div>Favorites</div>;
}

export default Favorites;
