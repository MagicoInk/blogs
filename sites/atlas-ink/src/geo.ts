/** Coordenadas y códigos de las ciudades del directorio (para el mapa de rutas). */
export const ciudadesGeo: Record<string, { lat: number; lon: number; codigo: string }> = {
  'Ciudad de México': { lat: 19.43, lon: -99.13, codigo: 'MEX' },
  Guadalajara: { lat: 20.67, lon: -103.35, codigo: 'GDL' },
  Monterrey: { lat: 25.69, lon: -100.32, codigo: 'MTY' },
  Tijuana: { lat: 32.51, lon: -117.04, codigo: 'TIJ' },
  Oaxaca: { lat: 17.07, lon: -96.72, codigo: 'OAX' },
  'Los Ángeles': { lat: 34.05, lon: -118.24, codigo: 'LAX' },
  'Nueva York': { lat: 40.71, lon: -74.01, codigo: 'NYC' },
  Londres: { lat: 51.51, lon: -0.13, codigo: 'LON' },
  Berlín: { lat: 52.52, lon: 13.4, codigo: 'BER' },
  Barcelona: { lat: 41.39, lon: 2.17, codigo: 'BCN' },
  Seúl: { lat: 37.57, lon: 126.98, codigo: 'SEL' },
  Kiev: { lat: 50.45, lon: 30.52, codigo: 'IEV' },
  Varsovia: { lat: 52.23, lon: 21.01, codigo: 'WAW' },
  'São Paulo': { lat: -23.55, lon: -46.63, codigo: 'SAO' },
  'Buenos Aires': { lat: -34.6, lon: -58.38, codigo: 'BUE' },
  Tokio: { lat: 35.68, lon: 139.69, codigo: 'TYO' },
  Roma: { lat: 41.9, lon: 12.5, codigo: 'ROM' },
  Melbourne: { lat: -37.81, lon: 144.96, codigo: 'MEL' },
  Ámsterdam: { lat: 52.37, lon: 4.9, codigo: 'AMS' },
};
export const codigo = (ciudad: string) => ciudadesGeo[ciudad]?.codigo ?? '···';
