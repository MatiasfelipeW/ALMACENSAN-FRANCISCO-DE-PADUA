// Preloader corregido
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const minimumDisplayTime = 1500;
    const startTime = Date.now();
    
    function hidePreloader() {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(minimumDisplayTime - elapsed, 0);
        
        setTimeout(() => {
            preloader.classList.add('loaded');
            
            setTimeout(() => {
                preloader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        }, remaining);
    }
    
    window.addEventListener('load', function() {
        hidePreloader();
    });
    
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('loaded')) {
            hidePreloader();
        }
    }, 5000);
    
    initializeAll();
});

function initializeAll() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainMenu = document.getElementById('mainMenu');
    
    if (mobileMenuBtn && mainMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = mainMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav a, .tab-link').forEach(link => {
        link.addEventListener('click', function() {
            if (mainMenu) {
                mainMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            const tabContent = document.getElementById(`${tabId}-tab`);
            if (tabContent) {
                tabContent.classList.add('active');
            }
            
            setTimeout(() => {
                animateProductCards(tabId);
            }, 100);
        });
    });

    // Tab links from footer
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            const tabButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
            const tabContent = document.getElementById(`${tabId}-tab`);
            
            if (tabButton) tabButton.classList.add('active');
            if (tabContent) tabContent.classList.add('active');
            
            const productsSection = document.getElementById('products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            setTimeout(() => {
                animateProductCards(tabId);
            }, 100);
        });
    });

    // Inicializar productos
    generateProducts();
}

// Product data con imágenes reales
const productCategories = {
    saints: {
        items: [
            {
                name: "Virgen Milagrosa Pintada a Mano 40CM",
                description: "Hermosa imagen de la Virgen Milagrosa pintada a mano con detalles dorados.",
                price: "150.000",
                image: "MEDIA/MILAGROSA 40CM.jpeg",
                material: "Pintura a mano",
                size: "40cm",
                details: "Técnica artesanal"
            },
            {
                name: "Virgen Milagrosa en resina de 30CM",
                description: "Imagen sagrada de la Virgen de Guadalupe, patrona de América.",
                price: "100.000",
                image: "MEDIA/MILAGROSA 30CM.jpeg",
                material: "Resina",
                size: "30cm",
                details: "Acabado detallado"
            },
            {
                name: "San Jose en técnica italiana al horno 30CM",
                description: "Estatua de San José pintada a mano con detalles artesanales.",
                price: "110.000",
                image: "MEDIA/SAN JOSE 30CM.jpeg",
                material: "Cerámica italiana",
                size: "30cm",
                details: "Técnica al horno"
            },
            {
                name: "Corazón de María técnica italiana de 33CM",
                description: "Escultura del Sagrado Corazón de María con detalles artesanales.",
                price: "135.000",
                image: "MEDIA/CORAZON DE MARIA 33CM.jpeg",
                material: "Cerámica italiana",
                size: "33cm",
                details: "Técnica al horno"
            },
            {
                name: "Virgen de la salud 44CM",
                description: "Imagen de la Virgen de la Salud con detalles artesanales.",
                price: "45.000",
                image: "MEDIA/VIRGENDE LA SALUD 44CM.jpeg",
                material: "Resina pintada",
                size: "44cm",
                details: "Protección para el hogar"
            },
            {
                name: "Niño de Praga técnica italiana valor 15CM",
                description: "Representación devocional del Niño Jesús de Praga.",
                price: "120.000",
                image: "MEDIA/NIÑO DE PRAGA 15CM.jpeg",
                material: "Cerámica italiana",
                size: "15cm",
                details: "Técnica al horno"
            },
            {
                name: "Virgen de la providencia altura 20CM técnica italiana al horno",
                description: "Imagen de la Virgen de la Providencia con detalles dorados.",
                price: "100.000",
                image: "MEDIA/VIRGEN DE LA PROVIDENCIA 20CM.jpeg",
                material: "Cerámica italiana",
                size: "20cm",
                details: "Técnica al horno"
            },
            {
                name: "Ángel con arpa técnica italiana al horno",
                description: "Ángel celestial tocando el arpa, símbolo de alabanza divina.",
                price: "120.000",
                image: "MEDIA/ANGEL CON ARPA CM.jpeg",
                material: "Cerámica italiana",
                size: "25cm",
                details: "Técnica al horno"
            }
        ]
    },
    rosaries: {
        items: [
            {
                name: "Rosario Madera de Olivo",
                description: "Rosario artesanal con cuentas de madera de olivo.",
                price: "22.000",
                image: "MEDIA/rosario1.jpg",
                material: "Madera de olivo",
                size: "55cm",
                details: "Bendecido en Jerusalén"
            },
            {
                name: "Rosario de Pétalos de Rosa",
                description: "Rosario delicado con cuentas de pétalos de rosa natural.",
                price: "45.000",
                image: "MEDIA/rosario2.jpg",
                material: "Pétalos de rosa",
                size: "50cm",
                details: "Aroma natural"
            },
            {
                name: "Rosario de Cristal Swarovski",
                description: "Rosario elegante con cuentas de cristal auténtico.",
                price: "85.000",
                image: "MEDIA/rosario3.jpg",
                material: "Cristal Swarovski",
                size: "48cm",
                details: "Elegante y luminoso"
            },
            {
                name: "Rosario Infantil de Colores",
                description: "Rosario pequeño y colorido para niños.",
                price: "15.000",
                image: "MEDIA/rosario4.jpg",
                material: "Plástico resistente",
                size: "40cm",
                details: "Colorido y educativo"
            }
        ]
    },
    medals: {
        items: [
            {
                name: "Medallón de San Benito acero 13 *13CM",
                description: "Medallón protector de San Benito en acero con inscripciones sagradas.",
                price: "85.000",
                image: "MEDIA/MEDALLON SAN BEDITO 13X13.jpeg",
                material: "Acero",
                size: "13x13cm",
                details: "Protección contra el mal"
            },
            {
                name: "Medalla de San Benito",
                description: "Medalla protectora contra el mal con inscripciones sagradas.",
                price: "25.000",
                image: "MEDIA/medalla2.jpg",
                material: "Metal bañado en oro",
                size: "3cm",
                details: "Exorcismo y protección"
            },
            {
                name: "Medallón de Ángel Custodio",
                description: "Medallón con imagen del ángel de la guarda para protección diaria.",
                price: "18.000",
                image: "MEDIA/medallon.jpg",
                material: "Plata con esmalte",
                size: "3.5cm",
                details: "Para niños y adultos"
            }
        ]
    },
    amulets: {
        items: [
            {
                name: "Mano de Fátima Plata",
                description: "Amuleto de protección contra el mal de ojo en plata.",
                price: "15.000",
                image: "MEDIA/mano.jpg",
                material: "Plata 925",
                size: "2.5cm",
                details: "Contra envidias y malas energías"
            },
            {
                name: "Ojo Turco Cristal",
                description: "Protección tradicional contra energías negativas.",
                price: "12.000",
                image: "MEDIA/ojo.jpg",
                material: "Cristal azul",
                size: "2cm",
                details: "Protección contra el mal de ojo"
            },
            {
                name: "Cruz de Caravaca",
                description: "Cruz de doble travesaño con propiedades protectoras.",
                price: "18.000",
                image: "MEDIA/cruz.jpg",
                material: "Plata y esmalte",
                size: "4cm",
                details: "Protección contra maleficios"
            },
            {
                name: "Herradura de la Suerte",
                description: "Símbolo tradicional para atraer la buena fortuna.",
                price: "9.000",
                image: "MEDIA/herradura.jpg",
                material: "Metal dorado",
                size: "3cm",
                details: "Atrae prosperidad"
            }
        ]
    },
    scapulars: {
        items: [
            {
                name: "Escapulario Bordado",
                description: "Escapulario del Carmen con bordados artesanales.",
                price: "10.000",
                image: "MEDIA/escapulario.jpg",
                material: "Tela y hilos",
                size: "5x3cm",
                details: "Promesa del sábado siguiente a la muerte"
            }
        ]
    }
};

// Función para verificar si una imagen existe
function checkImageExists(url, callback) {
    const img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
}

// Generate products for each category
function generateProducts() {
    Object.keys(productCategories).forEach(category => {
        const catData = productCategories[category];
        const gridElement = document.getElementById(`${category}Grid`);
        
        if (gridElement) {
            gridElement.innerHTML = '';
            
            catData.items.forEach((product, index) => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                let badgeText = category.toUpperCase();
                if (category === 'saints') badgeText = 'SANTO';
                if (category === 'rosaries') badgeText = 'ROSARIO';
                if (category === 'medals') badgeText = 'MEDALLA';
                if (category === 'amulets') badgeText = 'AMULETO';
                if (category === 'scapulars') badgeText = 'ESCAPULARIO';
                
                productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" 
                             onerror="this.onerror=null; 
                             this.src='https://via.placeholder.com/300x200/f0e6d3/5d4c34?text=${encodeURIComponent(product.name.substring(0, 15))}'; 
                             this.style.objectFit='contain';">
                        <div class="product-badge">${badgeText}</div>
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-details">
                            <div><i class="fas fa-ruler"></i> ${product.size}</div>
                            <div><i class="fas fa-cube"></i> ${product.material}</div>
                        </div>
                        <div class="product-price">$${product.price}</div>
                        <button class="btn-add-to-cart" data-product='${JSON.stringify(product).replace(/'/g, "&#39;")}'>Añadir al Carrito</button>
                    </div>
                `;
                gridElement.appendChild(productCard);
                
                setTimeout(() => {
                    productCard.classList.add('visible');
                }, 100 + (index * 100));
            });
        }
    });
}

// Function to animate product cards
function animateProductCards(category) {
    const gridElement = document.getElementById(`${category}Grid`);
    if (gridElement) {
        const cards = gridElement.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.classList.remove('visible');
            setTimeout(() => {
                card.classList.add('visible');
            }, 100 + (index * 100));
        });
    }
}

// Add to cart functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-add-to-cart')) {
        const productDataAttr = e.target.getAttribute('data-product');
        if (!productDataAttr) return;
        
        const productData = JSON.parse(productDataAttr.replace(/&#39;/g, "'"));
        
        // Show notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--mustard-light);
            color: var(--brown-dark);
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px var(--shadow);
            z-index: 1000;
            font-weight: 600;
            border-left: 4px solid var(--mustard-medium);
            animation: slideIn 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        notification.innerHTML = `<i class="fas fa-check-circle"></i> ${productData.name} añadido al carrito`;
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
        
        // Also send WhatsApp message option
        setTimeout(() => {
            const whatsappConfirm = document.createElement('div');
            whatsappConfirm.style.cssText = `
                position: fixed;
                top: 160px;
                right: 20px;
                background: var(--beige-light);
                color: var(--brown-dark);
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 5px 15px var(--shadow);
                z-index: 999;
                border: 2px solid var(--mustard-medium);
                animation: slideIn 0.3s ease;
                max-width: 300px;
            `;
            
            whatsappConfirm.innerHTML = `
                <p style="margin-bottom: 10px; font-weight: 600;">¿Deseas pedir este producto?</p>
                <a href="https://wa.me/573008486851?text=Hola,%20me%20interesa%20el%20producto:%20${encodeURIComponent(productData.name)}%20por%20$${productData.price}" 
                   target="_blank" 
                   style="display: inline-block; background: #25d366; color: white; padding: 8px 15px; border-radius: 5px; text-decoration: none; font-weight: 600;">
                    <i class="fab fa-whatsapp"></i> Pedir por WhatsApp
                </a>
                <button id="closeWhatsappConfirm" style="background: none; border: none; color: var(--brown-light); position: absolute; top: 5px; right: 10px; font-size: 1.2rem; cursor: pointer;">×</button>
            `;
            
            document.body.appendChild(whatsappConfirm);
            
            const closeBtn = document.getElementById('closeWhatsappConfirm');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    whatsappConfirm.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => {
                        if (whatsappConfirm.parentNode) {
                            document.body.removeChild(whatsappConfirm);
                        }
                    }, 300);
                });
            }
            
            // Auto-remove after 10 seconds
            setTimeout(() => {
                if (whatsappConfirm.parentNode) {
                    whatsappConfirm.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => {
                        if (whatsappConfirm.parentNode) {
                            document.body.removeChild(whatsappConfirm);
                        }
                    }, 300);
                }
            }, 10000);
        }, 1000);
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.classList.contains('tab-link')) return;
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Set active menu item based on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Initialize with first tab active and animate its cards
setTimeout(() => {
    const firstTabButton = document.querySelector('.tab-button.active');
    if (firstTabButton) {
        const firstTabId = firstTabButton.getAttribute('data-tab');
        animateProductCards(firstTabId);
    }
}, 1000);