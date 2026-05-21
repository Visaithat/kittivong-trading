"use client";

import { useEffect, useState } from "react";
import { laoFontsReady, onLaoFontsReady } from "./_labels";

/**
 * Returns a nonce that flips once Noto Sans/Serif Lao have actually loaded.
 * Use as a `useMemo` dependency so canvas label textures re-bake with the
 * proper Lao face the moment the font becomes available.
 */
export function useLaoFontsReady() {
  const [nonce, setNonce] = useState(0);
  useEffect(() => {
    if (laoFontsReady()) {
      setNonce(1);
      return;
    }
    return onLaoFontsReady(() => setNonce((n) => n + 1));
  }, []);
  return nonce;
}
