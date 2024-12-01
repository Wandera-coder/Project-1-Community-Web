// embedding live map element
const map = L.map('map');
map.setView([51.505, -0.09], 13);

// document where the map is 
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// To get user previous location

navigator.geolocation.watchPosition(success, error);

let marker, circle, zoomed;

// calling the function 
function success(pos){

const lat = pos.coord.latitude;
const lng = pos.coords.longitudes;
const accuracy = pos.coords.accuracy;

if(marker){
map.removeLayer(marker);
map.removeLayer(circle);
}

marker = L.marker([lat, lng]).addTo(map);
circle = L.circle([lat, lng], {radius:accuracy}).addTo(map);

if(!zoomed){
    zoomed = map.fitBound(circle.getBound());
}
}

function error(err){
    if (err.code ===1){
        alert("please allow geolocation access");
    }else{
        alert("cannot get your current location");
    }
}


// Getting user's location using Geolocation API
if (navigator.geolocation){
navigator.geolocation.watchPosition(
    (position)=>{
        const{latitude, longitude}=
        position.coords;
        const userLatLng = [latitude,longitude];

        //update the map and marker
        map.setView(userLatLng,13);
        marker.userLatLng(userLatLng);
    },
    (error)=>{
        console.error('Error getting location;', 
            error);
    }
);
}else{
    alert('Geolocation is not supported in your browser,');
}
 