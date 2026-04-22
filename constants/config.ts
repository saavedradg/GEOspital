export const config = {
  appName: 'GEOspital',
  description: 'Mapa de centros de salud del área metropolitana de Santiago de Chile',
  santiago: {
    latitude: -33.46,
    longitude: -70.645,
    latitudeDelta: 0.28,
    longitudeDelta: 0.28,
  },
  filterOptions: [
    { id: 'todos', label: 'Todos' },
    { id: 'hospital_publico', label: 'H. Públicos' },
    { id: 'hospital_universitario', label: 'H. Universitarios' },
    { id: 'clinica_privada', label: 'C. Privadas' },
    { id: 'cesfam', label: 'CESFAM' },
    { id: 'cecof', label: 'CECOF' },
    { id: 'sapu', label: 'SAPU' },
    { id: 'sar', label: 'SAR' },
    { id: 'cosam', label: 'COSAM' },
    { id: 'mutual', label: 'Mutuales' },
    { id: 'aseguradora', label: 'Seguros' },
    { id: 'favoritos', label: 'Favoritos' },
  ] as const,
};
