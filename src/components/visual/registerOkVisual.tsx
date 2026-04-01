// hooks/useHighlightElement.ts
export const useHighlightElement = () => {
  const highlightElement = (elementId: string, delay = 100) => {
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('highlight');
        setTimeout(() => {
          element.classList.remove('highlight');
        }, 1500);
      }
    }, delay);
  };

  return { highlightElement };
};
