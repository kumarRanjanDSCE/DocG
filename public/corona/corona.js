 //corona cases
 mapboxgl.accessToken = 'pk.eyJ1IjoiYWJoaTEzNTQiLCJhIjoiY2t4ZWVrOWJ0MDh4ejJwbnBqNHdsYmFseCJ9.7wIeEX0V3d6MFeyCr5DFKw';
 const map = new mapboxgl.Map({
   container: 'map', // container ID
   style: 'mapbox://styles/mapbox/streets-v11',
   center: [79.64, 22.89], // starting position [lng, lat]
   zoom: 4,
 });
   function updateMap() {
     
     fetch('latest.json')
       .then(response => response.json())
       .then(rsp => {
         console.log(rsp.data);
         rsp.data.forEach(element => {
           coordinates = element.coordinates;
           longitude = coordinates[0];
           latitude = coordinates[1];
           cases = element.cases;
           if (cases > 2000)
             color = "rgb(255,0,0)"
           else
             color = `rgb(${cases / 8},0,0)`;
           // Set marker options.
           var marker = new mapboxgl.Marker({
             color: color,
             draggable: false
           })
             .setLngLat([longitude, latitude])
             .addTo(map);
 
         });
       })
   }
  //  function updateMap() {
     
  //    fetch('https://corona.lmao.ninja/v2/countries')
  //      .then(response => response.json())
  //      .then(rsp => {
  //        console.log(rsp);
  //        rsp.forEach(element => {
  //          coordinates = element.countryInfo;
  //          longitude = coordinates.long;
  //          latitude = coordinates.lat;
  //          cases = element.cases;
  //          if (cases > 2000)
  //            color = "rgb(255,0,0)"
  //          else
  //            color = `rgb(${cases / 8},0,0)`;
  //          // Set marker options.
  //          var marker = new mapboxgl.Marker({
  //            color: color,
  //            draggable: false
  //          })
  //            .setLngLat([longitude, latitude])
  //            .addTo(map);
 
  //        });
  //      })
  //  }
   updateMap();
 
 
   // Initialize the GeolocateControl.
   const geolocate = new mapboxgl.GeolocateControl({
     positionOptions: {
       enableHighAccuracy: true
     },
     trackUserLocation: true
   });
   map.addControl(geolocate);
   geolocate.on('geolocate', () => {
     document.getElementById('wow').style.backgroundColor = "rgb(130, 255, 125)";
     console.log('A geolocate event has occurred.');
   });
 
 
   map.on('click', (e) => {
     console.log(e.lngLat.lat);
     console.log(e.lngLat.lng);
     let city = document.getElementById('city');
     let tests = document.getElementById('tests');
     let cases = document.getElementById('cases');
     let death = document.getElementById('death');
     let recover = document.getElementById('recover');
     fetch('latest.json')
       .then(response => response.json())
       .then(rsp => {
 
         rsp.data.forEach(element => {
           coordinates = element.coordinates;
           longitude = coordinates[0];
           latitude = coordinates[1];
           const approxeq = (v1, v2, epsilon = 0.5) => Math.abs(v1 - v2) <= epsilon;
           if ((approxeq(e.lngLat.lng, longitude)) && (approxeq(e.lngLat.lat, latitude))) {
             city.innerHTML = element.name;
             if (element.tested > 0)
               tests.innerHTML = "Tested :" + element.tests;
             else
               tests.innerHTML = "Tested : -----";
             cases.innerHTML = "Cases : " + element.cases;
             death.innerHTML = "Death : " + element.deaths;
             recover.innerHTML = "Recoverd : " + element.recovered;
           }
         })
 
       });
   })
  //  map.on('click', (e) => {
  //    console.log(e.lngLat.lat);
  //    console.log(e.lngLat.lng);
  //    let city = document.getElementById('city');
  //    let tests = document.getElementById('tests');
  //    let cases = document.getElementById('cases');
  //    let death = document.getElementById('death');
  //    let recover = document.getElementById('recover');
  //    fetch('https://corona.lmao.ninja/v2/countries')
  //      .then(response => response.json())
  //      .then(rsp => {
 
  //        rsp.forEach(element => {
  //          coordinates = element.countryInfo;
  //          longitude = coordinates.long;
  //          latitude = coordinates.lat;
  //          const approxeq = (v1, v2, epsilon = 0.5) => Math.abs(v1 - v2) <= epsilon;
  //          if ((approxeq(e.lngLat.lng, longitude)) && (approxeq(e.lngLat.lat, latitude))) {
  //            city.innerHTML = element.country;
  //            if (element.tested > 0)
  //              tests.innerHTML = "Tested :" + element.tests;
  //            else
  //              tests.innerHTML = "Tested : -----";
  //            cases.innerHTML = "Cases : " + element.cases;
  //            death.innerHTML = "Death : " + element.deaths;
  //            recover.innerHTML = "Recoverd : " + element.recovered;
  //          }
  //        })
 
  //      });
  //  })
 
 