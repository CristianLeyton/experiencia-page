export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return false;

  element.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export function scrollToSectionWhenReady(id: string, maxAttempts = 20) {
  let attempts = 0;

  const tryScroll = () => {
    if (scrollToSection(id)) return;

    attempts += 1;
    if (attempts < maxAttempts) {
      requestAnimationFrame(tryScroll);
    }
  };

  tryScroll();
}
