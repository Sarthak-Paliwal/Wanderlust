      mapboxgl.accessToken =mapToken;
      console.log(mapToken);
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: listing.geometry.coordinates, // starting position [lng, lat]
        zoom: 8 // starting zoom
    });
    const marker = new mapboxgl.Marker({color:"red"})
    .setLngLat(listing.geometry.coordinates) //Listing lat and long(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset: 25})
    .setHTML(`<h4>${listing.title}</h4><h6>Exact location will be provided after booking!</h6>`)
    .setMaxWidth("300px"))
    .addTo(map);
    