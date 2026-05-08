# 🏥 GEOspital

> Localizador de Centros de Salud — Región Metropolitana de Santiago, Chile

[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.79-61DAFB?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53-000020?logo=expo)](https://expo.dev)

**GEOspital** es una aplicación multiplataforma que permite localizar **195 centros de salud** en las **52 comunas** de la Región Metropolitana de Santiago. Funciona en iOS, Android y Web desde una misma base de código.

---

## ✨ Características

- **🗺️ Mapa interactivo** con marcadores por tipo de establecimiento (10 categorías)
- **🔍 Búsqueda y filtrado** por nombre, dirección, comuna o tipo
- **📋 Listado completo** con tarjetas informativas y ratings de Google
- **📱 Vista de detalle** con servicios, horarios, teléfono y navegación GPS
- **⭐ Favoritos** persistentes con AsyncStorage
- **🌓 Tema claro/oscuro/automático** con detección del sistema
- **📐 Diseño responsivo** adaptado a móvil, tablet y desktop
- **🗺️ Mapas multiplataforma**: react-native-maps (nativo) + Leaflet/OSM (web)

---

## 🏗️ Tecnologías

| Categoría | Tecnología |
|-----------|------------|
| Framework | Expo ~53 + React Native |
| Lenguaje | TypeScript |
| Navegación | Expo Router (file-based) |
| Mapas (móvil) | react-native-maps |
| Mapas (web) | Leaflet + OpenStreetMap |
| Estado | React Context + AsyncStorage |
| UI | @expo/vector-icons, react-native-reanimated |
| Haptics | expo-haptics |

---

## 📋 Requisitos

- **Node.js** >= 18.x
- **npm** o **yarn**

---

## 🚀 Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar en modo desarrollo (web)
npx expo start --web

# 3. Iniciar en modo desarrollo (móvil)
npx expo start
```

---

## 📦 Exportar para producción

### Web (estática)
```bash
npx expo export --platform web
```
Genera una carpeta `dist/` lista para desplegar en cualquier hosting estático (Vercel, Netlify, GitHub Pages, etc.)

### Android (APK)
```bash
npx eas build --platform android --profile production
```

### iOS (IPA)
```bash
npx eas build --platform ios --profile production
```

---

## 📁 Estructura del proyecto

```
app/                  # Páginas (Expo Router)
├── (tabs)/           # Navegación por tabs (Mapa, Listado, Ajustes)
├── [id].tsx          # Detalle de establecimiento
├── welcome.tsx       # Landing page
└── _layout.tsx       # Layout raíz

components/           # Componentes reutilizables
├── HealthMap.tsx     # Mapa web (Leaflet)
├── HealthMap.native.tsx  # Mapa nativo (react-native-maps)
├── FilterChips.tsx   # Chips de filtrado
└── FacilityCard.tsx  # Tarjeta de establecimiento

constants/            # Tokens de diseño y configuración
contexts/             # Providers (Theme, App/Favorites)
hooks/                # Hooks personalizados (useTheme, useResponsive)
services/             # Datos (195 establecimientos verificados)
assets/               # Imágenes y recursos estáticos
```

---

## 🗂️ Tipos de establecimientos (195 total)

| Tipo | Cantidad |
|------|----------|
| Hospitales Públicos | 26 |
| Hospitales Universitarios | 8 |
| Clínicas Privadas | 20 |
| CESFAM | 35 |
| SAPU | 24 |
| SAR | 14 |
| COSAM | 16 |
| CECOF/CECOSF | 18 |
| Aseguradoras | 12 |
| Mutuales | 10 |

---

## 📄 Fuentes de datos

- MINSAL (Ministerio de Salud de Chile)
- Google Maps (direcciones y ratings)
- Servicios de Salud Metropolitanos (SSMC, SSMN, SSMO, SSMS, SSMSO)
- Sitios web oficiales de cada establecimiento

---

## 📝 Licencia

Proyecto privado. Todos los derechos reservados.
