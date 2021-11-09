export const printLine = (line) => {
  console.log('===> FROM THE PRINT MODULE:', line);
};

export const setAttributes = (el, attrs) => {
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
}
