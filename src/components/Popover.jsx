import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';

function Popover({ isVisible, content, x, y }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!isVisible || !mounted) return null;

  return createPortal(
    <div
      className="z-[999] pointer-events-none px-2 py-1 text-[11px] rounded-md text-white bg-black/70 dark:bg-white immersive:bg-white immersive:text-black dark:text-black shadow-md"
      style={{ position: 'fixed', left: x, top: y, transform: 'translate(-50%, 12px)' }}
    >
      {content}
    </div>,
    document.body
  );
}

export default Popover;
