import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VanDetail() {
  const param = useParams();
  console.log(param.id);

  const [van, setVan] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = `/api/vans/${param.id}`;
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setVan(jsonData.vans);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [param.id]);

  return (
    <div className="van-detail-container">
      {van ? (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
