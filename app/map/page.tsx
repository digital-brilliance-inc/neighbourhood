'use client';
import { Map } from '@/components/map/map';
import './styles.scss';
import { MapPanel } from '@/components/map-panel/map-panel';
import { auth } from '@/auth';
import clientPromise from '@/lib/mongodb/client';
import { Neighbourhood } from '@/lib/model/neighbourhood';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Page() {
  // const session = await auth();
  const { data: session } = useSession();
  const [neighbourhoods, setNeighbourhoods] = useState([]);
  const [selectedNeighbourhood, setSelectedNeighbourhood] = useState<Neighbourhood>();

  useEffect(() => {
    fetch('/api/map/neighbourhoods').then(async (response) => {
      const neighbourhoods = await response.json();
      console.log('Retrieved neighbourhoods response: %o', response);
      setNeighbourhoods(neighbourhoods);
    });
  }, []);

  // const mongodb = await clientPromise;
  // const neighbourhoods = await mongodb.db('test').collection('neighbourhoods').find<Neighbourhood>({}).toArray();

  // console.log('neighbourhoods = %o', neighbourhoods);

  const selectNeighbourhood = (n?: Neighbourhood) => {
    console.log('neighbourhood selected = %o', n);
    setSelectedNeighbourhood(n);
  };

  return (
    <div className="map-page-container">
      <Map
        neighbourhoods={neighbourhoods}
        selectedNeighbourhood={selectedNeighbourhood}
        selectNeighbourhood={selectNeighbourhood}
      ></Map>
      <MapPanel user={session?.user} selectedNeighbourhood={selectedNeighbourhood}></MapPanel>
    </div>
  );
}
