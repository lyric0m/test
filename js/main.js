document.getElementById('productOrderForm').addEventListener('submit', function (event) {
    console.log("Форма отправляется");
    event.preventDefault(); // Останавливаем отправку формы для проверки

    let isValid = true;

    // Проверка всех полей
    isValid &= validateField('name', 'Введите ваше имя.', (value) => value.trim() !== '');
    isValid &= validateField('phone', 'Введите корректный номер телефона (10-15 цифр).', /^\d{10,15}$/);
    isValid &= validateField('email', 'Введите корректный E-mail.', /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
    isValid &= validateCheckboxes('product', 'Выберите хотя бы один продукт.');
    isValid &= validateField('quantity', 'Количество должно быть от 1 до 100.', (value) => value >= 1 && value <= 100);
    isValid &= validateField('date', 'Дата не может быть раньше сегодняшней.', (value) => value >= new Date().toISOString().split('T')[0]);
    isValid &= validateField('delivery', 'Пожалуйста, выберите способ получения.', (value) => value !== '');
    isValid &= validateField('comments', 'Комментарий не должен превышать 50 символов.', (value) => value.length <= 50);

    // Если форма валидна
    if (isValid) {
        // Выводим данные заказа
        const orderDetailsContainer = document.getElementById('orderDetails');
        orderDetailsContainer.innerHTML = `
            <h3>Детали заказа:</h3>
            <p>Имя: ${document.getElementById('name').value}</p>
            <p>Телефон: ${document.getElementById('phone').value}</p>
            <p>Email: ${document.getElementById('email').value}</p>
            <p>Продукты: ${Array.from(document.querySelectorAll('input[name="product"]:checked')).map(product => product.value).join(', ')}</p>
            <p>Количество: ${document.getElementById('quantity').value}</p>
            <p>Дата: ${document.getElementById('date').value}</p>
            <p>Способ получения: ${document.getElementById('delivery').options[document.getElementById('delivery').selectedIndex].text}</p>
            <p>Комментарии: ${document.getElementById('comments').value || 'Нет комментариев'}</p>
        `;

        // Показываем alert
        alert('Форма успешно отправлена!');

        //event.target.submit(); // Форма отправляется
    }
});

function setError(inputName, errorMessage) {
    const inputElement = document.querySelector(`[name="${inputName}"]`);
    const errorElement = document.getElementById(`${inputName}Error`);

    if (inputElement) {
        if (errorMessage) {
            inputElement.classList.add('input-error');
        } else {
            inputElement.classList.remove('input-error');
        }
    }

    if (errorElement) {
        errorElement.textContent = errorMessage;
    }
}


// Функция для проверки полей
function validateField(fieldId, errorMessage, pattern) {
    const value = document.getElementById(fieldId).value;
    const errorElement = document.getElementById(fieldId + 'Error');
    if (pattern) {
        if (typeof pattern === 'function' && !pattern(value)) {
            setError(fieldId, errorMessage);
            errorElement.textContent = errorMessage;
            return false;
        } else if (pattern instanceof RegExp && !pattern.test(value)) {
            setError(fieldId, errorMessage);
            errorElement.textContent = errorMessage;
            return false;
        }
    }
    setError(fieldId, '');
    errorElement.textContent = '';
    return true;
}

// Функция для проверки чекбоксов
function validateCheckboxes(fieldName, errorMessage) {
    const checkedProducts = document.querySelectorAll(`input[name="${fieldName}"]:checked`);
    if (checkedProducts.length === 0) {
        setError(fieldName, errorMessage);
        return false;
    } else {
        setError(fieldName, '');
        return true;
    }
}

// Inline-валидация на событиях
document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
        validateField(input.id, input.title);
    });

    input.addEventListener('blur', () => {
        validateField(input.id, input.title);
    });
});

// Inline-валидация для продуктов (чекбоксы)
document.querySelectorAll('input[name="product"]').forEach(product => {
    product.addEventListener('change', () => {
        validateCheckboxes('product', 'Выберите хотя бы один продукт.');
    });
});


// Изменение цвета при клике
document.getElementById('colorBox').addEventListener('click', function () {
    this.style.backgroundColor = this.style.backgroundColor === 'lightblue' ? 'lightcoral' : 'lightblue';
});

// Скрытие и показ элемента при наведении
document.getElementById('toggleBox').addEventListener('mouseover', function () {
    this.style.opacity = '0';
});

document.getElementById('toggleBox').addEventListener('mouseout', function () {
    this.style.opacity = '1';
});