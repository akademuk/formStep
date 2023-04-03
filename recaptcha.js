grecaptcha.enterprise.ready(function() {
    const form = document.querySelector('#form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      grecaptcha.enterprise.execute('6LfVuEMlAAAAAP-NacZ17CnIP-KTRtjc7928KrXg', { action: 'submit' })
        .then(function(token) {
          // Отправьте токен и другие данные формы на сервер для проверки
          form.submit(); // Если проверка reCAPTCHA прошла успешно, отправьте форму
        });
    });
  });