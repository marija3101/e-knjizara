import { useEffect, useState } from "react";
import ReactMapGL, { Marker, FlyToInterpolator }
      from "react-map-gl";
import Fly from "./Fly";
import { ImLocation } from "react-icons/im";

  
function Map() {
  
  const [lat, setLat] = useState(22.5726);
  const [lon, setLon] = useState(88.3639);
  

  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lon,
    zoom: 12,
    bearing: 0,
    pitch: 0,
    width: "100%",
    height: "100vh",
  });
  

  useEffect(() => {
    setViewport({
      latitude: lat,
      longitude: lon,
      zoom: 12,
      transitionInterpolator: 
        new FlyToInterpolator({ speed: 1.0 }),
      transitionDuration: "auto",
      width: "100%",
      height: "100vh",
    });
  }, [lat, lon]);
  
  return (
    <ReactMapGL
      mapboxApiAccessToken={"pk.eyJ1IjoibWFyaWphMzEwMSIsImEiOiJja3loY2l0d2swdDZlMnZwMGp4YmVyZWI2In0.YBxzeGOHSi0g8lpvHRecSQ"}
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      <Marker latitude={lat} longitude={lon}>
        <ImLocation size="30px" />
      </Marker>
      <Fly setLat={setLat} setLon={setLon} />
    </ReactMapGL>
  );
}
  
export default  Map;