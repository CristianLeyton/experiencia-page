import { useEffect } from "react";
import { useLocation } from "react-router";
import { scrollToSectionWhenReady } from "../../utils/scrollToSection";

export function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");
    if (!id) return;

    scrollToSectionWhenReady(id);
  }, [pathname, hash]);

  return null;
}
