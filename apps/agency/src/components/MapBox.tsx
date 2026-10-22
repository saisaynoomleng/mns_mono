'use client';

import Map, { FullscreenControl, Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { env } from '@/lib/env/client';

type MapBoxProps = {
  lat: number;
  long: number;
  width?: number;
  height?: number;
};

export const MapBox = ({
  lat,
  long,
  width = 800,
  height = 400,
}: MapBoxProps) => {
  return (
    <div className="overflow-hidden">
      <Map
        mapboxAccessToken={env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{
          longitude: long,
          latitude: lat,
          zoom: 15,
        }}
        scrollZoom={false}
        style={{ width, height }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={long} latitude={lat} color="red" />
        <FullscreenControl />
      </Map>
    </div>
  );
};
