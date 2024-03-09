"use strict";
(() => {
  // <stdin>
  var mapContainers = document.querySelectorAll(".mapbox");
  console.log(mapContainer);
  for (const mapContainer2 in mapContainers) {
    const id = mapContainer2.id;
    const zoom = mapContainer2.dataset.zoom;
    const geoData = fetch(mapContainer2.dataset.source).then();
    mapboxgl.accessToken = "pk.eyJ1IjoidGFrYXN1bWlyIiwiYSI6ImNrcHM3Y2RveTB1ZjEyb2xlY3JqMnY3M2YifQ.56Fuk-wulc0J4CVux7ICKQ";
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center,
      zoom
    });
    map.on("load", () => {
      geoData.features.forEach((element, index) => {
        if (element.geometry.type === "LineString") {
          map.addSource("feature" + index, {
            type: "geojson",
            data: element.geometry
          });
          map.addLayer({
            id: "feature" + index,
            type: "line",
            source: "feature" + index,
            layout: {
              "line-join": "round",
              "line-cap": "round"
            },
            paint: element.properties.paint
          });
        } else if (element.geometry.type === "Point") {
          const markerDom = document.getElementById(
            element.properties.marker
          );
          const marker = new mapboxgl.Marker({
            element: markerDom,
            anchor: "bottom",
            offset: [0, 6],
            color: element.properties.color
          }).setLngLat(element.geometry.coordinates).setPopup(
            new mapboxgl.Popup({
              offset: { top: [0, 0], bottom: [0, -40] }
            }).setHTML(element.properties.html)
          ).addTo(map);
        }
      });
    });
  }
})();
