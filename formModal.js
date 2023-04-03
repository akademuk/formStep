// Функция для закрытия модального окна
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    // Очистить параметр "modal" из адресной строки
    history.replaceState(null, null, window.location.pathname);
  }
  
  // Функция для открытия модального окна
  function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    
    // Получить элемент с классом "close" и добавить обработчик событий для клика на него
    var closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', function() {
      // При клике на крестик закрыть модальное окно
      closeModal();
    });
  }
  
  // Получить форму и добавить к ней обработчик событий для отправки
  var form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Отменить отправку формы
    var formData = new FormData(form); // Получить данные формы
    // Отправить данные формы с помощью AJAX
    fetch(form.action, {
      method: form.method,
      body: formData
    })
    .then(function(response) {
      if (response.ok) {
        // Если отправка прошла успешно, перезагрузить страницу с параметром для открытия модального окна
        window.location.href = window.location.href + '?modal=true';
      }
    })
    .catch(function(error) {
      console.error(error);
    });
  });
  
  // Проверить наличие параметра для открытия модального окна при загрузке страницы
  window.addEventListener('load', function() {
    if (window.location.search.indexOf('modal=true') !== -1) {
      // Если параметр есть, открыть модальное окно
      openModal();
    }
  });
  
  // Проверить, было ли модальное окно открыто при загрузке страницы
  // Если да, добавить обработчик событий для закрытия модального окна
  var modal = document.getElementById("myModal");
  if (modal.style.display === "block") {
    window.addEventListener('popstate', function() {
      closeModal();
    });
  }
  