import { useEffect, useState } from "react";

/**
 * Мини-роутер на location.hash. Маршруты вида "#/admin" не конфликтуют
 * с якорями секций лендинга ("#booking", "#pricing" и т.д.).
 */
export function useHashRoute(): string {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return hash;
}

export function navigate(hash: string) {
  window.location.hash = hash;
}
