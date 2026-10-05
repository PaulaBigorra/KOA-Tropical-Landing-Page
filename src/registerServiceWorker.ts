export function register(): void {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('ServiceWorker registrado con éxito: ', registration.scope);
        })
        .catch((error) => {
          console.error('Error al registrar ServiceWorker: ', error);
        });
    });
  }
}