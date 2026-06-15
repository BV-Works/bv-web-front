# BV Web Frontend

Frontend principal de la plataforma BV Web.

Aplicación desarrollada con:

- Next.js App Router
- TypeScript
- TailwindCSS
- Zustand
- shadcn/ui
- Arquitectura modular escalable tipo SaaS

El frontend consume la API del backend BV Web y gestiona:

- autenticación
- dashboard admin
- edición de perfiles
- gestión de links
- páginas públicas tipo Linktree
- previews dinámicas
- roles y permisos visuales

---

# Stack Tecnológico

- Next.js 15
- React 19
- TypeScript
- TailwindCSS
- Zustand
- Axios
- shadcn/ui
- Lucide Icons
- dnd-kit
- React Hook Form
- Zod

---

# Estructura del Proyecto

```txt
app/
├── (linktree)/
│   ├── artists/[slug]    # Pagina Perfil público artist
│   └── team/[slug]       # Pagina Perfil público team
├── (public)/
│   ├── artists           # Pagina pública artists
│   └── team              # Pagina pública team
├── login/                # Login page
├── forgot-password/      # Forgot password page
├── reset-password/       # Reset password page
├── app/                  # Dashboard privado
│   ├── profile/          # Editor de perfil propio
│   ├── users/            # Gestión de usuarios (ADMIN)
│   │   └──/[id]/         # Editor admin de perfiles
│
├──components/
│     ├── ui/                   # Componentes reutilizables
│     ├── profile/              # Componentes de perfiles
│     ├── modals/               # Modales reutilizables
│     └── layout/               # Layouts
│
├──config/                   # Configuraciones de env.js
│
├──hooks/                    # Hooks reutilizables
│
├──lib/
│     ├── api/                  # Cliente API
│     ├── stores/               # Zustand stores
│     ├── utils/                # Helpers

types/
├── index.js
├── api.ts
├── forms.ts
├── profile.ts
├── user.ts
└── link.ts
```

---

# Arquitectura

La aplicación sigue una arquitectura modular basada en:

- separación clara UI / state / API
- stores globales con Zustand
- API layer centralizada
- componentes reutilizables
- separación entre:
  - dashboard privado
  - vistas públicas
  - lógica de negocio

---

# Roles del Sistema

## ADMIN

Puede:

- gestionar usuarios
- editar perfiles de cualquier usuario
- gestionar roles
- activar/desactivar usuarios

---

## TEAM

Puede:

- editar su perfil
- gestionar links
- visualizar preview pública

---

## ARTIST

Puede:

- editar su perfil
- gestionar links
- visualizar preview pública

---

## CUSTOMER

Actualmente:

- acceso limitado
- sin editor de perfil

---

# Sistema de Profiles

El sistema separa:

```txt
User.role
```

de:

```txt
Profile.profile_type
```

Esto permite:

- admins con perfil público
- flexibilidad futura
- separación entre permisos y representación pública

---

# Estado Global

La aplicación utiliza Zustand para:

- auth state
- profiles
- users
- UI state

Ejemplo:

```txt
useAuthStore
useProfileStore
useUsersStore
```

---

# API Layer

Toda la comunicación con backend se centraliza en:

```txt
lib/api/
```

Responsabilidades:

- requests HTTP
- manejo de tokens
- unwrap responses
- manejo de errores
- tipado centralizado

---

# Flujo de Perfiles

## Usuario

```txt
/app/profile
```

- edita su propio perfil
- gestiona links
- preview en tiempo real

---

## Admin

```txt
/app/users/[id]
```

- edita perfiles de otros usuarios
- puede crear perfiles
- gestión avanzada

---

# Sistema de Links

Cada profile puede tener múltiples links:

- spotify
- instagram
- youtube
- twitch
- tiktok
- applemusic
- custom

Features:

- reorder drag & drop
- visibilidad
- preview live
- edición inline

---

# Variables de Entorno

Crear:

```txt
.env.local
```

Ejemplo:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

---

# Instalación

## 1. Instalar dependencias

```bash
npm install
```

---

## 2. Ejecutar desarrollo

```bash
npm run dev
```

---

## 3. Build producción

```bash
npm run build
```

---

## 4. Start producción

```bash
npm run start
```

---

# Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run format
```

---

# Estado Actual

## MVP funcional

Actualmente implementado:

- auth JWT
- dashboard admin
- roles
- profiles
- links
- páginas públicas
- previews
- drag & drop
- stores globales
- API typed layer

---

# Roadmap Próximo

## Integraciones

- Cloudinary
- Resend

---

## Mejoras

- QR automático por profile
- mejoras visuales branding
- permisos avanzados
- observabilidad
- hardening de seguridad
- optimización loading state

---

# Objetivo del Proyecto

Construir una plataforma moderna y escalable tipo:

- Linktree
- artista/team hub
- perfiles públicos dinámicos
- dashboard administrativo SaaS-ready
