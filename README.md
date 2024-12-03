# HabitApp

HabitApp es una aplicación diseñada para ayudarte a construir hábitos positivos, mejorar tu organización y aumentar tu productividad. Con un diseño futurista y una interfaz intuitiva, HabitApp te permite llevar un control de tus hábitos diarios mientras te inspira con citas motivacionales.

## Funcionalidades

- **Gestión de Hábitos**: Añade, edita y elimina hábitos con facilidad.
- **Categorías de Hábitos**: Organiza tus hábitos en diferentes categorías como Salud, Productividad y Creatividad.
- **Progreso**: Visualiza tu progreso a través de gráficos que muestran tus logros por categoría.
- **Citas Motivacionales**: Obtén citas motivacionales al azar para mantenerte inspirado en tu camino hacia el desarrollo personal.
- **Configuraciones**: Personaliza la aplicación cambiando el tema (claro/oscuro), el idioma y activando o desactivando notificaciones. *(En desarrollo)*

## Tecnologías Utilizadas

- **React**: Para construir la interfaz de usuario.
- **Vite**: Como herramienta de construcción y desarrollo.
- **Node.js**: Para manejar el backend y realizar solicitudes a APIs externas.
- **Axios**: Para realizar solicitudes HTTP.
- **Context API**: Para manejar el estado global de los hábitos y el progreso.
- **CSS**: Para estilizar la aplicación y asegurar una experiencia visual atractiva.

---

## Backend

HabitApp incluye un backend desarrollado con **Node.js** que actúa como intermediario entre el frontend y las APIs externas utilizadas para citas motivacionales y traducción. Esto asegura un manejo más eficiente y seguro de las claves API y resuelve problemas relacionados con **CORS**.

### Funcionalidades del backend:

1. **Citas Motivacionales**:
   - Conecta con la API de **ZenQuotes** para obtener citas motivacionales.
   - Ruta: `GET /api/random`

2. **Traducción de Texto**:
   - Utiliza la **Cloud Translation API** de Google para traducir las citas al español.
   - Ruta: `POST /api/translate`

### Instalación del Backend:

1. **Navegar a la carpeta del backend:**
   ```bash
   cd backend

2. **Instalar dependencias:**
   ```bash
   npm install

3. **Configurar el archivo `.env`:**
   - Crea un archivo llamado `.env` en la carpeta `backend` con la siguiente configuración:
     ```plaintext
     GOOGLE_TRANSLATE_API_KEY=TU_CLAVE_API
     ```
   - Reemplaza `TU_CLAVE_API` con una clave API válida obtenida de Google Cloud Console.

4. **Iniciar el servidor:**
   ```bash
   node server.js

   ## Instalación de la App

### Requisitos previos

1. **Node.js** (versión recomendada 14.x o superior).
2. **Git** para clonar el repositorio.

### Pasos para instalar y correr la app localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/FelipeCaroca1/habit-app

2. **Navegar a la carpeta del proyecto:**
   ```bash
   cd habit-app

3. **Instalar dependencias:**
   ```bash
   npm install

4. **Correr la app en modo de desarrollo:**
   ```bash
   npm run dev

5. **Abrir en el navegador:**
   Vite proporciona un enlace directo en la terminal, presiona la tecla CTRL y el botón izquierdo del mouse para abrirlo

6. **Despliegue en Vercel:** 
   La app ya está desplegada en Vercel, donde puedes verla en acción:
   [Ver HabitApp en acción ](https://habit-app-pearl.vercel.app/)
