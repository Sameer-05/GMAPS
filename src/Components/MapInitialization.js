// MapInitialization.js
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import esriConfig from "@arcgis/core/config.js";

export function initializeMap() {
  esriConfig.apiKey = 'AAPKe4079535aea641feb5834fbeca1fc5c4pDtiYri8paQzdk0JAe0PvE3Nm468VuBV0qY8Fazc-As8n86sqD8anMf-lBzOfSZA';
  
  const map = new Map({
    basemap: 'arcgis-navigation'
  });
  
  const view = new MapView({
    container: 'viewDiv',
    map: map,
    center: [77.5851, 12.9658],
    zoom: 12
  });
  
  return view;
}
