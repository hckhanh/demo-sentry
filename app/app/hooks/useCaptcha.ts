import { createContext, useContext, useCallback, useState, useRef } from 'react';
import useScript from './useScript';

export default function useCaptcha(siteKey: string, action: string) {
  const statusRef = useScript(`https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`);
  const tokenRef = useRef<string>();
  const tokenTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  return useCallback(() => {
    return new Promise<string>((resolve, reject) => {
      if (statusRef.current === 'ready' && !tokenRef.current) {
        grecaptcha.enterprise.ready(async () => {
          const token = await grecaptcha.enterprise.execute(siteKey, { action });

          clearTimeout(tokenTimeoutRef.current)
          tokenTimeoutRef.current = setTimeout(() => {
            tokenRef.current = undefined;
          }, 1000 * 60 * 2);

          resolve(token)
        });
      } else {
        resolve(tokenRef.current)
      }
    });
  }, [])
}

export const CaptchaContext = createContext<string>('');
