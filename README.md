# 🏥 GEOspital

> Localizador de centros asistenciales de Salud de Chile | **Fase 1:** Región Metropolitana de Santiago (Capital)

[![License: Private](https://img.shields.io/badge/License-Private-red.svg)](https://github.com/saavedradg/GEOspital/blob/main/README.md)
[![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android%20%7C%20Web-blue)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.79.4-61DAFB?logo=react)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53.0.9-000020?logo=expo)](https://expo.dev)

**GEOspital** es una aplicación multiplataforma que ayuda a los usuarios a encontrar y navegar hacia establecimientos de salud en Chile. Desarrollada con **Expo** y **React Native**, funciona sin problemas en iOS, Android y la web desde una misma base de código.

---

## 📱 Capturas de pantalla

| Mapa interactivo | Listado de centros | Detalle del centro |
| :---: | :---: | :---: |
| _(Inserta aquí una captura del mapa)_ | _(Inserta aquí una captura del listado)_ | _(Inserta aquí una captura de la vista de detalle)_ |

---

## ✨ Características principales

### Funcionalidades actuales (v1.0)

-   **🗺️ Mapa interactivo**: Visualiza +30 establecimientos de salud de 3 tipos distintos (Hospitales Públicos, CESFAM y Clínicas Privadas), cada uno con un color y marcador único.
-   **🔍 Búsqueda y filtrado avanzado**: Encuentra centros por nombre, dirección o comuna, y aplíca filtros por tipo de establecimiento o tus favoritos.
-   **📱Vista de detalle completa**: Consulta información completa de cada centro: dirección, servicios, botón para llamar directamente e indicaciones para llegar (con integración a Google Maps).
-   **⭐ Sistema de favoritos persistente**: Guarda tus centros de salud preferidos con un solo toque, con almacenamiento local mediante `AsyncStorage` y retroalimentación háptica para una experiencia táctil satisfactoria.

### Mapa en todas las plataformas

GEOspital utiliza un sistema de mapa inteligente que se adapta a cada plataforma:
-   **📱 iOS & Android**: Utiliza `react-native-maps` para la máxima fluidez y rendimiento nativo.
-   **💻 Web**: Utiliza `Leaflet` con datos de `OpenStreetMap` para una visualización potente y sin fricciones en el navegador.

---

## 🛠️ Tecnologías utilizadas

-   **Framework Core**: [Expo](https://expo.dev) (~53.0.9) y [React Native](https://reactnative.dev) (0.79.3).
-   **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (~5.8.3) para un código robusto y tipado.
-   **Backend y datos**: [Supabase](https://supabase.com/) (^2.50.0) para la base de datos y autenticación.
-   **Navegación**: [Expo Router](https://docs.expo.dev/router/introduction/) (~5.0.7) para un sistema de rutas basado en archivos.
-   **Mapas**:
    -   Móvil: `react-native-maps`.
    -   Web: `Leaflet` / `OpenStreetMap`.
-   **UI y Estilos**:
    -   `react-native-paper` para componentes Material Design.
    -   `@expo/vector-icons` para iconografía escalable.
    -   `expo-linear-gradient` y `expo-blur` para efectos visuales.
-   **Utilidades y servicios**:
    -   `expo-location` para acceder a la ubicación del usuario.
    -   `expo-haptics` para retroalimentación táctil.
    -   `expo-camera` e `expo-image-picker` para funcionalidades multimedia.
    -   `react-native-calendars` para manejo de fechas.

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

-   **[Node.js](https://nodejs.org/)** (versión 18.x o superior).
-   **[Git](https://git-scm.com/)** para clonar el repositorio.
-   **Un editor de código**, como [Visual Studio Code](https://code.visualstudio.com/).
-   **Opcional, para desarrollo móvil:**
    -   [Android Studio](https://developer.android.com/studio) para emular Android.
    -   [Xcode](https://developer.apple.com/xcode/) (solo en macOS) para emular iOS.

---

## 🚀 Cómo empezar

Sigue estos pasos para poner en marcha el proyecto en tu máquina local.

### 1. Clonar el repositorio

```bash
git clone https://github.com/saavedradg/GEOspital.git
cd GEOspital

