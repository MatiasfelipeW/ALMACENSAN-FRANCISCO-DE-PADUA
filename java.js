// ========== FUNCIÓN PARA MANEJAR LA ALERTA DE CONSTRUCCIÓN ==========
function initializeConstructionAlert() {
    const alertElement = document.getElementById('constructionAlert');
    const closeButton = document.getElementById('closeAlert');
    
    // Verificar si el usuario ya cerró la alerta anteriormente
    const alertClosed = localStorage.getItem('constructionAlertClosed');
    
    if (alertClosed === 'true') {
        alertElement.classList.add('hidden');
        document.body.style.paddingTop = '0';
    }
    
    // Evento para cerrar la alerta
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            alertElement.classList.add('hidden');
            document.body.style.paddingTop = '0';
            
            // Guardar en localStorage que el usuario cerró la alerta
            localStorage.setItem('constructionAlertClosed', 'true');
        });
    }
    
    // Cerrar automáticamente después de 30 segundos si el usuario no interactúa
    setTimeout(() => {
        if (!alertElement.classList.contains('hidden')) {
            alertElement.style.opacity = '0.7';
        }
    }, 25000);
    
    setTimeout(() => {
        if (!alertElement.classList.contains('hidden')) {
            alertElement.classList.add('hidden');
            document.body.style.paddingTop = '0';
            
            // No guardamos en localStorage para que vuelva a aparecer en la próxima visita
        }
    }, 30000);
}

// ========== INICIALIZAR EFECTOS CELESTIALES SUAVES ==========
function initializeCelestialEffects() {
    const celestialBackground = document.getElementById('celestialBackground');
    if (!celestialBackground) return;
    
    // Crear partículas de luz flotantes
    for (let i = 0; i < 8; i++) { // Solo 8 partículas para ser sutiles
        const particle = document.createElement('div');
        particle.className = 'light-particle';
        
        // Posición aleatoria
        const posX = Math.random() * 100;
        const size = Math.random() * 3 + 2; // 2px a 5px
        const moveX = Math.random() * 0.2 - 0.1; // Movimiento horizontal leve
        const duration = Math.random() * 10 + 15; // 15s a 25s
        const delay = Math.random() * 10; // 0s a 10s
        
        particle.style.left = `${posX}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.setProperty('--move-x', moveX);
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        celestialBackground.appendChild(particle);
    }
    
    // Crear rayos de luz sutiles
    for (let i = 0; i < 3; i++) { // Solo 3 rayos para ser sutiles
        const ray = document.createElement('div');
        ray.className = 'light-ray';
        
        const posX = Math.random() * 100;
        const duration = Math.random() * 15 + 20; // 20s a 35s
        const delay = Math.random() * 15; // 0s a 15s
        
        ray.style.left = `${posX}%`;
        ray.style.animationDuration = `${duration}s`;
        ray.style.animationDelay = `${delay}s`;
        
        celestialBackground.appendChild(ray);
    }
    
    // Crear estrellas decorativas flotantes
    for (let i = 0; i < 5; i++) {
        const star = document.createElement('div');
        star.className = 'star-decoration';
        star.innerHTML = '★';
        
        const posX = Math.random() * 100;
        const fontSize = Math.random() * 1 + 1; // 1rem a 2rem
        const duration = Math.random() * 30 + 40; // 40s a 70s
        const delay = Math.random() * 20; // 0s a 20s
        
        star.style.left = `${posX}%`;
        star.style.fontSize = `${fontSize}rem`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;
        
        celestialBackground.appendChild(star);
    }
}

// ========== INICIALIZAR CARRUSEL DE FONDO CORREGIDO ==========
function initializeCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    const slideInterval = 5000; // Cambiar cada 5 segundos
    
    if (slides.length === 0) return;
    
    // Función para mostrar un slide específico
    function showSlide(n) {
        // Ocultar todos los slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remover clase active de todos los dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Mostrar el slide actual
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Inicializar el primer slide
    showSlide(0);
    
    // Configurar intervalo para cambio automático
    let slideTimer = setInterval(() => {
        showSlide(currentSlide + 1);
    }, slideInterval);
    
    // Añadir event listeners a los dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
            // Reiniciar el temporizador
            clearInterval(slideTimer);
            slideTimer = setInterval(() => {
                showSlide(currentSlide + 1);
            }, slideInterval);
        });
    });
    
    // Pausar el carrusel cuando el mouse está sobre la sección de productos
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.addEventListener('mouseenter', () => {
            clearInterval(slideTimer);
        });
        
        productsSection.addEventListener('mouseleave', () => {
            clearInterval(slideTimer);
            slideTimer = setInterval(() => {
                showSlide(currentSlide + 1);
            }, slideInterval);
        });
    }
}

// Product data con imágenes reales - MODIFICADO PARA INCLUIR OBJETOS LITÚRGICOS
const productCategories = {
    saints: {
        items: [
            {
                name: "Virgen Milagrosa ",
                description: "Virgen de las gracias y los milagros.",
                price: "150.000",
                image: "MEDIA/MILAGROSA 40CM.jpeg",
                material: "Pintura a mano",
                size: "40cm",
                details: "Técnica artesanal"
            },
            {
                name: "Virgen Milagrosa ",
                description: "Virgen de las gracias y los milagros.",
                price: "100.000",
                image: "MEDIA/MILAGROSA 30CM.jpeg",
                material: "Resina",
                size: "30cm",
                details: "Acabado detallado"
            },
            {
                name: "San Jose ",
                description: "Patrono de la Iglesia universal y padre adoptivo de Jesús.",
                price: "110.000",
                image: "MEDIA/SAN JOSE 30CM.jpeg",
                material: "Cerámica italiana",
                size: "30cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Corazón de María ",
                description: "Símbolo del amor y pureza de la Madre de Dios.",
                price: "135.000",
                image: "MEDIA/CORAZON DE MARIA 33CM.jpeg",
                material: "Cerámica italiana",
                size: "33cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen de la salud ",
                description: "Abogada de los enfermos y protectora de la salud.",
                price: "45.000",
                image: "MEDIA/VIRGENDE LA SALUD 44CM.jpeg",
                material: "Resina pintada",
                size: "44cm",
                details: "Protección para el hogar"
            },
            {
                name: "Niño de Praga",
                description: "Representación del Niño Jesús Rey y soberano.",
                price: "120.000",
                image: "MEDIA/NIÑO DE PRAGA 15CM.jpeg",
                material: "Cerámica italiana",
                size: "15cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen de la providencia",
                description: "Madre de la divina providencia y el cuidado maternal.",
                price: "100.000",
                image: "MEDIA/VIRGEN DE LA PROVIDENCIA 20CM.jpeg",
                material: "Cerámica italiana",
                size: "20cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Ángel con arpa ",
                description: "Ángel celestial que alaba a Dios con música.",
                price: "120.000",
                image: "MEDIA/ANGEL CON ARPA CM.jpeg",
                material: "Cerámica italiana",
                size: "25cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Anunciacion",
                description: "Momento en que el Ángel Gabriel anuncia a María.",
                price: "200.000",
                image: "MEDIA/ANUNCIACION 30CM.jpeg",
                material: "Cerámica italiana",
                size: "30cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Pastor",
                description: "Representación del buen pastor que cuida su rebaño.",
                price: "120.000",
                image: "MEDIA/PASTOR.jpeg",
                material: "Cerámica italiana",
                size: "25cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Pastor con niño Dios",
                description: "Pastor que carga al Niño Jesús en sus brazos.",
                price: "80.000",
                image: "MEDIA/PASTOR NIÑO DIOS.jpeg",
                material: "Cerámica italiana",
                size: "34cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Santa zita",
                description: "Patrona de las sirvientas y trabajadoras domésticas.",
                price: "70.000",
                image: "MEDIA/SANTA ZITA.jpeg",
                material: "Cerámica italiana",
                size: "27cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Santa Lucía",
                description: "Mártir patrona de la vista y los ojos.",
                price: "80.000",
                image: "MEDIA/SANTA LUCIA.jpeg",
                material: "Cerámica italiana",
                size: "23cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Santa Marta",
                description: "Patrona de los chefs, sirvientes y amas de casa.",
                price: "80.000",
                image: "MEDIA/SANTA MARTA.jpeg",
                material: "Cerámica italiana",
                size: "25cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Arcangel Rafael",
                description: "Arcángel sanador y protector de los viajeros.",
                price: "90.000",
                image: "MEDIA/ARCANGEL RAFAEL.jpeg",
                material: "Cerámica italiana",
                size: "25cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Arcangel Uriel",
                description: "Arcángel de la sabiduría y la iluminación divina.",
                price: "90.000",
                image: "MEDIA/ARCANGEL URIEL.jpeg",
                material: "Cerámica italiana",
                size: "25cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Arcángel zadquiel",
                description: "Arcángel de la misericordia y la transformación.",
                price: "80.000",
                image: "MEDIA/ARCANGEL ZADQUIEL.jpeg",
                material: "Cerámica italiana",
                size: "25cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen Rosa mística",
                description: "Aparición mariana que invoca la penitencia y oración.",
                price: "90.000",
                image: "MEDIA/VIRGEN ROSA MISTICA.jpeg",
                material: "Cerámica italiana",
                size: "25cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen de la Piedad",
                description: "María sosteniendo a Jesús después de la crucifixión.",
                price: "90.000",
                image: "MEDIA/VIRGEN DE LA PIEDAD.jpeg",
                material: "Cerámica italiana",
                size: "23cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen del valle",
                description: "Patrona del oriente venezolano y los pescadores.",
                price: "90.000",
                image: "MEDIA/VIRDEN DEL VALLE.jpeg",
                material: "Cerámica italiana",
                size: "25cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Buen pastor",
                description: "Jesús como el pastor que da la vida por sus ovejas.",
                price: "100.000",
                image: "MEDIA/BUEN PASTOR.jpeg",
                material: "Cerámica italiana",
                size: "25cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Señor de la misericordia",
                description: "Cristo misericordioso que perdona y acoge.",
                price: "110.000",
                image: "MEDIA/SEÑOR DE LA MISERICORDIA.jpeg",
                material: "Cerámica italiana",
                size: "33cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Arcangel San Miguel",
                description: "Príncipe de los arcángeles, defensor contra el mal.",
                price: "180.000",
                image: "MEDIA/ARCANGEL SAN MIGUEL.jpeg",
                material: "Cerámica italiana",
                size: "38cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Arcangel Metatron",
                description: "Arcángel de la sabiduría y escriba celestial.",
                price: "150.000",
                image: "MEDIA/ARCANGEL METATRON.jpeg",
                material: "Cerámica italiana",
                size: "28cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen de la Salud",
                description: "Protectora de la salud y consuelo de los enfermos.",
                price: "68.000",
                image: "MEDIA/VIRGEN DE LA SALUD.jpeg",
                material: "Cerámica italiana",
                size: "22cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "San Francisco de Asís ",
                description: "Santo de la pobreza, paz y amor a la naturaleza.",
                price: "100.000",
                image: "MEDIA/SAN FRANCISCO DE ASIS.jpeg",
                material: "Cerámica italiana",
                size: "23cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen de la Primavera ",
                description: "Símbolo de renovación y nueva vida en Cristo.",
                price: "80.000",
                image: "MEDIA/VIRGEN DE LA PRIMAVERA.jpeg",
                material: "Cerámica italiana",
                size: "25cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen María Auxiliadora ",
                description: "Auxilio de los cristianos y protectora de la Iglesia.",
                price: "90.000",
                image: "MEDIA/VIRGEN MARIA AUXILIADORA.jpeg",
                material: "Cerámica italiana",
                size: "30cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen de aranzazu ",
                description: "Patrona de Guipúzcoa y los montañeros vascos.",
                price: "130.000",
                image: "MEDIA/VIRGEN DE ARANSAZU.jpeg",
                material: "Cerámica italiana",
                size: "43cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Santa Ana ",
                description: "Madre de la Virgen María y abuela de Jesús.",
                price: "120.000",
                image: "MEDIA/SANTA ANA.jpeg",
                material: "Cerámica italiana",
                size: "30cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen de Loreto",
                description: "Patrona de los aviadores y las casas santas.",
                price: "120.000",
                image: "MEDIA/VIRDEN DE LORETO.jpeg",
                material: "Cerámica italiana",
                size: "28cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "San Jose",
                description: "Esposo de María y custodio de la Sagrada Familia.",
                price: "100.000",
                image: "MEDIA/SAN JOSE.jpeg",
                material: "Cerámica italiana",
                size: "28cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen del Cojin",
                description: "Representación íntima de la Virgen en reposo.",
                price: "70.000",
                image: "MEDIA/VIRGEN DEL COJIN.jpeg",
                material: "Cerámica italiana",
                size: "18cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen del Coromoto",
                description: "Patrona de Venezuela, aparición en Guanare.",
                price: "85.000",
                image: "MEDIA/VIRGEN DEL COROMOTO.jpeg",
                material: "Cerámica italiana",
                size: "23cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo de Ascensión de la virgen",
                description: "Ascensión de María al cielo en cuerpo y alma.",
                price: "120.000",
                image: "MEDIA/RETRATO ACSENSION DE LA VIRGEN.jpeg",
                material: "Cerámica italiana",
                size: "25cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo de María reina",
                description: "María como reina del cielo y de la tierra.",
                price: "130.000",
                image: "MEDIA/RETABLO DE MARIA REINA.jpeg",
                material: "Cerámica italiana",
                size: "130*40cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo de arcángel San Miguel",
                description: "San Miguel arcángel venciendo al demonio.",
                price: "120.000",
                image: "MEDIA/RETABLO DE ARCANGEL SAN MIGUEL.jpeg",
                material: "Cerámica italiana",
                size: "40*20cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo del arcángel San Rafael ",
                description: "Arcángel sanador y guía de los viajeros.",
                price: "120.000",
                image: "MEDIA/RETABLO DE ARCANGEL SAN RAFAEL.jpeg",
                material: "Cerámica italiana",
                size: "48*20cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo santísima Trinidad ",
                description: "Padre, Hijo y Espíritu Santo en unidad divina.",
                price: "120.000",
                image: "MEDIA/RETABLO SANTISIMA TRINIDAD.jpeg",
                material: "Cerámica italiana",
                size: "27*27cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo Madonna",
                description: "Representación clásica de la Virgen María.",
                price: "130.000",
                image: "MEDIA/RETABLO MADONA.jpeg",
                material: "Cerámica italiana",
                size: "33*28cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo virgen de Lourdes",
                description: "Aparición mariana en la gruta de Massabielle.",
                price: "130.000",
                image: "MEDIA/RETABLO VIRGEN DE LOURDES.jpeg",
                material: "Cerámica italiana",
                size: "38*18cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Aplique Madonna",
                description: "Medallón de la Virgen María para pared.",
                price: "70.000",
                image: "MEDIA/APLIQUE MADONNA.jpeg",
                material: "Cerámica italiana",
                size: "22*11cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Aplique Rosa mística",
                description: "Medallón de la Rosa Mística para decoración.",
                price: "65.000",
                image: "MEDIA/APLIQUE ROSA MISTICA.jpeg ",
                material: "Cerámica italiana",
                size: "24*9cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Aplique virgen del Carmen ",
                description: "Medallón de la Virgen del Monte Carmelo.",
                price: "70.000",
                image: "MEDIA/APLIQUE VIRGEN DEL CARMEN.jpeg",
                material: "Cerámica italiana",
                size: "20*14cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Aplique niño Jesús",
                description: "Medallón del Niño Dios para devoción familiar.",
                price: "70.000",
                image: "MEDIA/APLIQUE NIÑO DE JESUS.jpeg",
                material: "Cerámica italiana",
                size: "20*12cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo virgen de Fátima",
                description: "Aparición mariana a los pastorcitos de Portugal.",
                price: "150.000",
                image: "MEDIA/RETABLO VIRGEN DE FATIMA.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo del Tao de San Francisco de Asís",
                description: "San Francisco en meditación y oración.",
                price: "120.000",
                image: "MEDIA/RETABLO DEL TAO DE SAN FRANCISCO.jpeg",
                material: "Cerámica italiana",
                size: "24*20cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo Madonna clasico",
                description: "Representación tradicional de la Madre de Dios.",
                price: "110.000",
                image: "MEDIA/RETABLO MADONNA CLASICA.jpeg",
                material: "Cerámica italiana",
                size: "24*16cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo ultima cena",
                description: "Última cena de Jesús con sus apóstoles.",
                price: "130.000",
                image: "MEDIA/RETABLO ULTIMA CENA.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo San Rafael ",
                description: "Arcángel protector y guía de los caminantes.",
                price: "80.000",
                image: "MEDIA/RETABLO SAN RAFAEL.jpeg",
                material: "Cerámica italiana",
                size: "30*16cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Niño Dios canasta ",
                description: "Niño Jesús en canasta, símbolo de humildad.",
                price: "120.000",
                image: "MEDIA/NIÑO DIOS EN CANASTA.jpeg",
                material: "Cerámica italiana",
                size: "28cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "San José estilizado",
                description: "Representación moderna del padre adoptivo de Jesús.",
                price: "170.000",
                image: "MEDIA/SAN JOSE ESTILIZADO.jpeg",
                material: "Cerámica italiana",
                size: "50cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Sueño de Jesús ",
                description: "Niño Jesús durmiendo plácidamente.",
                price: "120.000",
                image: "MEDIA/SUEÑO DE JESUS.jpeg",
                material: "Cerámica italiana",
                size: "23cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Cristo San Benito ",
                description: "Cristo bendito representado con devoción.",
                price: "130.000",
                image: "MEDIA/CRISTO BENDITO.jpeg",
                material: "Cerámica italiana",
                size: "50*30cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Cristo en Cruz",
                description: "Jesucristo crucificado, sacrificio por la humanidad.",
                price: "110.000",
                image: "MEDIA/CRISTO EN LA RUZ.jpeg ",
                material: "Cerámica italiana",
                size: "49*25",
                details: "Técnica italiana al horno"
            },
            {
                name: "Cruz de San Damián",
                description: "Cruz que habló a San Francisco de Asís.",
                price: "100.000",
                image: "MEDIA/CRUZ DE SAN DAMIAN.jpeg   ",
                material: "Cerámica italiana",
                size: "28*20cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo Guadalupe ",
                description: "Virgen de Guadalupe, emperatriz de América.",
                price: "120.000",
                image: "MEDIA/RETABLO GUADALUPE.jpeg",
                material: "Cerámica italiana",
                size: "30*26cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Ángel de la lechuga ",
                description: "Ángel que sostiene una lechuga, símbolo de prosperidad.",
                price: "90.000",
                image: "MEDIA/ANGEL DE LA LECHUGA.jpeg",
                material: "Cerámica italiana",
                size: "35*20cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo sagrada familia de pared ",
                description: "Jesús, María y José, modelo de familia cristiana.",
                price: "00.000",
                image: "MEDIA/RETABLO SAGRADA FAMILIA DE PARED.jpeg",
                material: "Cerámica italiana",
                size: "29*15cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Arcangeles niños x unidad",
                description: "Arcángeles en representación infantil.",
                price: "40.000",
                image: "MEDIA/ACRCANGELES NIÑOS.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen Rosa mística con vestido ",
                description: "Rosa Mística con vestido decorado.",
                price: "160.000",
                image: "MEDIA/VIRGEN ROSA MISTICA CON VESTIDO.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Cristo eucarístico",
                description: "Jesús en la Eucaristía, pan de vida eterna.",
                price: "45.000",
                image: "MEDIA/CRISTO EUCARISTICO.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen María Auxiliadora",
                description: "María auxiliadora en versión dorada.",
                price: "60.000",
                image: "MEDIA/VIRGEN MARIA AUXILIADORA DORADA.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo Lourdes",
                description: "Virgen de Lourdes en su gruta milagrosa.",
                price: "100.000",
                image: "MEDIA/RETABLO LIURDES.jpeg",
                material: "Cerámica italiana",
                size: "42*27cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Retablo Jesús con niños",
                description: "Jesús bendiciendo a los niños.",
                price: "85.000",
                image: "MEDIA/RETABLO JESUS CON NIÑO DIOS.jpeg",
                material: "Cerámica italiana",
                size: "21*12cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Teresa de Ávila ",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "90.000",
                image: "MEDIA/TERESA DE AVILA.jpeg",
                material: "Cerámica italiana",
                size: "30cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen María Auxiliadora",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "110.000",
                image: "MEDIA/VIRGEN MARIA AUXILIADORA 3.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "San Antonio",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "86.000",
                image: "MEDIA/SAN ANTONIO.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen polaca",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "86.000",
                image: "MEDIA/VIRGEN POLACA.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Juan Diego",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "85.000",
                image: "MEDIA/JUAN DIEGO.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen de la leche",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "80.000",
                image: "MEDIA/VIRGEN DE LA LECHE.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen estrella del mar ",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "85.000",
                image: "MEDIA/VIRGEN ESTRELLA DEL MAR.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "San Patrick ",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "88.000",
                image: "MEDIA/SAN PATRICK.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "San Pedro ",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "90.000",
                image: "MEDIA/SAN PEDRO.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Santa Inés ",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "80.000",
                image: "MEDIA/SAN INES.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen de Fátima",
                description: "Representación del Cristo de San Juan de la Cruz.",
                price: "350.000",
                image: "MEDIA/VIRGEN DE FATIMA.jpeg",
                material: "Fibra",
                size: "30cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Arcángel San Miguel en acrílico ",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "350.000",
                image: "MEDIA/ARCANGEL SAN MIGUEL EN ACRILICO.jpeg",
                material: "Acrilico",
                size: "30cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen Guadalupe",
                description: "Representación del Cristo de San Juan de la Cruz.",
                price: "250.000",
                image: "MEDIA/VIRGEN DE GUADALUPE POLICERAMICA.jpeg",
                material: "Policeramica",
                size: "30cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "San Miguel arcángel ",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "250.000",
                image: "MEDIA/SAN MIGUEL ARCANGEL POLICERAMICA.jpeg",
                material: "Policeramica",
                size: "30cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Cristo trinitario",
                description: "Representación del Cristo de San Juan de la Cruz.",
                price: "70.000",
                image: "MEDIA/CRISTO TRINITARIO.jpeg",
                material: "Cerámica italiana",
                size: "cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Arcángel San Miguel",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "160.000",
                image: "MEDIA/ARCANGEL SAN MIGUEL POLICERAMICA.jpeg",
                material: "Policerámica ",
                size: "30 cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Arcángel San Gabriel",
                description: "Representación del Cristo de San Juan de la Cruz.",
                price: "150.000",
                image: "MEDIA/ARCANGEL SAN GABRIEL POLICERAMICA.jpeg",
                material: "Policeramica",
                size: "30cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Arcángel San  Rafael  ",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "150.000",
                image: "MEDIA/ARCANGEL SAN RAFAEL POLICERAMICA.jpeg",
                material: "Policeramica",
                size: "30cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Carlo acutis",
                description: "Representación del Cristo de San Juan de la Cruz.",
                price: "60.000",
                image: "MEDIA/CARLOS ACUTIS.jpeg",
                material: "Cerámica italiana",
                size: "5 Pulgadas",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen de Guadalupe",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "120.000",
                image: "MEDIA/VIRGEN DE GUADALUPE POLICERAMICA 2.jpeg",
                material: "Policeramica",
                size: "15cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Milagroso de buga",
                description: "Representación del Cristo de San Juan de la Cruz.",
                price: "40.000",
                image: "MEDIA/MILAGROSO DE BUGA.jpeg",
                material: "pPoliceramica",
                size: "5 Pulgadas",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen del Rosario ",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "120.000",
                image: "MEDIA/VIRGEN DEL ROSARIO POLICERAMICA.jpeg",
                material: "Policeramica",
                size: "15cm",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen María reina de la paz ",
                description: "Representación del Cristo de San Juan de la Cruz.",
                price: "140.000",
                image: "MEDIA/VIRGEN MARIA REINA DE LA PAZ POLICERAMICA.jpeg",
                material: "Policeramica",
                size: "15 Pulgadas",
                details: "Técnica italiana al horno"
            },
            {
                name: "Beso de San José",
                description: "Doctora de la Iglesia y reformadora carmelita.",
                price: "160.000",
                image: "MEDIA/BESO DE SAN JOSE.jpeg",
                material: "Policeramica",
                size: "20 Pulgadas",
                details: "Técnica italiana al horno"
            },
            {
                name: "Virgen del Carmen",
                description: "Representación del Cristo de San Juan de la Cruz.",
                price: "140.000",
                image: "MEDIA/VIRGEN DEL CARMEN POLICERAMICA.jpeg",
                material: "Policeramica",
                size: "30cm",
                details: "Técnica italiana al horno"
            }
        ]
    },
    rosaries: {
        items: [
            {
                name: "Rosario novena de San Jose",
                description: "Rosario artesanal con cuentas de madera de olivo traída de Tierra Santa, bendecido en Jerusalén.",
                price: "15.000",
                image: "MEDIA/ROSARIO NOVENA A SAN JOSE.jpeg",
                material: "Madera de olivo",
                size: "cm",
                details: "Bendecido en Jerusalén"
            },
            {
                name: "Denario de San José ",
                description: "Rosario delicado con cuentas de pétalos de rosa natural prensados, con aroma suave y duradero.",
                price: "12.000",
                image: "MEDIA/DENARIO DE SAN JOSE.jpeg",
                material: "Pétalos de rosa",
                size: "cm",
                details: "Aroma natural"
            },
            {
                name: "Rosario de Cristal Swarovski",
                description: "Rosario elegante con cuentas de cristal Swarovski auténtico que refleja la luz divinamente.",
                price: "85.000",
                image: "MEDIA/rosario3.jpg",
                material: "Cristal Swarovski",
                size: "48cm",
                details: "Elegante y luminoso"
            }
        ]
    },
    medals: {
        items: [
            {
                name: "Medallón de San Benito acero ",
                description: "Medallón protector de San Benito en acero inoxidable con todas las inscripciones sagradas para protección espiritual.",
                price: "85.000",
                image: "MEDIA/MEDALLON SAN BEDITO 13X13.jpeg",
                material: "Acero",
                size: "13x13cm",
                details: "Protección contra el mal"
            },
            {
                name: "Medalla de San Benito",
                description: "Medalla protectora contra el mal con inscripciones sagradas de exorcismo, bañada en oro de 18k.",
                price: "80.000",
                image: "MEDIA/MEDALLON DE SAN BENITO.jpeg",
                material: "Metal bañado en oro",
                size: "3cm",
                details: "Exorcismo y protección"
            },
            {
                name: "Medallón de Ángel Custodio",
                description: "Medallón con imagen del ángel de la guarda para protección diaria de niños y adultos.",
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
                name: "Amuleto de San Miguel arcánge",
                description: "Amuleto de protección contra el mal de ojo elaborado en plata 925, símbolo de protección divina.",
                price: "25.000",
                image: "MEDIA/AMULETO SAN MIGUEL.png",
                material: "",
                size: "",
                details: "Contra envidias y malas energías"
            },
            {
                name: "Pulsera de San Miguel arcángel con novena",
                description: "Protección tradicional contra energías negativas y mal de ojo, en cristal azul auténtico.",
                price: "15.000",
                image: "MEDIA/PULSERA DE SAN MIGUEL ARCANGEL CON NOVENA.jpeg",
                material: "Cristal azul",
                size: "",
                details: "Protección contra el mal de ojo"
            },
            {
                name: "Escudo de fe",
                description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.",
                price: "40.000",
                image: "MEDIA/ECUDO DE FE.jpeg",
                material: "Plata y esmalte",
                size: "cm",
                details: "Protección contra maleficios"
            },
            {
                name: "Escudo de fe",
                description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.",
                price: "40.000",
                image: "MEDIA/ESCUDO DE FE 2.jpeg",
                material: "Plata y esmalte",
                size: "cm",
                details: "Protección contra maleficios"
            },
            {
                name: "Llavero divina protección",
                description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.",
                price: "69.000",
                image: "MEDIA/LLAVERO DIVINA PROTECCION.jpeg",
                material: "Plata y esmalte",
                size: "cm",
                details: "Protección contra maleficios"
            },
            {
                name: "Llavero bendición del hogar",
                description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.",
                price: "80.000",
                image: "MEDIA/LLAVERO BENDICION DEL HOGAR.jpeg",
                material: "Plata y esmalte",
                size: "cm",
                details: "Protección contra maleficios"
            },
            {
                name: "Pulsera de protección del sagrado corazón",
                description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.",
                price: "40.000",
                image: "MEDIA/PULSERA DE PROTECCION DEL SAGRADO CORAZON.jpeg",
                material: "Plata y esmalte",
                size: "cm",
                details: "Protección contra maleficios"
            },
            {
                name: "Pulsera milagrosa",
                description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.",
                price: "40.000",
                image: "MEDIA/PULSERA MILAGROSA.jpeg",
                material: "",
                size: "cm",
                details: "Protección contra maleficios"
            },
            {
                name: "Bendición para el hogar",
                description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.",
                price: "50.000",
                image: "MEDIA/BENDICION PARA EL HOGAR.jpeg",
                material: "P",
                size: "cm",
                details: "Protección contra maleficios"
            },
            {
                name: "Llavero  San Benito",
                description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.",
                price: "50.000",
                image: "MEDIA/LLAVERO DE SAN BENITO.jpeg",
                material: "",
                size: "cm",
                details: "Protección contra maleficios"
            }
        ]
    },
    scapulars: {
        items: [
            {
                name: "Pulsera con escapulario",
                description: "Escapulario del Carmen con bordados artesanales, promesa de salvación el sábado siguiente a la muerte.",
                price: "25.000",
                image: "MEDIA/PULSERA CON ESCAPULARIO.jpeg",
                material: "",
                size: "",
                details: "Promesa del sábado siguiente a la muerte"
            }
        ]
    },
    // NUEVA SECCIÓN: OBJETOS LITÚRGICOS
    liturgical: {
        items: [
            // OBJETOS LITÚRGICOS 1 - SIN NOMBRE (puedes nombrarlos después)
            {
                name: "Caliz misionero",
                description: "Elemento sagrado para la celebración eucarística, fabricado con materiales de alta calidad.",
                price: "250.000",
                image: "MEDIA/CALIZ MISIONEROS.jpeg",
                material: "",
                size: "",
                details: "Para uso en celebraciones litúrgicas"
            },
            {
                name: "Sirio en cera de abeja x1",
                description: "Pieza ceremonial utilizada en rituales religiosos con simbolismo espiritual profundo.",
                price: "25.000",
                image: "MEDIA/SIRIO EN CERA DE ABEJA.jpeg",
                material: "Metal plateado y esmalte",
                size: "",
                details: "Consagrado para uso litúrgico"
            },
            {
                name: "Objeto Litúrgico de Altar 3",
                description: "Instrumento ceremonial para ceremonias religiosas con acabados artesanales detallados.",
                price: "150.000",
                image: "MEDIA/liturgical3.jpg",
                material: "Bronce y piedras preciosas",
                size: "30x18cm",
                details: "Para uso exclusivo en celebraciones"
            },
            // OBJETOS LITÚRGICOS 2 - SIN NOMBRE (puedes nombrarlos después)
            {
                name: "Elemento Litúrgico Ceremonial 1",
                description: "Herramienta sagrada utilizada en rituales de consagración y bendición.",
                price: "95.000",
                image: "MEDIA/liturgical4.jpg",
                material: "Latón y cristal",
                size: "22x14cm",
                details: "Para ceremonias especiales"
            },
            {
                name: "Elemento Litúrgico Ceremonial 2",
                description: "Accesorio ritual con significado simbólico profundo en la tradición cristiana.",
                price: "110.000",
                image: "MEDIA/liturgical5.jpg",
                material: "Plata y madera noble",
                size: "18x10cm",
                details: "Con simbolismo espiritual"
            },
            {
                name: "Elemento Litúrgico Ceremonial 3",
                description: "Utensilio sagrado para ceremonias litúrgicas con diseño tradicional y significado teológico.",
                price: "130.000",
                image: "MEDIA/liturgical6.jpg",
                material: "Metal dorado y terciopelo",
                size: "28x16cm",
                details: "Para uso en celebraciones solemnes"
            },
            // OBJETOS LITÚRGICOS 3 - SIN NOMBRE (puedes nombrarlos después)
            {
                name: "Accesorio Litúrgico Ritual 1",
                description: "Pieza ceremonial utilizada en servicios religiosos con valor simbólico y espiritual.",
                price: "75.000",
                image: "MEDIA/liturgical7.jpg",
                material: "Cobre y esmalte vitral",
                size: "15x8cm",
                details: "Para rituales litúrgicos"
            },
            {
                name: "Accesorio Litúrgico Ritual 2",
                description: "Objeto sagrado para ceremonias religiosas con diseño inspirado en la tradición eclesial.",
                price: "105.000",
                image: "MEDIA/liturgical8.jpg",
                material: "Alpaca y piedras semipreciosas",
                size: "20x12cm",
                details: "Para uso ceremonial"
            },
            {
                name: "Accesorio Litúrgico Ritual 3",
                description: "Instrumento litúrgico para celebraciones religiosas con acabados artesanales y significado teológico.",
                price: "140.000",
                image: "MEDIA/liturgical9.jpg",
                material: "Plata esterlina y marfil vegetal",
                size: "25x15cm",
                details: "Para ceremonias litúrgicas"
            }
        ]
    }
};

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
                if (category === 'liturgical') badgeText = 'LITÚRGICO';
                
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
        
        // Show notification con efecto divino suave
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

// ========== SISTEMA DE BÚSQUEDA ==========
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    const searchResultsText = document.getElementById('searchResultsText');
    const noResults = document.getElementById('noResults');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');
    
    // Variable para almacenar todos los productos
    let allProducts = [];
    
    // Función para ejecutar la búsqueda
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        // Ocultar mensajes anteriores
        searchResultsInfo.classList.remove('show');
        noResults.classList.remove('show');
        
        // Si el término de búsqueda está vacío, mostrar todos los productos
        if (searchTerm === '') {
            showAllProducts();
            return;
        }
        
        // Buscar productos que coincidan
        let foundProducts = [];
        let totalFound = 0;
        
        // Buscar en cada categoría
        Object.keys(productCategories).forEach(category => {
            const catData = productCategories[category];
            const gridElement = document.getElementById(`${category}Grid`);
            
            if (gridElement) {
                const productCards = gridElement.querySelectorAll('.product-card');
                let foundInCategory = 0;
                
                productCards.forEach(card => {
                    const productName = card.querySelector('h3').textContent.toLowerCase();
                    const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
                    const productBadge = card.querySelector('.product-badge').textContent.toLowerCase();
                    
                    // Verificar si coincide con el término de búsqueda
                    if (productName.includes(searchTerm) || 
                        productDescription.includes(searchTerm) || 
                        productBadge.includes(searchTerm)) {
                        
                        card.style.display = 'flex';
                        foundInCategory++;
                        totalFound++;
                        
                        // Agregar a la lista de productos encontrados
                        const productData = {
                            name: card.querySelector('h3').textContent,
                            price: card.querySelector('.product-price').textContent,
                            category: category
                        };
                        foundProducts.push(productData);
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Mostrar/ocultar la pestaña si tiene resultados
                const tabButton = document.querySelector(`.tab-button[data-tab="${category}"]`);
                const tabContent = document.getElementById(`${category}-tab`);
                
                if (foundInCategory > 0) {
                    if (tabContent) tabContent.style.display = 'block';
                    if (tabButton) tabButton.style.display = 'block';
                } else {
                    if (tabContent) tabContent.style.display = 'none';
                    if (tabButton) tabButton.style.display = 'none';
                }
            }
        });
        
        // Mostrar información de resultados
        if (totalFound > 0) {
            searchResultsText.textContent = `Encontramos ${totalFound} producto${totalFound !== 1 ? 's' : ''} que coinciden con "${searchTerm}"`;
            searchResultsInfo.classList.add('show');
            
            // Asegurarse de que al menos una pestaña esté activa
            const visibleTabs = document.querySelectorAll('.tab-button[style="display: block"]');
            if (visibleTabs.length > 0) {
                const firstVisibleTab = visibleTabs[0];
                const tabId = firstVisibleTab.getAttribute('data-tab');
                
                // Activar la primera pestaña visible
                document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                
                firstVisibleTab.classList.add('active');
                const tabContent = document.getElementById(`${tabId}-tab`);
                if (tabContent) tabContent.classList.add('active');
            }
        } else {
            // No se encontraron resultados
            noResults.classList.add('show');
            
            // Ocultar todos los productos
            Object.keys(productCategories).forEach(category => {
                const gridElement = document.getElementById(`${category}Grid`);
                if (gridElement) {
                    const productCards = gridElement.querySelectorAll('.product-card');
                    productCards.forEach(card => {
                        card.style.display = 'none';
                    });
                }
            });
        }
    }
    
    // Función para mostrar todos los productos
    function showAllProducts() {
        Object.keys(productCategories).forEach(category => {
            const gridElement = document.getElementById(`${category}Grid`);
            if (gridElement) {
                const productCards = gridElement.querySelectorAll('.product-card');
                productCards.forEach(card => {
                    card.style.display = 'flex';
                });
            }
            
            // Mostrar todas las pestañas
            const tabButton = document.querySelector(`.tab-button[data-tab="${category}"]`);
            const tabContent = document.getElementById(`${category}-tab`);
            
            if (tabContent) tabContent.style.display = 'block';
            if (tabButton) {
                tabButton.style.display = 'block';
                tabButton.classList.remove('active');
            }
        });
        
        // Activar la primera pestaña por defecto
        const firstTabButton = document.querySelector('.tab-button');
        const firstTabId = firstTabButton.getAttribute('data-tab');
        
        if (firstTabButton) firstTabButton.classList.add('active');
        const firstTabContent = document.getElementById(`${firstTabId}-tab`);
        if (firstTabContent) firstTabContent.classList.add('active');
        
        // Ocultar mensajes
        searchResultsInfo.classList.remove('show');
        noResults.classList.remove('show');
    }
    
    // Evento para el botón de búsqueda
    searchButton.addEventListener('click', performSearch);
    
    // Evento para la tecla Enter en el input
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // Evento para las sugerencias de búsqueda
    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const searchTerm = this.getAttribute('data-search');
            searchInput.value = searchTerm;
            performSearch();
        });
    });
    
    // Evento para limpiar la búsqueda cuando se hace clic en una pestaña
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function() {
            // Solo limpiar la búsqueda si no estamos en medio de una
            if (searchInput.value.trim() !== '') {
                // Actualizar la búsqueda para la categoría seleccionada
                const searchTerm = searchInput.value.trim().toLowerCase();
                if (searchTerm !== '') {
                    const tabId = this.getAttribute('data-tab');
                    const gridElement = document.getElementById(`${tabId}Grid`);
                    
                    if (gridElement) {
                        const productCards = gridElement.querySelectorAll('.product-card');
                        productCards.forEach(card => {
                            const productName = card.querySelector('h3').textContent.toLowerCase();
                            const productDescription = card.querySelector('.product-description').textContent.toLowerCase();
                            const productBadge = card.querySelector('.product-badge').textContent.toLowerCase();
                            
                            if (productName.includes(searchTerm) || 
                                productDescription.includes(searchTerm) || 
                                productBadge.includes(searchTerm)) {
                                card.style.display = 'flex';
                            } else {
                                card.style.display = 'none';
                            }
                        });
                    }
                }
            }
        });
    });
}

// ========== FUNCIÓN PARA AGREGAR ORBE DIVINO A LA IMAGEN ESPECÍFICA DE SAN FRANCISCO ==========
function addDivineOrbToSanFranciscoImage() {
    const specificImagePath = 'MEDIA/SAN_FRANCISCO_PALOMITAS__1_-removebg-preview.png';
    
    // Buscar todas las instancias de esta imagen específica
    const sanFranciscoImages = document.querySelectorAll('img[src*="SAN_FRANCISCO_PALOMITAS"]');
    
    console.log(`🔍 Buscando imágenes de San Francisco. Encontradas: ${sanFranciscoImages.length}`);
    
    sanFranciscoImages.forEach((img, index) => {
        console.log(`📸 Procesando imagen ${index + 1}: ${img.src}`);
        
        // Verificar si ya tiene el efecto
        if (img.parentElement.querySelector('.divine-orb-san-francisco')) {
            console.log(`⏭️ Imagen ${index + 1} ya tiene efecto, omitiendo...`);
            return;
        }
        
        // Añadir clase al contenedor
        img.parentElement.classList.add('san-francisco-logo-container');
        
        // Asegurar que el contenedor tenga posición relativa
        if (window.getComputedStyle(img.parentElement).position === 'static') {
            img.parentElement.style.position = 'relative';
        }
        
        // Crear contenedor para efectos
        let orbContainer = img.parentElement.querySelector('.san-francisco-orb-container');
        if (!orbContainer) {
            orbContainer = document.createElement('div');
            orbContainer.className = 'san-francisco-orb-container';
            orbContainer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10;
                pointer-events: none;
            `;
            img.parentElement.appendChild(orbContainer);
        }
        
        // Limpiar efectos anteriores
        orbContainer.innerHTML = '';
        
        // Crear halo
        const halo = document.createElement('div');
        halo.className = 'san-francisco-halo';
        halo.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `;
        orbContainer.appendChild(halo);
        
        // Crear luz suave
        const divineLight = document.createElement('div');
        divineLight.className = 'divine-light-san-francisco';
        divineLight.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `;
        orbContainer.appendChild(divineLight);
        
        // Crear orbe principal
        const divineOrb = document.createElement('div');
        divineOrb.className = 'divine-orb-san-francisco';
        divineOrb.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation-delay: ${index * 0.5}s;
        `;
        orbContainer.appendChild(divineOrb);
        
        // Crear múltiples destellos en posiciones estratégicas
        const sparklePositions = [
            { top: '30%', left: '30%' },
            { top: '30%', left: '70%' },
            { top: '70%', left: '30%' },
            { top: '70%', left: '70%' },
            { top: '50%', left: '20%' },
            { top: '50%', left: '80%' },
            { top: '20%', left: '50%' },
            { top: '80%', left: '50%' }
        ];
        
        sparklePositions.forEach((pos, i) => {
            const sparkle = document.createElement('div');
            sparkle.className = 'san-francisco-sparkle';
            sparkle.style.cssText = `
                position: absolute;
                top: ${pos.top};
                left: ${pos.left};
                animation-delay: ${i * 0.4}s;
            `;
            orbContainer.appendChild(sparkle);
        });
        
        console.log(`✅ Efecto divino aplicado a imagen ${index + 1}`);
    });
    
    // Si no se encontró la imagen, buscar después de un tiempo
    if (sanFranciscoImages.length === 0) {
        console.log('🔄 No se encontraron imágenes, intentando de nuevo en 500ms...');
        setTimeout(addDivineOrbToSanFranciscoImage, 500);
    }
}

// ========== OBSERVAR CAMBIOS EN EL DOM PARA DETECTAR LA IMAGEN ==========
function observeForSanFranciscoImage() {
    const observer = new MutationObserver((mutations) => {
        let imageFound = false;
        
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeName === 'IMG' && node.src.includes('SAN_FRANCISCO_PALOMITAS')) {
                        imageFound = true;
                    }
                    // También verificar nodos hijos
                    if (node.querySelectorAll) {
                        const images = node.querySelectorAll('img[src*="SAN_FRANCISCO_PALOMITAS"]');
                        if (images.length > 0) {
                            imageFound = true;
                        }
                    }
                });
            }
        });
        
        if (imageFound) {
            console.log('🆕 Nueva imagen detectada, aplicando efecto...');
            setTimeout(addDivineOrbToSanFranciscoImage, 300);
        }
    });
    
    // Comenzar a observar
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('👀 Observador de imágenes iniciado');
}

// ========== INICIALIZAR TODO ==========
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

    // Botón volver arriba
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Smooth scrolling para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Añadir funcionalidad al botón volver arriba
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Inicializar buscador
    initializeSearch();
}

// También agregar este código para reiniciar efectos cuando cambien las pestañas
document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        setTimeout(addDivineOrbToSanFranciscoImage, 800);
    });
});

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeConstructionAlert();
    
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
                // Inicializar efectos celestiales
                initializeCelestialEffects();
                // Inicializar carrusel de fondo
                initializeCarousel();
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
    
    // Inicializar todo, incluyendo el orbe
    initializeAll();
    
    // Aplicar efectos divinos después de un tiempo
    setTimeout(addDivineOrbToSanFranciscoImage, 1000);
    
    // Iniciar observador para imágenes que se carguen después
    observeForSanFranciscoImage();
    
    // Verificar periódicamente en caso de que alguna imagen se haya perdido
    setInterval(() => {
        addDivineOrbToSanFranciscoImage();
    }, 2000);
});

// Actualizar año y fecha automáticamente
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar año
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Actualizar fecha
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const now = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = now.toLocaleDateString('es-ES', options);
    }
    
    // Resaltar texto importante al hacer clic (opcional)
    document.querySelectorAll('.highlight').forEach(item => {
        item.addEventListener('click', function() {
            this.style.backgroundColor = '#fff8f0';
            this.style.padding = '2px 5px';
            this.style.borderRadius = '3px';
            this.style.transition = 'background-color 0.3s';
            
            setTimeout(() => {
                this.style.backgroundColor = 'transparent';
                this.style.padding = '0';
            }, 1500);
        });
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