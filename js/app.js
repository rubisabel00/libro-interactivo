document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos
    const tabs = document.querySelectorAll('.tab');
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const menuToggle = document.querySelector('.menu-toggle');
    const tabsContainer = document.querySelector('.tabs');
    const currentPageTitle = document.querySelector('.current-page-title');
    
    // Variables de estado
    let currentPageIndex = 0;
    const pageIds = Array.from(pages).map(page => page.id);
    
    // Inicializar animaciones de pestañas
    setTimeout(() => {
        tabs.forEach((tab, index) => {
            setTimeout(() => {
                tab.style.animationPlayState = 'running';
            }, index * 100);
        });
    }, 500);
    
    // Función para actualizar la navegación
    function updateNavigation() {
        prevBtn.disabled = currentPageIndex === 0;
        nextBtn.disabled = currentPageIndex === pages.length - 1;
        
        // Actualizar título de página actual en móvil
        if (currentPageIndex === 0) {
            currentPageTitle.textContent = 'Portada';
        } else {
            const activePage = document.querySelector('.page.active');
            if (activePage && activePage.querySelector('h2')) {
                currentPageTitle.textContent = activePage.querySelector('h2').textContent;
            } else {
                currentPageTitle.textContent = 'CSS3';
            }
        }
    }
    
    // Función para cambiar de página
    function changePage(index) {
        // Ocultar página actual
        pages[currentPageIndex].classList.remove('active');
        
        // Mostrar nueva página
        currentPageIndex = index;
        pages[currentPageIndex].classList.add('active');
        
        // Actualizar navegación
        updateNavigation();
        
        // Cerrar menú móvil si está abierto
        if (tabsContainer.classList.contains('active')) {
            tabsContainer.classList.remove('active');
        }
        
        // Scroll al inicio de la página
        pages[currentPageIndex].querySelector('.page-content').scrollTop = 0;
    }
    
    // Event listeners para pestañas
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const targetPage = document.getElementById(category);
            
            if (targetPage) {
                const index = Array.from(pages).indexOf(targetPage);
                changePage(index);
            }
        });
    });
    
    // Event listeners para botones de navegación
    prevBtn.addEventListener('click', function() {
        if (currentPageIndex > 0) {
            changePage(currentPageIndex - 1);
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentPageIndex < pages.length - 1) {
            changePage(currentPageIndex + 1);
        }
    });
    
    // Event listener para menú móvil
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            tabsContainer.classList.toggle('active');
        });
    }
    
    // Event listeners para ejemplos interactivos
    
    // Ejemplo de width
    const widthExample = document.querySelector('.width-example');
    if (widthExample) {
        widthExample.addEventListener('click', function() {
            const currentWidth = parseInt(getComputedStyle(this).width);
            if (currentWidth === 200) {
                this.style.width = '300px';
            } else {
                this.style.width = '200px';
            }
        });
    }
    
    // Ejemplo de height
    const heightExample = document.querySelector('.height-example');
    if (heightExample) {
        heightExample.addEventListener('click', function() {
            const currentHeight = parseInt(getComputedStyle(this).height);
            if (currentHeight === 100) {
                this.style.height = '150px';
            } else {
                this.style.height = '100px';
            }
        });
    }
    
    // Ejemplo de margin
    const marginExample = document.querySelector('.margin-example');
    if (marginExample) {
        marginExample.addEventListener('click', function() {
            const currentMargin = parseInt(getComputedStyle(this).margin);
            if (currentMargin === 20) {
                this.style.margin = '40px';
            } else {
                this.style.margin = '20px';
            }
        });
    }
    
    // Ejemplo de padding
    const paddingExample = document.querySelector('.padding-example');
    if (paddingExample) {
        paddingExample.addEventListener('click', function() {
            const currentPadding = parseInt(getComputedStyle(this).padding);
            if (currentPadding === 10) {
                this.style.padding = '30px';
            } else {
                this.style.padding = '10px';
            }
        });
    }
    
    // Ejemplo de color de fondo
    const bgColorExample = document.querySelector('.bg-color-example');
    if (bgColorExample) {
        bgColorExample.addEventListener('click', function() {
            const currentColor = getComputedStyle(this).backgroundColor;
            if (currentColor === 'rgb(52, 152, 219)') {
                this.style.backgroundColor = '#e74c3c';
            } else {
                this.style.backgroundColor = '#3498db';
            }
        });
    }
    
    // Ejemplo de posición de fondo
    const bgPositionExample = document.querySelector('.bg-position-example');
    if (bgPositionExample) {
        bgPositionExample.addEventListener('click', function() {
            const positions = ['center', 'top left', 'top right', 'bottom left', 'bottom right'];
            const currentPosition = getComputedStyle(this).backgroundPosition;
            let nextIndex = positions.indexOf(currentPosition) + 1;
            if (nextIndex >= positions.length) nextIndex = 0;
            this.style.backgroundPosition = positions[nextIndex];
        });
    }
    
    // Ejemplo de grid
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('active-grid-item');
        });
    });
    
    // Inicializar tooltips para ejemplos
    const exampleElements = document.querySelectorAll('[title]');
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.style.opacity = '0';
    document.body.appendChild(tooltip);
    
    exampleElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
            const title = this.getAttribute('title');
            if (title) {
                this.removeAttribute('title');
                this.dataset.title = title;
                tooltip.textContent = title;
                tooltip.style.opacity = '1';
                updateTooltipPosition(e);
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.dataset.title) {
                this.setAttribute('title', this.dataset.title);
                delete this.dataset.title;
                tooltip.style.opacity = '0';
            }
        });
        
        element.addEventListener('mousemove', updateTooltipPosition);
    });
    
    function updateTooltipPosition(e) {
        const x = e.clientX + 10;
        const y = e.clientY + 10;
        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }
    
    // Inicializar navegación
    updateNavigation();
    
    // Detectar cambios de tamaño de ventana para ejemplos responsivos
    window.addEventListener('resize', function() {
        const mediaQueryExample = document.querySelector('.media-query-example');
        if (mediaQueryExample) {
            const width = window.innerWidth;
            let text = 'Ancho actual: ' + width + 'px - ';
            
            if (width <= 600) {
                text += 'Pantalla pequeña (rojo)';
            } else if (width <= 900) {
                text += 'Pantalla mediana (verde)';
            } else {
                text += 'Pantalla grande (azul)';
            }
            
            const p = mediaQueryExample.querySelector('p');
            if (p) p.textContent = text;
        }
    });
    
    // Disparar evento resize para inicializar ejemplos responsivos
    window.dispatchEvent(new Event('resize'));
    
    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            if (currentPageIndex > 0) {
                changePage(currentPageIndex - 1);
            }
        } else if (e.key === 'ArrowRight') {
            if (currentPageIndex < pages.length - 1) {
                changePage(currentPageIndex + 1);
            }
        }
    });
});