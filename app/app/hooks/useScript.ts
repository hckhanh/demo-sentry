import { useEffect, useRef, useState } from 'react';

export default function useScript(url: string) {
  const statusRef = useRef<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = url;
    script.defer = true;

    const handleEvent = (event: Event) => {
      statusRef.current = event.type === 'load' ? 'ready' : 'error';
    }

    script.addEventListener('load', handleEvent)
    script.addEventListener('error', handleEvent)
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleEvent)
      script.removeEventListener('error', handleEvent)
      script.remove()
    };
  }, [url]);

  return statusRef;
};
