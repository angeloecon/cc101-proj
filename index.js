const year = new Date();
document.getElementById('year').innerHTML = year.getFullYear();
let lastScrollTop = 0;
const welcome = document.getElementById('welcome');

window.addEventListener('scroll', function() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
        welcome.classList.add('hidden');
    } else {
        if (currentScrollTop < 100) { 
            welcome.classList.remove('hidden');
        }
    }
    lastScrollTop = currentScrollTop;
});