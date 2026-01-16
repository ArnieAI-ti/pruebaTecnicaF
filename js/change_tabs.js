// Intercambia la imagen principal por la de la miniatura seleccionada
function toExchangeImage(element) {
    const mainImage = document.getElementById('img_main');
    const imgSource = element.querySelector('img');

    if (mainImage && imgSource) {
        // Desactiva el zoom si está activo al cambiar de imagen
        const container = mainImage.parentElement;
        if (container.classList.contains('zoomed')) {
            container.classList.remove('zoomed');
            mainImage.style.transform = 'scale(1)';
            mainImage.style.transformOrigin = 'center center';
        }

        // Transición suave de opacidad
        mainImage.style.opacity = '0.5';
        setTimeout(() => {
            mainImage.src = imgSource.src;
            mainImage.style.opacity = '1';
        }, 150);
    }
}

// Configuración del zoom tras cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
    const mainImage = document.getElementById('img_main');
    if (!mainImage) return;

    const container = mainImage.parentElement;

    // Alternar zoom con clic
    mainImage.addEventListener('click', (e) => {
        e.stopPropagation();
        const isZoomed = container.classList.contains('zoomed');

        if (!isZoomed) {
            container.classList.add('zoomed');
            updateZoom(e);
        } else {
            container.classList.remove('zoomed');
            mainImage.style.transform = 'scale(1)';
            mainImage.style.transformOrigin = 'center center';
        }
    });

    // Seguir el cursor durante el zoom
    container.addEventListener('mousemove', (e) => {
        if (container.classList.contains('zoomed')) {
            updateZoom(e);
        }
    });

    // Calcula la posición del zoom según el puntero
    function updateZoom(e) {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        mainImage.style.transformOrigin = `${x}% ${y}%`;
        mainImage.style.transform = 'scale(2.5)';
    }

    // Reinicia el zoom al salir del contenedor
    container.addEventListener('mouseleave', () => {
        if (container.classList.contains('zoomed')) {
            container.classList.remove('zoomed');
            mainImage.style.transform = 'scale(1)';
            mainImage.style.transformOrigin = 'center center';
        }
    });
});

// Función de compatibilidad para disparar el zoom (mantenida por seguridad)
function viewImage(src) {
    const mainImage = document.getElementById('img_main');
    if (mainImage) mainImage.click();
}

// Lógica de pestañas entre "Información" y "Galería"
document.addEventListener('DOMContentLoaded', () => {
    const productTab = document.getElementById('product-tab');
    const imagesTab = document.getElementById('images-tab');
    const imagesSection = document.getElementById('images-section');

    if (productTab && imagesTab && imagesSection) {
        // Mostrar información del producto
        productTab.addEventListener('click', () => {
            productTab.className = "px-6 py-2 text-xs md:text-sm font-medium rounded-l-lg bg-blue-600 text-white focus:z-10 focus:outline-none";
            imagesTab.className = "px-6 py-2 text-xs md:text-sm font-medium rounded-r-lg bg-gray-100 text-gray-700 focus:z-10 focus:outline-none";
            imagesSection.classList.add('hidden');
        });

        // Mostrar galería de imágenes
        imagesTab.addEventListener('click', () => {
            imagesTab.className = "px-6 py-2 text-xs md:text-sm font-medium rounded-r-lg bg-blue-600 text-white focus:z-10 focus:outline-none";
            productTab.className = "px-6 py-2 text-xs md:text-sm font-medium rounded-l-lg bg-gray-100 text-gray-700 focus:z-10 focus:outline-none";
            imagesSection.classList.remove('hidden');
        });
    }
});
