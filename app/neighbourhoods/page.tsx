'use client';
import './styles.scss';
import { auth } from '@/auth';
import clientPromise from '@/lib/mongodb/client';
import { Neighbourhood } from '@/lib/model/neighbourhood';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Map } from './_components/map/map';
import { MapPanel } from './_components/map-panel/map-panel';
import { Church } from '@/lib/model/church';
import { v4 as uuid } from 'uuid';

export default function Page() {
  // const session = await auth();
  const { data: session } = useSession();
  const [neighbourhoods, setNeighbourhoods] = useState<Array<Neighbourhood>>([]);
  const [churches, setChurches] = useState<Array<Church>>([]);
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState<Neighbourhood>();
  const [selectedChurch, setSelectedChurch] = useState<Church>();
  const [churchesLoading, setChurchesLoading] = useState(true);
  const [neighbourhoodsLoading, setNeighbourhoodsLoading] = useState(true);
  const [newNeighbourhood, setNewNeighbourhood] = useState<Neighbourhood | undefined>();
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>();

  useEffect(() => {
    fetch('/api/map/neighbourhoods').then(async (response) => {
      const neighbourhoods = await response.json();
      console.log('Retrieved neighbourhoods response: %o', response);
      setNeighbourhoods(neighbourhoods);
      setNeighbourhoodsLoading(false);
    });
  }, []);

  const selectNeighbourhood = (n?: Neighbourhood) => {
    console.log('neighbourhood selected = %o', n);
    setSelectedNeighbourhood(n);
    setSelectedChurch(undefined);
  };

  useEffect(() => {
    fetch('/api/churches').then(async (response) => {
      const churches = await response.json();
      setChurches(churches);
      setChurchesLoading(false);
    });
  }, []);

  const selectChurch = (c?: Church) => {
    setSelectedChurch(c);
    setSelectedNeighbourhood(undefined);
  };

  const handleCreateNeighbourhood = () => {
    if (!mapCenter) {
      return;
    }
    const newN = {
      coords: [
        // { lat: 43.55514388072844, lng: -79.84321922724511 },
        // { lat: 43.55381707612784, lng: -79.84134704535272 },
        // { lat: 43.5549221001711, lng: -79.84019369547632 },
        // { lat: 43.556178845889245, lng: -79.84208733504083 },
        { lat: mapCenter.lat + 0.0003, lng: mapCenter.lng + 0.005 },
        { lat: mapCenter.lat + 0.0035, lng: mapCenter.lng },
        { lat: mapCenter.lat - 0.0003, lng: mapCenter.lng - 0.005 },
        { lat: mapCenter.lat - 0.003, lng: mapCenter.lng },
      ],
      userId: session?.user?.email!,
      name: '',
      id: uuid(),
      imageUrl: '/milton-1.png',
    };
    setNewNeighbourhood(newN);
  };

  const handlePositionChange = (newCenter: any) => {
    setMapCenter(newCenter);
  };

  return (
    <div className="map-page-container">
      <Map
        neighbourhoods={neighbourhoods}
        selectedNeighbourhood={selectedNeighbourhood}
        selectNeighbourhood={selectNeighbourhood}
        churches={churches}
        selectedChurch={selectedChurch}
        selectChurch={selectChurch}
        newNeighbourhood={newNeighbourhood}
        setNewNeighbourhood={setNewNeighbourhood}
        onPositionChange={handlePositionChange}
      ></Map>
      <MapPanel
        isLoading={churchesLoading || neighbourhoodsLoading}
        user={session?.user}
        selectedNeighbourhood={selectedNeighbourhood}
        selectedChurch={selectedChurch}
        createNeighbourhood={handleCreateNeighbourhood}
      ></MapPanel>
    </div>
  );
}
