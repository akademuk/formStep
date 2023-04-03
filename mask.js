// Выбираем поле ввода телефона по его ID
const phoneInput = document.querySelector('#phone');

// Инициализируем маску для телефона, используя библиотеку Inputmask
Inputmask({mask: '+380 (99) 999-99-99'}).mask(phoneInput);
