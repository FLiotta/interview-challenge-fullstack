import { useEffect } from 'react';

export const useClickOutside = (ref: any, cb: () => void) => {

  const handleClickOutside = (event: any) => {
    if(ref.current && !ref.current.contains(event.target)) {
      cb();
    }
  }
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref]);
}