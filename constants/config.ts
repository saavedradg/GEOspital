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
    { id: 'cesfam', label: 'CESFAM' },
    { id: 'clinica_privada', label: 'C. Privadas' },
    { id: 'favoritos', label: 'Favoritos' },
  ] as const,
};
