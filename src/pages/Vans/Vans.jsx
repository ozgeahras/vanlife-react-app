import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Vans() {
  const [allVans, setAllVans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/vans");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setAllVans(jsonData.vans);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const vanElements = allVans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link to={`/vans/${van.id}`}>
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  return (
    <div className="van-list-container">
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
