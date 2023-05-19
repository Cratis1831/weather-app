import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/north-america.json";

type Point = [number, number];

interface Props {
  name: string;
  markerOffset: number;
  coordinates: Point;
}
const MapChart = ({ name, markerOffset, coordinates }: Props) => {
  return (
    <ComposableMap
      className="bg-transparent"
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [58, 20, 0],
        scale: 300,
        center: [-50, 60],
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#EAEAEC"
              stroke="#D6D6DA"
            />
          ))
        }
      </Geographies>

      <Marker coordinates={coordinates}>
        <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
        <text
          textAnchor="middle"
          y={markerOffset}
          style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
        >
          {name}
        </text>
      </Marker>
    </ComposableMap>
  );
};

export default MapChart;
