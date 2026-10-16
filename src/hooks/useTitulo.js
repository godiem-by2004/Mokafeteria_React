import { useEffect } from 'react'

function useTitulo(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} · Mokafetería` : 'Mokafetería'
  }, [titulo])
}

export default useTitulo
