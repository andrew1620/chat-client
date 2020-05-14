export const correctName = (name) => {
  const correct = name ? name.match(/^[а-яА-Я-a-zA-Z][а-яА-Я0-9-a-zA-Z0-9-_\.]{1,20}$/) : true;
  return correct ? undefined : "Имя должно быть 2-20 символов и начинаться с буквы";
};
export const isRequired = (message) => {
  return message ? undefined : "Field is required";
};
