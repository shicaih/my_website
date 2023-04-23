export const scrollElementIntoView = (elementName) => {
  document.getElementById(elementName)?.scrollIntoView({ behavior: 'smooth' });
};
