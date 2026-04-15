import {APIProvider, Map, AdvancedMarker, Pin, useMap} from '@vis.gl/react-google-maps';

function BotaoVoltarLocal() {
  const map = useMap();

  function voltarParaLocal() {
    if (!map) return;

    map.panTo({lat: -26.22895782163565, lng: -51.083311344485494});
    map.setZoom(17);
  }

  return (
    <button className="botaoVoltarLocal" onClick={voltarParaLocal}>
      Voltar para a Mondialle
    </button>
  );
}

export default function Maps() {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <Map
        style={{width: '100%', height: '100%'}}
        defaultCenter={{lat: -26.22895782163565, lng: -51.083311344485494}}
        defaultZoom={17}
        gestureHandling='greedy'
        disableDefaultUI
        mapId="DEMO_MAP_ID"
      >
        <AdvancedMarker position={{lat: -26.22895782163565, lng: -51.083311344485494}}>
            <Pin
                background="#000000"
                borderColor="#ffffff"
                glyphColor="#ffffff"
                glyph="M"
                scale={1.4}
            />
        </AdvancedMarker>

        <BotaoVoltarLocal />
      </Map>
    </APIProvider>
  );
}
