'use client';
import './styles.scss';
import { auth } from '@/auth';
import clientPromise from '@/lib/mongodb/client';
import { Neighbourhood, NeighbourhoodStatusEnum } from '@/lib/model/neighbourhood';
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
    const newN = {
      id: uuid(),
      userId: session?.user?.email!,
      name: '',
      imageUrl: '',
      status: NeighbourhoodStatusEnum.EDITABLE,
      coords: [],
    };
    setNewNeighbourhood(newN);
  };

  console.log('User = %o', session?.user);

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
      ></Map>
      <MapPanel
        isLoading={churchesLoading || neighbourhoodsLoading}
        user={session?.user}
        myNeighbourhood={newNeighbourhood}
        selectedNeighbourhood={selectedNeighbourhood}
        selectedChurch={selectedChurch}
        createNeighbourhood={handleCreateNeighbourhood}
        setNeighbourhood={setNewNeighbourhood}
      ></MapPanel>
    </div>
  );
}
