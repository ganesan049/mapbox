import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { listLogEntries } from "./API";
import LogEntryForm from "./LogEntryForm";
function Map() {
  const [logEntries, setlogEntries] = useState([]);
  const [currLoc, setcurrLoc] = useState({});
  const [showPopup, setshowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewPort, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 12.3375,
    longitude: 75.8069,
    zoom: 8,
  });
  const getEntries = async () => {
    const logEntries = await listLogEntries();
    console.log(logEntries);
    setlogEntries(logEntries);
  };
  useEffect(() => {
    getEntries();
    navigator.geolocation.getCurrentPosition((pos) =>
      setcurrLoc({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      })
    );
    // return () => {
    //   cleanup;
    // };
  }, []);
  const showAddMarkerPopUp = (e) => {
    const [longitude, latitude] = e.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
    console.log(addEntryLocation);
  };
  if (logEntries.length !== 0) {
    console.log(currLoc.latitude, currLoc.longitude);
    return (
      <>
        <ReactMapGL
          mapStyle="mapbox://styles/gans/ckajk5dlw17xe1imw3dgyr1ge"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          {...viewPort}
          onViewportChange={setViewport}
          onDblClick={showAddMarkerPopUp}
        >
          <Marker
            // key={entry._id}
            className="marker"
            latitude={currLoc.latitude}
            longitude={currLoc.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div>
              current location
              <svg
                className="marker"
                style={{
                  width: `24px`,
                  height: `24px`,
                }}
                viewBox="0 0 24 24"
                width="56"
                height="56"
                stroke="green"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          {logEntries.map((entry) => (
            <div key={entry._id}>
              <Marker
                className="marker"
                latitude={entry.latitude}
                longitude={entry.longitude}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <div
                  key={entry._id}
                  onClick={() =>
                    setshowPopup({
                      // ...showPopup,
                      [entry._id]: true,
                    })
                  }
                >
                  {entry.title}
                  <svg
                    className="marker"
                    style={{
                      width: `24px`,
                      height: `24px`,
                    }}
                    viewBox="0 0 24 24"
                    width="56"
                    height="56"
                    stroke="green"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
              </Marker>
              {showPopup[entry._id] ? (
                <Popup
                  key={entry._id}
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => {
                    // console.log("object");
                    setshowPopup({});
                  }}
                  anchor="bottom"
                >
                  <div className="popUp">
                    <h3>{entry.title}</h3>
                    <p>{entry.description}</p>
                    <small>
                      Visited At:
                      {new Date(entry.visitDate).toLocaleDateString()}
                    </small>
                    {entry.image && <img src={entry.image} alt="image" />}
                  </div>
                </Popup>
              ) : null}
            </div>
          ))}
          {/* if(addEntryLocation.length){console.log(addEntryLocation.latitude)} */}
          {addEntryLocation ? (
            <>
              <Marker
                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
              >
                <div>
                  <svg
                    className="marker red"
                    style={{
                      height: `${6 * viewPort.zoom}px`,
                      width: `${6 * viewPort.zoom}px`,
                    }}
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <g>
                        <path
                          d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                      c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                      c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"
                        />
                      </g>
                    </g>
                  </svg>
                </div>
              </Marker>
              <Popup
                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition={true}
                onClose={() => setAddEntryLocation(null)}
                anchor="top"
              >
                <div className="popUp">
                  <LogEntryForm
                    onClose={() => {
                      setAddEntryLocation(null);
                      getEntries();
                    }}
                    location={addEntryLocation}
                  />
                </div>
              </Popup>
            </>
          ) : null}
        </ReactMapGL>
        {/* <map /> */}
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default Map;
