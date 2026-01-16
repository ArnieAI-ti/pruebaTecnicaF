document.addEventListener('DOMContentLoaded', function () {
    // Carga el componente del navbar y lo inserta al inicio del body
    fetch('./components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            // Inicia todas las funcionalidades del menú y búsqueda
            initializeNavbar();
            initializeMobileMenu();
            initializeSearchModal();
            addDynamicStyles();
        })
        .catch(error => console.error('Error al cargar el navbar:', error));
});

// Configuración básica del navbar
function initializeNavbar() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        const icon = mobileMenuButton.querySelector('i');
        mobileMenuButton.addEventListener('click', function () {
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
}

// Manejo del menú lateral en dispositivos móviles
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMenuButton = document.querySelector('.close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuOverlay = document.getElementById('menu-overlay');

    if (!mobileMenuButton || !mobileMenu) return;

    // Abre el menú móvil
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('-translate-x-full');
        mobileMenu.classList.remove('hidden');
        if (menuOverlay) menuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    if (closeMenuButton) closeMenuButton.addEventListener('click', closeMobileMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMobileMenu);

    // Cierra el menú móvil
    function closeMobileMenu() {
        mobileMenu.classList.add('-translate-x-full');
        if (menuOverlay) menuOverlay.classList.add('hidden');
        document.body.style.overflow = '';

        const icon = mobileMenuButton.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

// Lógica para los buscadores móviles (modal) y escritorio (expandible)
function initializeSearchModal() {
    const mobileSearchButton = document.getElementById('mobile-search-button');
    const searchModal = document.getElementById('search-modal');
    const closeSearch = document.querySelector('.close-search-btn');

    // Funciones para el buscador móvil
    function openSearchModal() {
        if (searchModal) {
            searchModal.classList.remove('hidden');
            searchModal.classList.add('animate-none');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSearchModal() {
        if (searchModal) {
            searchModal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    if (mobileSearchButton) mobileSearchButton.addEventListener('click', openSearchModal);
    if (closeSearch) closeSearch.addEventListener('click', closeSearchModal);

    if (searchModal) {
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) closeSearchModal();
        });
    }

    // Buscador expandible en escritorio
    const desktopSearchBtn = document.getElementById('search-button');
    const desktopSearchContainer = document.getElementById('desktop-search-container');
    const desktopInput = desktopSearchContainer ? desktopSearchContainer.querySelector('input') : null;

    if (desktopSearchBtn && desktopSearchContainer) {
        desktopSearchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isClosed = desktopSearchContainer.classList.contains('w-0');

            if (isClosed) {
                // Abre el campo de entrada
                desktopSearchContainer.classList.remove('w-0', 'opacity-0');
                desktopSearchContainer.classList.add('w-64', 'opacity-100', 'px-2');
                setTimeout(() => desktopInput && desktopInput.focus(), 300);
            } else {
                // Procesa la búsqueda si hay texto o cierra si está vacío
                if (desktopInput && desktopInput.value.trim() !== "") {
                    const query = encodeURIComponent(desktopInput.value.trim());
                    window.open(`https://www.google.com/search?q=site:ds3comunicaciones.com+${query}`, '_blank');
                } else {
                    desktopSearchContainer.classList.add('w-0', 'opacity-0');
                    desktopSearchContainer.classList.remove('w-64', 'opacity-100', 'px-2');
                }
            }
        });

        // Cierra al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!desktopSearchContainer.contains(e.target) && !desktopSearchBtn.contains(e.target)) {
                desktopSearchContainer.classList.add('w-0', 'opacity-0');
                desktopSearchContainer.classList.remove('w-64', 'opacity-100', 'px-2');
            }
        });

        // Dispara búsqueda con la tecla Enter
        if (desktopInput) {
            desktopInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const query = encodeURIComponent(desktopInput.value.trim());
                    if (query) {
                        window.open(`https://www.google.com/search?q=site:ds3comunicaciones.com+${query}`, '_blank');
                    }
                }
            });
        }
    }

    // Cierra todo con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearchModal();
            if (desktopSearchContainer) {
                desktopSearchContainer.classList.add('w-0', 'opacity-0');
                desktopSearchContainer.classList.remove('w-64', 'opacity-100', 'px-2');
            }
        }
    });
}

// Inyección de estilos dinámicos para el navbar
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        #search-modal.hidden {
            display: none !important;
        }

        .-translate-x-full {
            transform: translateX(-100%);
        }
        
        #mobile-menu {
            transition: transform 0.3s ease-in-out;
        }
        
        #menu-overlay {
            background-color: rgba(0, 0, 0, 0.5);
        }
    `;
    document.head.appendChild(style);
}