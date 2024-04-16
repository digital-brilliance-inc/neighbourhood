'use client';

import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useState } from 'react';
import './map.scss';
import { LatLng, Neighbourhood, NeighbourhoodStatusEnum } from '@/lib/model/neighbourhood';
import { Church } from '@/lib/model/church';

export const Map = ({
  neighbourhoods,
  selectedNeighbourhood,
  selectNeighbourhood,
  churches,
  selectedChurch,
  selectChurch,
  newNeighbourhood,
  setNewNeighbourhood,
}: {
  neighbourhoods: Array<Neighbourhood>;
  selectedNeighbourhood?: Neighbourhood;
  selectNeighbourhood: (n?: Neighbourhood) => void;
  churches: Array<Church>;
  selectedChurch?: Church;
  selectChurch: (n?: Church) => void;
  newNeighbourhood?: Neighbourhood;
  setNewNeighbourhood: (n: Neighbourhood) => void;
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [neighbourhoodPolygons, setNeighbourhoodPolygons] = useState<any>({});
  const [editablePolygon, setEditablePolygon] = useState<google.maps.Polygon>();

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!, version: 'weekly' });

      const { Map } = await loader.importLibrary('maps');

      const position = {
        lat: 43.5183,
        lng: -79.8774,
      };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 14,
        // mapId: 'LITN_MAP_ID',
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }],
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }],
          },
        ],
        gestureHandling: 'greedy',
        fullscreenControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.LEFT_BOTTOM,
        },
        streetViewControl: false,
        clickableIcons: false,
      };

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

      map.addListener('click', (event: google.maps.MapMouseEvent) => {
        selectNeighbourhood();
      });
      // map.addListener('center_changed', (event: any) => {
      //   onPositionChange(map.getCenter()?.toJSON());
      // });
      // onPositionChange(position);

      // let poly = new google.maps.Polyline({
      //   strokeColor: '#000000',
      //   strokeOpacity: 1.0,
      //   strokeWeight: 3,
      // });
      // poly.setMap(map);

      // let polygon = new google.maps.Polygon({
      //   strokeColor: '#000000',
      //   strokeOpacity: 0,
      //   strokeWeight: 0,
      // });
      // polygon.setMap(map);

      // function addLatLng(event: google.maps.MapMouseEvent) {
      //   console.log('Adding lat lng: %o, %o', event.latLng?.lat(), event.latLng?.lng());
      //   const path = poly.getPath();
      //   const polygonPath = polygon.getPath();

      //   const vertex = new google.maps.Circle({
      //     strokeColor: '#FF0000',
      //     strokeOpacity: 0.8,
      //     strokeWeight: 2,
      //     fillColor: '#FF0000',
      //     fillOpacity: 0.35,
      //     map,
      //     center: event.latLng,
      //     radius: 50,
      //   });

      //   vertex.setMap(map);

      //   // Because path is an MVCArray, we can simply append a new coordinate
      //   // and it will automatically appear.
      //   path.push(event.latLng as google.maps.LatLng);
      //   polygonPath.push(event.latLng as google.maps.LatLng);

      //   if (path.getLength() === 1) {
      //     vertex.addListener('click', (event: google.maps.MapMouseEvent) => {
      //       console.log('Closing path');
      //       polygon.setOptions({
      //         strokeColor: '#000000',
      //         strokeOpacity: 1,
      //         strokeWeight: 3,
      //       });
      //     });
      //   }
      // }
      setMap(map);

      // map.addListener('click', addLatLng);
      // poly.addListener('click', (event: google.maps.MapMouseEvent) => {
      //   console.log('poly clicked! %o', event);
      // });
    };
    initMap();
  }, []);

  useEffect(() => {
    if (map && churches) {
      for (let c of churches) {
        let marker = new google.maps.Marker({
          position: { lat: c.lat, lng: c.lng },
          map,
          title: c.name,
          icon: {
            url: '/church-map-marker.png',
            scaledSize: new google.maps.Size(36, 36),
            anchor: new google.maps.Point(18, 18),
          },
        });
        marker.addListener('click', (event: google.maps.MapMouseEvent) => {
          selectChurch(c);
        });
        marker.setMap(map);
      }
    }
  }, [churches, map]);

  useEffect(() => {
    if (map && neighbourhoods) {
      for (let n of neighbourhoods) {
        let polygon = new google.maps.Polygon({
          strokeColor: '#327abd',
          fillColor: '#327abd',
          strokeOpacity: 1,
          strokeWeight: 2,
          fillOpacity: 0.3,
          paths: [n.coords],
        });
        polygon.addListener('click', (event: google.maps.MapMouseEvent) => {
          selectNeighbourhood(n);
        });
        polygon.addListener('mouseover', (event: google.maps.MapMouseEvent) => {
          polygon.set('strokeColor', '#e11f5c');
          polygon.set('fillColor', '#e11f5c');
          map.getDiv().setAttribute('title', n.name);
        });
        polygon.addListener('mouseout', (event: google.maps.MapMouseEvent) => {
          if (!polygon.get('isSelected')) {
            polygon.set('strokeColor', '#327abd');
            polygon.set('fillColor', '#327abd');
            map.getDiv().removeAttribute('title');
          }
        });
        polygon.setMap(map);
        setNeighbourhoodPolygons((current: any) => ({ ...current, [n.id]: polygon }));

        // Now add the marker
        let bounds = new google.maps.LatLngBounds();
        for (let c of n.coords) {
          bounds.extend(c);
        }
        let marker = new google.maps.Marker({
          position: bounds.getCenter(),
          map,
          title: n.name,
          icon: {
            url: '/advocate-map-marker.png',
            scaledSize: new google.maps.Size(36, 36),
            anchor: new google.maps.Point(18, 18),
          },
        });
        marker.addListener('click', (event: google.maps.MapMouseEvent) => {
          selectNeighbourhood(n);
        });
        marker.setMap(map);
      }
    }
  }, [neighbourhoods, map]);

  useEffect(() => {
    for (let key of Object.keys(neighbourhoodPolygons)) {
      const p = neighbourhoodPolygons[key] as google.maps.Polygon;
      p.set('strokeColor', '#327abd');
      p.set('fillColor', '#327abd');
      p.set('isSelected', false);

      if (key === selectedNeighbourhood?.id) {
        p.set('strokeColor', '#e11f5c');
        p.set('fillColor', '#e11f5c');
        p.set('isSelected', true);
      }
    }
  }, [neighbourhoodPolygons, selectedNeighbourhood]);

  useEffect(() => {
    if (map) {
      if (
        newNeighbourhood?.status === NeighbourhoodStatusEnum.NEW ||
        newNeighbourhood?.status === NeighbourhoodStatusEnum.IN_REVIEW
      ) {
        editablePolygon?.setDraggable(false);
        editablePolygon?.setEditable(false);
        setEditablePolygon(editablePolygon);
        return;
      }

      if (newNeighbourhood && newNeighbourhood?.coords?.length > 0) {
        if (newNeighbourhood?.status === NeighbourhoodStatusEnum.EDITABLE) editablePolygon?.setDraggable(true);
        editablePolygon?.setEditable(true);
        setEditablePolygon(editablePolygon);
        return;
      } else if (newNeighbourhood?.coords?.length === 0) {
        const mapCenter = map.getCenter() as google.maps.LatLng;
        const coords = [
          { lat: mapCenter.lat() + 0.0003, lng: mapCenter.lng() + 0.005 },
          { lat: mapCenter.lat() + 0.0035, lng: mapCenter.lng() },
          { lat: mapCenter.lat() - 0.0003, lng: mapCenter.lng() - 0.005 },
          { lat: mapCenter.lat() - 0.003, lng: mapCenter.lng() },
        ];

        let polygon = new google.maps.Polygon({
          strokeColor: '#FF0000',
          fillColor: '#FF0000',
          strokeOpacity: 1,
          strokeWeight: 2,
          fillOpacity: 0.3,
          paths: coords,
          editable: true,
          draggable: true,
        });

        const updateCoords = () => {
          const newCoords: Array<LatLng> = [];
          polygon.getPath().forEach((p) => {
            newCoords.push(p.toJSON());
          });

          setNewNeighbourhood({ ...newNeighbourhood, coords: newCoords });
        };
        polygon.addListener('dragend', updateCoords);
        polygon.getPath().addListener('set_at', updateCoords);
        polygon.setMap(map);
        setEditablePolygon(polygon);
        //setNeighbourhoodPolygons((current: any) => ({ ...current, [newNeighbourhood.id]: polygon }));
      }
    }
  }, [newNeighbourhood, map]);

  return <div className="map-container" ref={mapRef}></div>;
};
