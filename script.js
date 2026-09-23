document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navtoggle');
    const navLinks = document.getElementById('navLinks');

    if (!navToggle || !navLinks) return;

    // Helper functions to open/close menu and keep ARIA attributes in sync
    const openMenu = () => {
        navLinks.classList.add('show-menu');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        navLinks.classList.remove('show-menu');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
        const isOpen = navLinks.classList.contains('show-menu');
        isOpen ? closeMenu() : openMenu();
    };

    // 1. Toggle menu on button click
    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // 2. Close menu when clicking outside of navToggle or navLinks
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            closeMenu();
        }
    });

    // 3. Close menu when pressing the Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('show-menu')) {
            closeMenu();
            navToggle.focus(); // Return focus back to toggle button
        }
    });

    // 4. Auto-close menu when a navigation link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => closeMenu());
    });
});
const searchInput = document.getElementById('memberSearch');
if(searchInput){
    searchInput.addEventListener('input', filterDirectory);
    searchInput.addEventListener('keyup', filterDirectory);
}
let currentCategory = 'all';
function filterDirectory(){
    const searchInput = document.getElementById('memberSearch');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '' ;
    const cards = document.querySelectorAll('.member-card');
    const categoryGroup = document.querySelectorAll('.category-group');
    cards.forEach(card => {
        const textContent = card.textContent.toLocaleLowerCase();
        const category = card.getAttribute('data-category');
        const matchesSearch = query === '' || textContent.includes(query);
        const matchesCategory = (currentCategory === 'all' || category === currentCategory);
        if (matchesSearch && matchesCategory) {
            card.style.display = 'flex';
        }else{
            card.style.display = 'none';
        }
    });
    categoryGroup.forEach(group => {
        const visibleCards = Array.from(group.querySelectorAll('.member-card')).filter(card =>{
            return window.getComputedStyle(card).display !== 'none';
        });
        if(visibleCards.length === 0){
           group.style.setProperty('display','none','important');
        } else {
           group.style.setProperty('display','block','important')
        }
    });
}
function filterCategory(category,button){
    currentCategory = category;
    const buttons =document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if(button) {
        button.classList.add('active');
    }
    filterDirectory();
}
function moveSlide(buttonElement, direction) {
    const container = buttonElement.closest('.slider-container');
    if (!container) return;

    const track = container.querySelector('.slider-track');
    if (!track) return;

    // Get all slides inside the track
    let slides = track.querySelectorAll('.slide-img');
    if (slides.length === 0) {
        slides = track.querySelectorAll('img');
    }

    const totalSlides = slides.length;
    if (totalSlides === 0) return;

    // Read current index
    let currentIndex = parseInt(track.getAttribute('data-index') || '0', 10);
    currentIndex += direction;

    // Loop bounds protection
    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    // Apply smooth horizontal shift
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    track.setAttribute('data-index', currentIndex.toString());

    // Update counter badge if present
    const counter = container.querySelector('.slide-counter');
    if (counter) {
        counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
    }

    // Update active thumbnail border
    const card = container.closest('.member-card, figcaption, article');
    if (card) {
        // FIXED: Added missing leading dot '.' to the class selector
        const thumbs = card.querySelectorAll('.thumbnail-strip .thumb');
        thumbs.forEach((thumb, i) => {
            if (i === currentIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
}
function filterGalleryCategory(category, buttonElement){
    const buttons =document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    if(buttonElement){
        buttomElement.classList.add('active');
    }
    const categoryGroups = document.querySelectorAll('.category-group');
    categoryGroups.forEach(group => {
        const groupCategory = group.getAttribute('data-category');
        if(category === 'all' || groupCategory === category){
            group.style.display = 'block';
        }else {
            group.style.display = 'none';
        }
    });
}