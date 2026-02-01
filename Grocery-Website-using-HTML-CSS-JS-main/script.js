// ============ DOM Elements ============
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header-2');
let backToTop = document.querySelector('.back-to-top');
let loading = document.querySelector('.loading');

// ============ Loading Screen ============
window.addEventListener('load', () => {
    setTimeout(() => {
        loading.classList.add('hide');
    }, 1000);
});

// ============ Mobile Menu Toggle ============
menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

// ============ Scroll Events ============
window.addEventListener('scroll', () => {
    // Close mobile menu on scroll
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    // Sticky header
    if (window.scrollY > 150) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }

    // Back to top button visibility
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }

    // Active navigation highlighting
    highlightActiveNav();

    // Scroll reveal animation
    revealOnScroll();
});

// ============ Active Navigation Highlighting ============
function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// ============ Scroll Reveal Animation ============
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;

        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to sections on load
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
    
    // Trigger initial check
    revealOnScroll();
});

// ============ Countdown Timer (Fixed for future date) ============
// Set countdown to 30 days from now
let countDate = new Date();
countDate.setDate(countDate.getDate() + 30);
countDate = countDate.getTime();

function CountDown() {
    let now = new Date().getTime();
    let gap = countDate - now;

    if (gap < 0) {
        // Reset countdown if expired
        countDate = new Date();
        countDate.setDate(countDate.getDate() + 30);
        countDate = countDate.getTime();
        gap = countDate - now;
    }

    let second = 1000;
    let minute = second * 60;
    let hour = minute * 60;
    let day = hour * 24;

    let d = Math.floor(gap / day);
    let h = Math.floor((gap % day) / hour);
    let m = Math.floor((gap % hour) / minute);
    let s = Math.floor((gap % minute) / second);

    // Add leading zeros
    document.getElementById('day').innerText = d < 10 ? '0' + d : d;
    document.getElementById('hour').innerText = h < 10 ? '0' + h : h;
    document.getElementById('minute').innerText = m < 10 ? '0' + m : m;
    document.getElementById('second').innerText = s < 10 ? '0' + s : s;
}

setInterval(CountDown, 1000);
CountDown(); // Initial call

// ============ Heart Icon Toggle ============
document.querySelectorAll('.product .icons .fa-heart').forEach(heart => {
    heart.addEventListener('click', (e) => {
        e.preventDefault();
        heart.classList.toggle('heart-active');
    });
});

// ============ Quantity +/- Buttons ============
document.querySelectorAll('.quantity-controls').forEach(controls => {
    const minusBtn = controls.querySelector('.minus');
    const plusBtn = controls.querySelector('.plus');
    const input = controls.querySelector('input');

    minusBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let value = parseInt(input.value);
        if (value > 1) {
            input.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let value = parseInt(input.value);
        if (value < 1000) {
            input.value = value + 1;
        }
    });
});

// ============ Add to Cart Button Feedback ============
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (!btn.classList.contains('added')) {
            const originalText = btn.innerText;
            btn.classList.add('added');
            btn.innerText = 'Added!';
            
            setTimeout(() => {
                btn.classList.remove('added');
                btn.innerText = originalText;
            }, 2000);
        }
    });
});

// ============ Smooth Scroll for Back to Top ============
backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============ Search Box Functionality ============
const searchBox = document.getElementById('search-box');
const searchLabel = document.querySelector('.search-box-container label');

searchLabel.addEventListener('click', () => {
    if (searchBox.value.trim() !== '') {
        // Add visual feedback
        searchBox.style.borderColor = 'var(--green)';
        setTimeout(() => {
            searchBox.style.borderColor = '';
        }, 500);
    }
});

// ============ Navbar Link Smooth Scroll ============
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});