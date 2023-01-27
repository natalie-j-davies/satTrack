        //making map and tiles
        const map = L.map('map').setView([0, 0], 1);
        const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

        const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const tiles = L.tileLayer(tileUrl,{attribution});
        tiles.addTo(map);
        //making marker with custom icon
        var issIcon = L.icon({
        iconUrl: 'iss200.png',
        iconSize: [50, 32],
        iconAnchor: [25, 16],
        });

        const marker = L.marker([0, 0],{icon: issIcon}).addTo(map);

        const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

        let firstTime = true;
        async function getISS(){
            const response = await fetch(api_url);
            const data = await response.json();
            const{latitude, longitude} = data;
            marker.setLatLng([latitude, longitude]);
            if(firstTime){
            map.setView([latitude, longitude],3);
            firstTime = false;
            }
            document.getElementById("lat").textContent = latitude.toFixed(3);
            document.getElementById("lon").textContent = longitude.toFixed(3);
            console.log(latitude);
            console.log(longitude);
        }
        getISS();

        setInterval(getISS,1000);
