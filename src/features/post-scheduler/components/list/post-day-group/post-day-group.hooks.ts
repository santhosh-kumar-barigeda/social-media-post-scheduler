import { useState } from 'react';

export function usePostDayGroup() {
  const [isOpen, setIsOpen] = useState(true);

  function toggle() {
    setIsOpen((open) => !open);
  }

  return { isOpen, toggle };
}
