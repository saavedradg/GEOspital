#GEOspital

Localizador de centros asistenciales de Salud de Chile

Fase 1 Región Metropolitana de Santiago (Capital)

## V1.0 - Procesos realizados.

Generated image
Minimal line art illustration of a medical cross inside a circle with a magnifying glass overlapping, teal color #0D9488 on clean white background, healthcare search concept, professional flat design, subtle soft shadow, no text, centered composition, square format, ultra clean minimalist style
All(12)
Edited
constants/theme.ts
Edited
constants/config.ts
Edited
services/mockData.ts
Edited
contexts/AppContext.tsx
Edited
app/_layout.tsx
Edited
app/(tabs)/_layout.tsx
Edited
components/FilterChips.tsx
Edited
components/FacilityCard.tsx
Edited
app/(tabs)/index.tsx
Edited
app/(tabs)/list.tsx
Edited
app/[id].tsx
Qué se construyó:

Mapa interactivo con 30 marcadores (10 hospitales públicos, 10 CESFAM, 10 clínicas privadas) con colores diferenciados por tipo
Listado con búsqueda por nombre/dirección/comuna y filtros por tipo de establecimiento y favoritos
Pantalla de detalle con información completa, servicios, botones de llamar y cómo llegar (abre Google Maps)
Sistema de favoritos persistente con AsyncStorage y feedback háptico en todas las interacciones
Próximos pasos:

Agregar más establecimientos (SAR, SAPU, consultorios) para cobertura total del área metropolitana
Implementar filtro por comuna y por disponibilidad de urgencia 24h
Integrar geolocalización del usuario para mostrar distancias y centros más cercanos
Thought for 1m 2s
react-native-maps is native-only and breaks the web bundler. I'll split the map into platform-specific files using .native.tsx / .tsx extensions.

Edited
components/HealthMap.native.tsx
All(3)
Edited
components/HealthMap.tsx
Edited
app/(tabs)/index.tsx
Separé el mapa en componentes por plataforma — HealthMap.native.tsx usa react-native-maps para Android/iOS y HealthMap.tsx usa Leaflet/OpenStreetMap para la vista web. La compilación queda resuelta.


## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Start the Project

- Start the development server (choose your platform):

```bash
npm run start         # Start Expo development server
npm run android       # Launch Android emulator
npm run ios           # Launch iOS simulator
npm run web           # Start the web version
```

- Reset the project (clear cache, etc.):

```bash
npm run reset-project
```

### 3. Lint the Code

```bash
npm run lint
```

## Main Dependencies

- React Native: 0.79.4
- React: 19.0.0
- Expo: ~53.0.12
- Expo Router: ~5.1.0
- Supabase: ^2.50.0
- Other commonly used libraries:  
  - @expo/vector-icons  
  - react-native-paper  
  - react-native-calendars  
  - lottie-react-native  
  - react-native-webview  
  - and more

For a full list of dependencies, see [package.json](./package.json).

## Development Tools

- TypeScript: ~5.8.3
- ESLint: ^9.25.0
- @babel/core: ^7.25.2

## Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b main`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is private ("private": true). For collaboration inquiries, please contact the author.

---

Feel free to add project screenshots, API documentation, feature descriptions, or any other information as needed.
