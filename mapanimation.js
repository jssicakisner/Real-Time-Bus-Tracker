//https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip

mapboxgl.accessToken = 'pk.eyJ1IjoiamVzc2ljYS1raXNuZXIiLCJhIjoiY2t6M2hhZzE5MDZxYjJwcDRuZGhmbGE2OCJ9.1aiYz5GHGgzjT8n_oz14Zw';

let followMarker = [];

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/satellite-streets-v11',
  center: [-71.078786, 42.340253],
  zoom: 12,
});

async function run() {
  const locations = await getBusLocations();
  let latLong = [];
  latLong.push(locations[0].attributes.longitude); 
  latLong.push(locations[0].attributes.latitude);

  followMarker.push(locations[0].attributes.longitude);
  followMarker.push(locations[0].attributes.latitude);
  
  new mapboxgl.Marker({ color: "red" }).setLngLat(latLong).addTo(map);

  console.log(new Date());
  console.log(latLong);

  setTimeout(run, 3000);
}

async function getBusLocations() {
  const url = "https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip";
  const response = await fetch(url);
  const json     = await response.json();

  return json.data;
}

run();
console.log(mapboxgl.Map.center);
