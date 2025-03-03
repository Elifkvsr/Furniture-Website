//TODO BAR
function show() {
    document.querySelector('.hamburger').classList.toggle('open')
    document.querySelector('.navigation').classList.toggle('active')
}

// // ANİMASYONLU SCROLL DETECT
// const sections = document.querySelectorAll('section');
// const links = document.querySelectorAll('nav ul li a');

// // Section görünür olduğunda animasyon tetikle
// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('visible');
//         }
//     });
// }, { threshold: 0.25 });

// sections.forEach(section => {
//     observer.observe(section);
// });

// // SMOOTH SCROLL + MENÜ ANİMASYON
// document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault();

//         // Hamburger menüyü kapat
//         document.querySelector('.hamburger').classList.remove('open');
//         document.querySelector('.navigation').classList.remove('active');

//         // Scroll animasyonu
//         const target = document.querySelector(this.hash);
//         if (target) {
//             const targetPosition = target.offsetTop - 50; // 50px yukarıdan

//             window.scrollTo({
//                 top: targetPosition,
//                 behavior: 'smooth'
//             });

//             // Tıklanan linke pulse efekti
//             this.style.transform = 'scale(1.2)';
//             setTimeout(() => {
//                 this.style.transform = 'scale(1)';
//             }, 300);
//         }
//     });
// });

// // SCROLL SIRASINDA AKTİF LINK
// window.addEventListener('scroll', () => {
//     let current = '';

//     sections.forEach(section => {
//         const sectionTop = section.offsetTop;
//         const sectionHeight = section.clientHeight;

//         if (pageYOffset >= sectionTop - sectionHeight / 3) {
//             current = section.getAttribute('id');
//         }
//     });

//     links.forEach(link => {
//         link.classList.remove('active');
//         if (link.getAttribute('href').includes(current)) {
//             link.classList.add('active');
//         }
//     });
// });

// JavaScript'e bu kodu ekle
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Navigasyon menüsünü kapat
        document.querySelector('.hamburger').classList.remove('open');
        document.querySelector('.navigation').classList.remove('active');

        // Hedef bölüme yumuşak kaydırma
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }


        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Sayfa yüklendiğinde aktif link
window.addEventListener('load', function () {
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});


//todo DOM elemanlarını seçiyoruz
const toggleBtn = document.getElementById('toggleBtn');
const title = document.getElementById('title');
const content = document.getElementById('content');

//todo "Koleksiyonu incele" butonuna tıklama işlevi
toggleBtn.addEventListener('click', function () {
    if (title.innerHTML === 'MODERN') {
        title.innerHTML = 'KLASİK';
        content.innerHTML = 'Burada, klasik koleksiyon hakkında bilgiler yer alacak. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi, iure deserunt!';
        toggleBtn.innerHTML = 'Geri Dön <i class="fa-solid fa-arrow-left"></i>';
    } else {
        title.innerHTML = 'MODERN';
        content.innerHTML = 'Lorem, ipsum. ipsum dolor. ipsum dolor sit. ipsum dolor sit amet consectetur adipisicing elit. Quasi, iure deserunt! Vel nostrum dicta debitis.';
        toggleBtn.innerHTML = 'Koleksiyonu incele <i class="fa-solid fa-arrow-right"></i>';
    }
});


//TODO>>>Slider
let currentIndex = 0;
const mainImage = document.querySelector('.main-image');
const thumbnails = document.querySelectorAll('.slide .item');
const modernButton = document.querySelector('.modern');
const classicButton = document.querySelector('.klasik');
const modernOverlay = document.querySelector('.modern-overlay');
const classicOverlay = document.querySelector('.classic-overlay');

const modernImages = [
    './images/image1.png',
    './images/image4.png',
    './images/image3.png',
    './images/image4.png',
    './images/image3.png',
    './images/image1.png',
    './images/image6.png',
    './images/image6.png',
];

const classicImages = [
    './images/image7.png',
    './images/image5.png',
    './images/image6.png',
    './images/image7.png',
];

let currentCollection = modernImages;
function updateMainImage(index) {
    const bgImage = `url(${currentCollection[index]})`;
    mainImage.style.backgroundImage = bgImage;
}

document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentCollection.length;
    updateMainImage(currentIndex);
});

document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentCollection.length) % currentCollection.length;
    updateMainImage(currentIndex);
});

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        currentIndex = index;
        updateMainImage(currentIndex);
    });
});

modernButton.addEventListener('click', () => {
    currentCollection = modernImages;
    currentIndex = 0;
    updateMainImage(currentIndex);
    modernOverlay.style.display = 'block';
    classicOverlay.style.display = 'none';
});

classicButton.addEventListener('click', () => {
    currentCollection = classicImages;
    currentIndex = 0;
    updateMainImage(currentIndex);
    modernOverlay.style.display = 'none';
    classicOverlay.style.display = 'block';
});


//TODO>>>> BLOG SLİDER
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.imagess-slider img'); // Resimleri seçiyoruz
    let activeSlide = 0; // İlk resim aktif olarak başlar

    // Resimler arasında geçişi sağlayacak fonksiyon
    window.changeSlide = function (n) {
        slides[activeSlide].classList.remove('active');  // Önceki aktif resmin 'active' sınıfını kaldırıyoruz
        activeSlide = (activeSlide + n + slides.length) % slides.length;  // Yeni aktif resmi hesaplıyoruz
        slides[activeSlide].classList.add('active');  // Yeni resme 'active' sınıfı ekliyoruz
    };
});


//HARİTA
// script.js içine veya HTML sonuna
const harita = L.map('harita').setView([37.0659, 37.3781], 14); // Gaziantep koordinatları

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(harita);

// İşaretleyici ekleme
L.marker([37.0659, 37.3781])
    .addTo(harita)
    .bindPopup('ESER Mobilya Mağazası');




function initMap() {
    const gaziantep = { lat: 36.8871, lng: 36.8619 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: gaziantep,
    });
    new google.maps.Marker({ position: gaziantep, map });
}