include("./modules/dropdown/script.js");
function include(url) { 
  let script = document.createElement('script'); 
  script.src = url; script.type = 'module';
  document.getElementsByTagName('body')[0].appendChild(script);
}

const btnHeaderBurger = document.querySelector('.header__btn-burger');
btnHeaderBurger.addEventListener('click', () => {
  btnHeaderBurger.classList.contains('active') ? btnHeaderBurger.classList.remove('active') : btnHeaderBurger.classList.add('active')
})