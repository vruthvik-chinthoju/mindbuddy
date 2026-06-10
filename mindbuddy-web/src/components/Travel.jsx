import { useState } from "react";
import "./css/Travel.css";
import travelData from "./travelData";

export default function Travel() {
  const [selectedState, setSelectedState] = useState("All");

  const states = [
    "All",
    ...new Set(travelData.map((place) => place.state)),
  ];

  const filteredPlaces =
    selectedState === "All"
      ? travelData
      : travelData.filter(
          (place) => place.state === selectedState
        );

  const openMaps = (place) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place
      )}`,
      "_blank"
    );
  };

  return (
    <div className="travel-page">
      <div className="travel-hero">
        <h1>Healing Destinations</h1>
        <p>
          Discover peaceful places across India that help
          you relax, heal, and reconnect with yourself.
        </p>
      </div>

      <div className="state-filter">
        {states.map((state) => (
          <button
            key={state}
            className={
              selectedState === state
                ? "state-btn active"
                : "state-btn"
            }
            onClick={() => setSelectedState(state)}
          >
            {state}
          </button>
        ))}
      </div>

      <div className="travel-grid">
        {filteredPlaces.map((place) => (
          <div className="travel-card" key={place.name}>
            <img
              src={place.image}
              alt={place.name}
            />

            <div className="card-content">
              <h3>{place.name}</h3>

              <span>{place.state}</span>

              <p>{place.benefit}</p>

              <button
                className="go-btn"
                onClick={() => openMaps(place.name)}
              >
                Travel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}