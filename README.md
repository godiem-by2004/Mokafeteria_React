# Mokafetería · React

Tienda de la cafetería Mokafetería hecha con React, Vite, React Router y react-bootstrap.

## Cómo ejecutar

Requiere Node.js 20.19 o superior.

```bash
npm install
npm run dev
```

Abre http://localhost:5173

## Páginas

| Ruta | Página | Archivo |
| --- | --- | --- |
| `/` | Bienvenida y horario | `src/pages/Inicio.jsx` |
| `/productos` | Catálogo con búsqueda y categorías | `src/pages/Productos.jsx` |
| `/productos/:id` | Detalle de un producto (`useParams`) | `src/pages/DetalleProducto.jsx` |
| `/carrito` | Pedido: cantidades, total y confirmación | `src/pages/Carrito.jsx` |
| `/compra-exitosa` | Confirmación del pedido | `src/pages/CompraExitosa.jsx` |
| `/acceso` | Iniciar sesión y registrarse (pestañas) | `src/pages/Acceso.jsx` |
| `/sobre-nosotros` | Historia y carrusel de fotos | `src/pages/SobreNosotros.jsx` |
| `/reserva` | Reserva de mesa | `src/pages/Reserva.jsx` |
| `/contacto` | Dirección, teléfono y redes | `src/pages/Contacto.jsx` |

## Dónde está cada hook

| Hook | Archivo |
| --- | --- |
| useState (formularios controlados) | `LoginForm.jsx`, `RegistroForm.jsx`, `ReservaForm.jsx` |
| useState (filtros) | `pages/Productos.jsx` |
| useEffect con limpieza (cargar datos) | `pages/Productos.jsx` |
| useEffect (guardar el carrito en localStorage) | `context/CarritoContext.jsx` |
| useEffect (título y scroll) | `hooks/useTitulo.js`, `components/ScrollToTop.jsx` |
| useNavigate | `Inicio`, `ProductCard`, `DetalleProducto`, `Carrito`, `LoginForm`, `RegistroForm`, `Navbar` |
| useParams | `pages/DetalleProducto.jsx` |
| useLocation | `pages/CompraExitosa.jsx`, `pages/DetalleProducto.jsx` |
| useContext (carrito) | `context/CarritoContext.jsx` |
| useContext (sesión) | `context/UsuarioContext.jsx` |
| Colecciones con `map` | `ProductList`, `ItemCarrito`, `Carrusel`, `pages/Contacto.jsx` |

## Notas

- Las fotos de los productos se cargan desde Unsplash (requiere internet).
- **Fotos del carrusel**: copia tus imágenes en `src/assets/galeria/` y aparecen solas en "Sobre nosotros". Se ordenan por nombre (`01-...`, `02-...`). Los textos alternativos opcionales se editan en `src/data/galeria.js`.
- `public/Imagenes` solo guarda la foto de la portada del inicio y el ícono de la pestaña.
- El carrito también se guarda en `localStorage` (solo id y cantidad) y se recupera al recargar.
- Los usuarios y la sesión se guardan en `localStorage`, igual que en la versión original. Las contraseñas quedan en texto plano: sirve para practicar, no para producción.
- `src/index.css` se importa después de Bootstrap en `main.jsx` para poder sobrescribir sus estilos.
