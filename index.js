const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const contents = document.querySelectorAll('.summary-content');
const closeSvg = document.querySelector('.close-svg');
const vidPause = document.querySelector('#myVideo');
const openSvg = document.querySelector('.open-svg');
const sidebar = document.getElementById('active-sidebar');
const welcome = document.getElementById('welcome');
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");
let lastScrollTop = 0;

sidebar.addEventListener('change', function () {
  if (this.checked) {
    // console.log('Sidebar is open');
    openSvg.style.transition = "0.7s";
    openSvg.style.rotate = "180deg";
    openSvg.style.fill = "red";
  } else {
    // console.log('Sidebar is closed');
    openSvg.style.rotate = "0deg";
    openSvg.style.fill = "white";
  }
});

window.addEventListener('scroll', () => {
  const currentScrollTop = window.scrollY || document.documentElement.scrollTop;

  // console.log(currentScrollTop + "current");
  // console.log(lastScrollTop + " Last");
  if (currentScrollTop > lastScrollTop) {
    welcome.classList.add('hidden');

  } else {
    if (currentScrollTop < 200) {
      welcome.classList.remove('hidden');
    }
  }

  if (currentScrollTop >= 730) {
    // vidPause.pause();
    welcome.style.display = "none";
  } else {
    // vidPause.play();
    welcome.style.display = "block";
  }

  lastScrollTop = currentScrollTop;
});

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

function toggleContent(index) {
  contents.forEach((content, i) => {
    if (i === index) {
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    } else {
      content.style.display = 'none';
    }
  });
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);

  const json = JSON.stringify(object);
  console.log(formData);
  console.log(object);
  console.log(json);
  result.style.display = "block"

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = "Form submitted successfully";
        result.classList.add("success");
      } else {
        console.log(response);
        result.innerHTML = json.message;
      }
    })
    .catch(error => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
      result.classList.add("failed");
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 3000);
    });
});

