import { useEffect } from 'react'

// Hook personalizado: cambia el título de la pestaña cuando la página aparece.
function useTitulo(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · Mokafetería` : 'Mokafetería'
  }, [titulo])
}

export default useTitulo
