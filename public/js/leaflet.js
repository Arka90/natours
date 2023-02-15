// console.log('Hello from the client side');
// const locations = JSON.parse(document.getElementById('map').dataset.locations);
// console.log(locations);

// mapboxgl.accessToken =
//   'pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A';

// var map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/jonasschmedtmann/cjvi9q8jd04mi1cpgmg7ev3dy',
// });
// const locations = JSON.parse(document.getElementById('map').dataset.locations);

// var map = L.map('map', { zoomControl: false });

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// const points = [];
// locations.forEach((loc) => {
//   points.push([loc.coordinates[1], loc.coordinates[0]]);
//   L.marker([loc.coordinates[1], loc.coordinates[0]])
//     .addTo(map)
//     .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
//       autoClose: false,
//     })
//     .openPopup();
// });

// const bounds = L.latLngBounds(points).pad(0.5);
// map.fitBounds(bounds);

// map.scrollWheelZoom.disable();
