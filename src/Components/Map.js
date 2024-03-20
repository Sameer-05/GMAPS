import React, { useEffect, useRef } from 'react';
import SearchWidget from './SearchWidget';

import { initializeMap } from './MapInitialization';
const ArcGISMap = () => {
  const locateButtonRef = useRef(null);

  useEffect(() => {
    const view = initializeMap();
//Geocoding
SearchWidget(view);
//Geoloaction


    

  }, []);

  return (
    <div id="viewDiv" style={{ height: '100vh', width: '100%' }}>
      <div ref={locateButtonRef} className="esri-locate"></div>
    </div>
  );
};

export default ArcGISMap;
