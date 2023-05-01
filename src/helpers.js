export const scrollElementIntoView = (elementName, delay) => {
  setTimeout(
    () =>
      document
        .getElementById(elementName)
        ?.scrollIntoView({ behavior: 'smooth' }),
    delay,
  );
};
