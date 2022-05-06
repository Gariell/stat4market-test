const dropdowns = document.querySelectorAll('[data-dropdown]');
dropdowns.forEach(dropdown => {
  const dropdownOptions = dropdown.querySelectorAll('li[data-option]');
  const dropdownTitle = dropdown.querySelector('[data-dropdown-title]'); 
  const dropdownSubTitle = dropdownTitle.querySelector('data-dropdown-textelement');
  const dropdownName = dropdown.getAttribute('data-dropdown');
  dropdownTitle.addEventListener('click', () => toggleActiveDropdown(dropdown, 'toggle'));
  if (dropdownOptions.length > 0) {
    dropdownOptions.forEach(option => {
      option.addEventListener('click', () =>{
        addInputHidden(dropdownName, option.getAttribute('data-option'));
        dropdownSubTitle?dropdownSubTitle.innerText=option.getAttribute('data-option'):dropdownTitle.innerText=option.getAttribute('data-option');
      });
    });
    addInputHidden(dropdown.getAttribute('data-dropdown'), dropdownOptions[0].getAttribute('data-option'));
  }
});

// добавление класса "active" выбранному option
function addActiveOption(name, value) {
  const options = document.querySelectorAll(`[data-dropdown="${name}"] li[data-option]`);
  options.forEach(option => {
    option.getAttribute('data-option')==value?option.classList.add('active'):option.classList.remove('active');
  });
}

// создание скрытого инпута или обновление его значения 
function addInputHidden(name, value) { 
  let input = document.querySelector(`input[name="${name}"]`); 
  if (input) { input.value = value } 
  else {
    const input = document.createElement('input'); 
    input.type = "hidden"; input.name = name; input.value = value; input.setAttribute('data-dropdown-input', '');
    document.querySelector(`[data-dropdown="${name}"]`).append(input);
  };
  addActiveOption(name, value)
}

// функция изменения видимости дропдауна
function toggleActiveDropdown(dropdown, action) {
  if (action == "toggle") { dropdown.hasAttribute('data-dropdown-active') ? dropdown.removeAttribute('data-dropdown-active') : dropdown.setAttribute('data-dropdown-active', '');} 
  else if((action == "add")){ dropdown.setAttribute('data-dropdown-active', ''); } 
  else if((action == "remove")){ dropdown.removeAttribute('data-dropdown-active'); } 
  else {dropdown.removeAttribute('data-dropdown-active'); console.log( 'функция toggleActiveDropdown() приняла неверное значение' );}
}

window.addEventListener('click', e => { const target = e.target
  let activeDropdowns = document.querySelectorAll('[data-dropdown-active]')
  if (activeDropdowns.length > 0 && !target.closest('[data-dropdown-title]')) {
    activeDropdowns.forEach(activeDropdown => toggleActiveDropdown(activeDropdown, 'remove'));
  }
})

/* МОДУЛЬ DROPDOWN(самопис)
data-dropdown="name" - Контейнер элемента с dropdown
data-dropdown-title - заголовок dropdown, по нему отслеживается клик для открытия dropdown, а также в нем меняется содержимое на значение data-option
data-dropdown-textelement - элемент внутри заголовка для вывода значения data-option, для более точной замены текста 
data-dropdown-content - контейнер dropdown, становится видимым при наличии data-dropdown-active у родителя с data-dropdown="name" 
data-option="value" - опции селекта, при их отсутствия инпут не создается, меняться заголовок при клике не будет, но дропдаун продолжит работать 

<div data-dropdown="name">
  <button data-dropdown-title><span data-dropdown-textelement>ru</span></button>
  <ul data-dropdown-content>
    <li data-option="value1">value1</li>
    <li data-option="value2">value2</li>
  </ul>
</div> */