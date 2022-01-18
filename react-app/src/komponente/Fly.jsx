import React, { useState } from "react";
import Axios from "axios";

const API_KEY = "pk.eyJ1IjoibWFyaWphMzEwMSIsImEiOiJja3loY2l0d2swdDZlMnZwMGp4YmVyZWI2In0.YBxzeGOHSi0g8lpvHRecSQ";

const Fly = ({ setLat, setLon }) => {


const [city, setCity] = useState("Belgrade");

function getCoordinates() {
	Axios.get(
`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${API_KEY}`
	).then((res) => {


	setLon(res.data.features[0].geometry.coordinates[0]);
		

	setLat(res.data.features[0].geometry.coordinates[1]);
	});
}

return (
	<div className="fly">
	<h6>Enter a city name so we can find you</h6>
	<div className="inp-box">
		<input
		type="text"
		onChange={(e) => {
			setCity(e.target.value);
		}}
		/>
<button onClick={() => getCoordinates()}>Go</button>
	</div>
	</div>
);
};

export default Fly;
