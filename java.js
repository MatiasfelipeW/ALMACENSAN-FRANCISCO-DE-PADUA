/* ============================================================
   SAN FRANCISCO DE PADUA — JavaScript Principal + Seguridad
   ============================================================ */

'use strict';

/* ============================================================
   ═══════════════════════════════════════════════════════════
   SISTEMA DE CIBERSEGURIDAD Y ANTI-COPIA
   ═══════════════════════════════════════════════════════════
   ============================================================ */

/* ---------- CONFIGURACIÓN GLOBAL DE SEGURIDAD ---------- */
const SECURITY_CONFIG = {
    BRAND_NAME: 'San Francisco de Padua Cali',
    WATERMARK_TEXT: '© San Francisco de Padua Cali',
    COPY_MESSAGE: '\n\n© San Francisco de Padua Cali\nArte y Devoción desde 2006\nTodos los derechos reservados.\n',
    ENABLE_DEVTOOLS_DETECTION: true,
    ENABLE_CONTEXT_BLOCK: true,
    ENABLE_COPY_BLOCK: true,
    ENABLE_DRAG_BLOCK: true,
    ENABLE_SELECTION_BLOCK: true,
    ENABLE_WATERMARK: true,
    ENABLE_PRINT_BLOCK: true,
    ENABLE_DEVTOOLS_HEAVY_MODE: true, // Bloqueo visual si abren devtools
    MIN_PRINT_BLOCK_MS: 8000,
    DEBUG_MODE: false
};

/* ---------- 1. BLOQUEO DE CLIC DERECHO ---------- */
function initContextBlock() {
    if (!SECURITY_CONFIG.ENABLE_CONTEXT_BLOCK) return;

    document.addEventListener('contextmenu', function(e) {
        // Permitir clic derecho en inputs de texto (para pegar)
        const tag = e.target.tagName;
        const isInput = tag === 'INPUT' || tag === 'TEXTAREA';
        if (isInput) return;

        e.preventDefault();
        showSecurityToast('Contenido protegido · Uso exclusivo © San Francisco de Padua');
        return false;
    });

    // Bloquear también long-press en móvil
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) e.preventDefault();
    }, { passive: false });

    let longPressTimer = null;
    document.addEventListener('touchstart', function(e) {
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        longPressTimer = setTimeout(() => {
            e.preventDefault();
            showSecurityToast('Contenido protegido');
        }, 600);
    }, { passive: false });

    document.addEventListener('touchend', function() {
        if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
    });

    document.addEventListener('touchmove', function() {
        if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
    });
}

/* ---------- 2. BLOQUEO DE COPIA / CORTE ---------- */
function initCopyBlock() {
    if (!SECURITY_CONFIG.ENABLE_COPY_BLOCK) return;

    document.addEventListener('copy', function(e) {
        const selection = window.getSelection().toString();
        if (!selection) return;

        // Reemplazar el texto copiado con el aviso de copyright
        e.clipboardData.setData('text/plain', selection + SECURITY_CONFIG.COPY_MESSAGE);
        e.preventDefault();
        showSecurityToast('Contenido protegido · Se añadió aviso de copyright');
    });

    document.addEventListener('cut', function(e) {
        const selection = window.getSelection().toString();
        if (!selection) return;

        e.clipboardData.setData('text/plain', selection + SECURITY_CONFIG.COPY_MESSAGE);
        e.preventDefault();
        showSecurityToast('Contenido protegido');
    });

    // Bloquear ctrl+A (seleccionar todo)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
            const tag = e.target.tagName;
            const isInput = tag === 'INPUT' || tag === 'TEXTAREA';
            if (isInput) return;
            e.preventDefault();
        }

        // Bloquear ctrl+S (guardar página)
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
            e.preventDefault();
            showSecurityToast('Guardado no permitido en este sitio');
        }

        // Bloquear ctrl+U (ver código fuente)
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
            e.preventDefault();
            showSecurityToast('Código fuente protegido');
        }

        // Bloquear ctrl+P (imprimir)
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
            if (SECURITY_CONFIG.ENABLE_PRINT_BLOCK) {
                e.preventDefault();
                showSecurityToast('Impresión no permitida');
                return false;
            }
        }

        // Bloquear F12
        if (e.key === 'F12' || e.keyCode === 123) {
            if (SECURITY_CONFIG.ENABLE_DEVTOOLS_DETECTION) {
                e.preventDefault();
                showSecurityToast('Herramientas de desarrollo bloqueadas');
                return false;
            }
        }

        // Bloquear Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
        if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
            const key = e.key.toLowerCase();
            if (key === 'i' || key === 'j' || key === 'c') {
                if (SECURITY_CONFIG.ENABLE_DEVTOOLS_DETECTION) {
                    e.preventDefault();
                    showSecurityToast('Herramientas de desarrollo bloqueadas');
                    return false;
                }
            }
        }
    }, true);
}

/* ---------- 3. BLOQUEO DE ARRASTRE DE IMÁGENES ---------- */
function initDragBlock() {
    if (!SECURITY_CONFIG.ENABLE_DRAG_BLOCK) return;

    document.addEventListener('dragstart', function(e) {
        const tag = e.target.tagName;
        if (tag === 'IMG') {
            e.preventDefault();
            showSecurityToast('Imagen protegida por derechos de autor');
            return false;
        }
        // Bloquear también para enlaces
        if (tag === 'A' && e.target.querySelector('img')) {
            e.preventDefault();
            return false;
        }
    });

    // Prevenir guardar imagen con clic derecho en móvil
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
        img.addEventListener('mousedown', (e) => {
            if (e.button === 0 && e.detail === 1) {
                // Solo bloqueamos long-press, no click normal
            }
        });
    });
}

/* ---------- 4. BLOQUEO DE SELECCIÓN DE TEXTO ---------- */
function initSelectionBlock() {
    if (!SECURITY_CONFIG.ENABLE_SELECTION_BLOCK) return;

    // Aplicar clase no-select al body
    document.body.classList.add('no-select');

    // En inputs sí permitimos selección
    document.addEventListener('selectstart', function(e) {
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return true;
        e.preventDefault();
        return false;
    });
}

/* ---------- 5. DETECCIÓN DE DEVTOOLS ---------- */
function initDevToolsDetection() {
    if (!SECURITY_CONFIG.ENABLE_DEVTOOLS_DETECTION) return;

    let devtoolsOpen = false;
    const threshold = 160;

    // Método 1: por diferencia de tamaño de ventana
    setInterval(function() {
        const widthDiff = window.outerWidth - window.innerWidth > threshold;
        const heightDiff = window.outerHeight - window.innerHeight > threshold;

        if (widthDiff || heightDiff) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                if (SECURITY_CONFIG.DEBUG_MODE) console.log('[SECURITY] DevTools detectado por dimensiones');
                handleDevToolsOpen();
            }
        } else {
            if (devtoolsOpen) {
                devtoolsOpen = false;
                if (SECURITY_CONFIG.DEBUG_MODE) console.log('[SECURITY] DevTools cerrado');
                handleDevToolsClose();
            }
        }
    }, 1000);

    // Método 2: por debugger timing
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function() {
            devtoolsOpen = true;
            if (SECURITY_CONFIG.DEBUG_MODE) console.log('[SECURITY] DevTools detectado por getter');
            handleDevToolsOpen();
            return 'detected';
        }
    });

    setInterval(function() {
        devtoolsOpen = false;
        console.log('%c', element);
    }, 2000);

    // Método 3: por toString override
    const checkConsole = /./;
    checkConsole.toString = function() {
        devtoolsOpen = true;
        handleDevToolsOpen();
        return '';
    };
    console.log('%c', checkConsole);
}

function handleDevToolsOpen() {
    // No bloqueamos completamente (es muy intrusivo), pero mostramos aviso
    if (SECURITY_CONFIG.DEBUG_MODE) console.log('[SECURITY] Mostrando advertencia por DevTools');
}

function handleDevToolsClose() {
    if (SECURITY_CONFIG.DEBUG_MODE) console.log('[SECURITY] Restaurando estado normal');
}

/* ---------- 6. MARCA DE AGUA DINÁMICA ---------- */
function initWatermark() {
    if (!SECURITY_CONFIG.ENABLE_WATERMARK) return;

    const layer = document.getElementById('watermarkLayer');
    if (!layer) return;

    function generateWatermarks() {
        layer.innerHTML = '';
        const width = window.innerWidth;
        const height = window.innerHeight;
        const gapX = 260;
        const gapY = 180;
        const cols = Math.ceil(width / gapX) + 1;
        const rows = Math.ceil(height / gapY) + 1;

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const item = document.createElement('div');
                item.className = 'watermark-item';
                item.textContent = SECURITY_CONFIG.WATERMARK_TEXT;
                item.style.left = (i * gapX - 40) + 'px';
                item.style.top = (j * gapY) + 'px';
                item.style.opacity = String(0.5 + Math.random() * 0.3);
                layer.appendChild(item);
            }
        }
    }

    generateWatermarks();

    // Regenerar al redimensionar (con debounce)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(generateWatermarks, 400);
    });

    // Activar la capa tras un tiempo para que no moleste al inicio
    setTimeout(() => layer.classList.add('active'), 2500);
}

/* ---------- 7. BLOQUEO DE IMPRESIÓN ---------- */
function initPrintBlock() {
    if (!SECURITY_CONFIG.ENABLE_PRINT_BLOCK) return;

    // CSS media print dinámico
    const style = document.createElement('style');
    style.textContent = `
        @media print {
            body::before {
                content: "© San Francisco de Padua Cali — Contenido protegido. Impresión no autorizada.";
                display: block;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: #1A1614;
                color: #D4AF37;
                padding: 20px;
                text-align: center;
                font-family: serif;
                font-size: 14px;
                z-index: 999999;
            }
        }
    `;
    document.head.appendChild(style);

    window.addEventListener('beforeprint', function() {
        showSecurityToast('Impresión no permitida en este sitio');
    });
}

/* ---------- 8. PROTECCIÓN DE IMÁGENES (manipulación del DOM) ---------- */
function initImageProtection() {
    // Detectar imágenes agregadas dinámicamente
    const protectImage = (img) => {
        if (img.dataset.protected === 'true' || img.classList.contains('protected-image')) return;
        img.dataset.protected = 'true';
        img.draggable = false;
        img.setAttribute('draggable', 'false');

        // Prevenir guardar imagen en móvil con long-press
        img.addEventListener('contextmenu', e => e.preventDefault());
    };

    // Aplicar a las existentes
    document.querySelectorAll('img').forEach(protectImage);

    // Aplicar a las futuras
    const observer = new MutationObserver(mutations => {
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    if (node.tagName === 'IMG') protectImage(node);
                    node.querySelectorAll?.('img').forEach(protectImage);
                }
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
}

/* ---------- 9. TOAST DE SEGURIDAD ---------- */
let securityToastTimer = null;
function showSecurityToast(message) {
    let toast = document.getElementById('securityToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'securityToast';
        toast.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%) translateY(-30px);
            background: linear-gradient(135deg, #1A1614, #1E3A2F);
            color: #F5E6C3;
            padding: 12px 26px;
            border-radius: 50px;
            border: 1.5px solid #D4AF37;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4), 0 0 30px rgba(212,175,55,0.3);
            font-size: 0.85rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            z-index: 999999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            font-family: 'Montserrat', sans-serif;
            max-width: 90vw;
            text-align: center;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fas fa-shield-halved" style="color:#D4AF37;"></i> ${message}`;
    toast.style.opacity = '1';
    toast.style.visibility = 'visible';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    clearTimeout(securityToastTimer);
    securityToastTimer = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.visibility = 'hidden';
        toast.style.transform = 'translateX(-50%) translateY(-30px)';
    }, 2400);
}

/* ---------- 10. OVERLAY DE SEGURIDAD (para acciones críticas) ---------- */
function showSecurityOverlay(message) {
    const overlay = document.getElementById('securityOverlay');
    const msgEl = document.getElementById('securityMessage');
    if (!overlay) return;
    if (msgEl && message) msgEl.textContent = message;
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');

    // Auto-cerrar
    setTimeout(() => {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
    }, 4000);
}

function initSecurityOverlay() {
    const overlay = document.getElementById('securityOverlay');
    const btn = document.getElementById('securityDismiss');
    if (btn && overlay) {
        btn.addEventListener('click', () => {
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
        });
    }
}

/* ---------- 11. ANTI-DEBUGGING (difficultar inspección) ---------- */
function initAntiDebugging() {
    if (!SECURITY_CONFIG.DEBUG_MODE) {
        // Deshabilitamos console en producción
        // (cuidado: algunos navegadores necesitan console para funcionar)
        // Solo deshabilitamos métodos, no el objeto completo
        const noop = () => {};
        if (window.console && !window.location.hostname.includes('localhost')) {
            ['debug', 'info', 'log'].forEach(method => {
                if (console[method]) console[method] = noop;
            });
        }
    }
}

/* ---------- 12. PROTECCIÓN CONTRA IFRAMES MALICIOSOS ---------- */
function initIframeProtection() {
    // Prevenir que el sitio sea embebido en iframes externos
    try {
        if (window.self !== window.top) {
            // Estamos dentro de un iframe
            window.top.location = window.self.location;
        }
    } catch (e) {
        // Cross-origin: significa que estamos embebidos externamente
        document.body.innerHTML = '<div style="padding:40px;text-align:center;font-family:sans-serif;">' +
            '<h1>Acceso bloqueado</h1><p>Este contenido no puede ser embebido.</p></div>';
    }
}

/* ---------- 13. DETECCIÓN DE AUTOMATIZACIÓN (bots) ---------- */
function initBotDetection() {
    // Detección básica de headless browsers
    const isHeadless = /HeadlessChrome|PhantomJS|Puppeteer|Selenium/i.test(navigator.userAgent);
    const noPlugins = navigator.plugins.length === 0;
    const webdriver = navigator.webdriver === true;
    const noChrome = !window.chrome && /Chrome/i.test(navigator.userAgent);

    if (isHeadless || webdriver || (noPlugins && noChrome)) {
        if (SECURITY_CONFIG.DEBUG_MODE) console.warn('[SECURITY] Posible bot detectado');
        // Podríamos bloquear pero puede generar falsos positivos
    }
}

/* ---------- 14. OFUSCACIÓN DE EMAILS ---------- */
function initEmailObfuscation() {
    // Convertir emails visibles a entidades HTML para evitar scraping
    // Esto se aplica solo si el email NO está en un <a href="mailto:">
    document.querySelectorAll('*').forEach(el => {
        if (el.children.length === 0 && el.textContent) {
            const text = el.textContent;
            const emailRegex = /([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
            if (emailRegex.test(text)) {
                // Ya está visible, lo dejamos por ahora
            }
        }
    });
}

/* ---------- 15. INICIALIZACIÓN DE TODA LA SEGURIDAD ---------- */
function initSecurity() {
    initIframeProtection();
    initContextBlock();
    initCopyBlock();
    initDragBlock();
    initSelectionBlock();
    initDevToolsDetection();
    initWatermark();
    initPrintBlock();
    initImageProtection();
    initSecurityOverlay();
    initAntiDebugging();
    initBotDetection();
    initEmailObfuscation();

    if (SECURITY_CONFIG.DEBUG_MODE) {
        console.log('%c🛡️ Sistema de seguridad inicializado', 'color:#D4AF37;font-size:14px;font-weight:bold;');
        console.log('%c© San Francisco de Padua Cali', 'color:#A67C1F;');
    }
}

/* ============================================================
   ═══════════════════════════════════════════════════════════
   RESTO DEL CÓDIGO DEL SITIO
   ═══════════════════════════════════════════════════════════
   ============================================================ */

/* ---------- UTILIDADES ---------- */
window.sanitizeInput = function(input) {
    if (!input) return '';
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
};

const rateLimiter = {
    store: new Map(),
    check(action, limit = 8, windowMs = 60000) {
        const now = Date.now();
        const rec = this.store.get(action) || { count: 0, reset: now + windowMs };
        if (now > rec.reset) { rec.count = 0; rec.reset = now + windowMs; }
        rec.count++;
        this.store.set(action, rec);
        return rec.count <= limit;
    }
};

window.openModal = function(src) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    if (!modal || !modalImg) return;
    modalImg.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

/* ---------- DATOS DE PRODUCTOS ---------- */
const productCategories = {
    saints: {
        items: [
            { name: "Virgen Milagrosa ", description: "Virgen de las gracias y los milagros.", price: "150.000", image: "MEDIA/MILAGROSA 40CM.jpeg", material: "Pintura a mano", size: "40cm", details: "Técnica artesanal" },
            { name: "Virgen Milagrosa ", description: "Virgen de las gracias y los milagros.", price: "100.000", image: "MEDIA/MILAGROSA 30CM.jpeg", material: "Resina", size: "30cm", details: "Acabado detallado" },
            { name: "San Jose ", description: "Patrono de la Iglesia universal y padre adoptivo de Jesús.", price: "110.000", image: "MEDIA/SAN JOSE 30CM.jpeg", material: "Cerámica italiana", size: "30cm", details: "Técnica italiana al horno" },
            { name: "Corazón de María ", description: "Símbolo del amor y pureza de la Madre de Dios.", price: "135.000", image: "MEDIA/CORAZON DE MARIA 33CM.jpeg", material: "Cerámica italiana", size: "33cm", details: "Técnica italiana al horno" },
            { name: "Virgen de la salud ", description: "Abogada de los enfermos y protectora de la salud.", price: "45.000", image: "MEDIA/VIRGENDE LA SALUD 44CM.jpeg", material: "Resina pintada", size: "44cm", details: "Protección para el hogar" },
            { name: "Niño de Praga", description: "Representación del Niño Jesús Rey y soberano.", price: "120.000", image: "MEDIA/NIÑO DE PRAGA 15CM.jpeg", material: "Cerámica italiana", size: "15cm", details: "Técnica italiana al horno" },
            { name: "Virgen de la providencia", description: "Madre de la divina providencia y el cuidado maternal.", price: "100.000", image: "MEDIA/VIRGEN DE LA PROVIDENCIA 20CM.jpeg", material: "Cerámica italiana", size: "20cm", details: "Técnica italiana al horno" },
            { name: "Ángel con arpa ", description: "Ángel celestial que alaba a Dios con música.", price: "120.000", image: "MEDIA/ANGEL CON ARPA CM.jpeg", material: "Cerámica italiana", size: "25cm", details: "Técnica italiana al horno" },
            { name: "Anunciacion", description: "Momento en que el Ángel Gabriel anuncia a María.", price: "200.000", image: "MEDIA/ANUNCIACION 30CM.jpeg", material: "Cerámica italiana", size: "30cm", details: "Técnica italiana al horno" },
            { name: "Pastor", description: "Representación del buen pastor que cuida su rebaño.", price: "120.000", image: "MEDIA/PASTOR.jpeg", material: "Cerámica italiana", size: "25cm", details: "Técnica italiana al horno" },
            { name: "Pastor con niño Dios", description: "Pastor que carga al Niño Jesús en sus brazos.", price: "80.000", image: "MEDIA/PASTOR NIÑO DIOS.jpeg", material: "Cerámica italiana", size: "34cm", details: "Técnica italiana al horno" },
            { name: "Santa zita", description: "Patrona de las sirvientas y trabajadoras domésticas.", price: "70.000", image: "MEDIA/SANTA ZITA.jpeg", material: "Cerámica italiana", size: "27cm", details: "Técnica italiana al horno" },
            { name: "Santa Lucía", description: "Mártir patrona de la vista y los ojos.", price: "80.000", image: "MEDIA/SANTA LUCIA.jpeg", material: "Cerámica italiana", size: "23cm", details: "Técnica italiana al horno" },
            { name: "Santa Marta", description: "Patrona de los chefs, sirvientes y amas de casa.", price: "80.000", image: "MEDIA/SANTA MARTA.jpeg", material: "Cerámica italiana", size: "25cm", details: "Técnica italiana al horno" },
            { name: "Arcangel Rafael", description: "Arcángel sanador y protector de los viajeros.", price: "90.000", image: "MEDIA/ARCANGEL RAFAEL.jpeg", material: "Cerámica italiana", size: "25cm", details: "Técnica italiana al horno" },
            { name: "Arcangel Uriel", description: "Arcángel de la sabiduría y la iluminación divina.", price: "90.000", image: "MEDIA/ARCANGEL URIEL.jpeg", material: "Cerámica italiana", size: "25cm", details: "Técnica italiana al horno" },
            { name: "Arcángel zadquiel", description: "Arcángel de la misericordia y la transformación.", price: "80.000", image: "MEDIA/ARCANGEL ZADQUIEL.jpeg", material: "Cerámica italiana", size: "25cm", details: "Técnica italiana al horno" },
            { name: "Virgen Rosa mística", description: "Aparición mariana que invoca la penitencia y oración.", price: "90.000", image: "MEDIA/VIRGEN ROSA MISTICA.jpeg", material: "Cerámica italiana", size: "25cm", details: "Técnica italiana al horno" },
            { name: "Virgen de la Piedad", description: "María sosteniendo a Jesús después de la crucifixión.", price: "90.000", image: "MEDIA/VIRGEN DE LA PIEDAD.jpeg", material: "Cerámica italiana", size: "23cm", details: "Técnica italiana al horno" },
            { name: "Virgen del valle", description: "Patrona del oriente venezolano y los pescadores.", price: "90.000", image: "MEDIA/VIRDEN DEL VALLE.jpeg", material: "Cerámica italiana", size: "25cm", details: "Técnica italiana al horno" },
            { name: "Buen pastor", description: "Jesús como el pastor que da la vida por sus ovejas.", price: "100.000", image: "MEDIA/BUEN PASTOR.jpeg", material: "Cerámica italiana", size: "25cm", details: "Técnica italiana al horno" },
            { name: "Señor de la misericordia", description: "Cristo misericordioso que perdona y acoge.", price: "110.000", image: "MEDIA/SEÑOR DE LA MISERICORDIA.jpeg", material: "Cerámica italiana", size: "33cm", details: "Técnica italiana al horno" },
            { name: "Arcangel San Miguel", description: "Príncipe de los arcángeles, defensor contra el mal.", price: "180.000", image: "MEDIA/ARCANGEL SAN MIGUEL.jpeg", material: "Cerámica italiana", size: "38cm", details: "Técnica italiana al horno" },
            { name: "Arcangel Metatron", description: "Arcángel de la sabiduría y escriba celestial.", price: "150.000", image: "MEDIA/ARCANGEL METATRON.jpeg", material: "Cerámica italiana", size: "28cm", details: "Técnica italiana al horno" },
            { name: "Virgen de la Salud", description: "Protectora de la salud y consuelo de los enfermos.", price: "68.000", image: "MEDIA/VIRGEN DE LA SALUD.jpeg", material: "Cerámica italiana", size: "22cm", details: "Técnica italiana al horno" },
            { name: "San Francisco de Asís ", description: "Santo de la pobreza, paz y amor a la naturaleza.", price: "100.000", image: "MEDIA/SAN FRANCISCO DE ASIS.jpeg", material: "Cerámica italiana", size: "23cm", details: "Técnica italiana al horno" },
            { name: "Virgen de la Primavera ", description: "Símbolo de renovación y nueva vida en Cristo.", price: "80.000", image: "MEDIA/VIRGEN DE LA PRIMAVERA.jpeg", material: "Cerámica italiana", size: "25cm", details: "Técnica italiana al horno" },
            { name: "Virgen María Auxiliadora ", description: "Auxilio de los cristianos y protectora de la Iglesia.", price: "90.000", image: "MEDIA/VIRGEN MARIA AUXILIADORA.jpeg", material: "Cerámica italiana", size: "30cm", details: "Técnica italiana al horno" },
            { name: "Virgen de aranzazu ", description: "Patrona de Guipúzcoa y los montañeros vascos.", price: "130.000", image: "MEDIA/VIRGEN DE ARANSAZU.jpeg", material: "Cerámica italiana", size: "43cm", details: "Técnica italiana al horno" },
            { name: "Santa Ana ", description: "Madre de la Virgen María y abuela de Jesús.", price: "120.000", image: "MEDIA/SANTA ANA.jpeg", material: "Cerámica italiana", size: "30cm", details: "Técnica italiana al horno" },
            { name: "Virgen de Loreto", description: "Patrona de los aviadores y las casas santas.", price: "120.000", image: "MEDIA/VIRDEN DE LORETO.jpeg", material: "Cerámica italiana", size: "28cm", details: "Técnica italiana al horno" },
            { name: "San Jose", description: "Esposo de María y custodio de la Sagrada Familia.", price: "100.000", image: "MEDIA/SAN JOSE.jpeg", material: "Cerámica italiana", size: "28cm", details: "Técnica italiana al horno" },
            { name: "Virgen del Cojin", description: "Representación íntima de la Virgen en reposo.", price: "70.000", image: "MEDIA/VIRGEN DEL COJIN.jpeg", material: "Cerámica italiana", size: "18cm", details: "Técnica italiana al horno" },
            { name: "Virgen del Coromoto", description: "Patrona de Venezuela, aparición en Guanare.", price: "85.000", image: "MEDIA/VIRGEN DEL COROMOTO.jpeg", material: "Cerámica italiana", size: "23cm", details: "Técnica italiana al horno" },
            { name: "Retablo de Ascensión de la virgen", description: "Ascensión de María al cielo en cuerpo y alma.", price: "120.000", image: "MEDIA/RETRATO ACSENSION DE LA VIRGEN.jpeg", material: "Cerámica italiana", size: "25cm", details: "Técnica italiana al horno" },
            { name: "Retablo de María reina", description: "María como reina del cielo y de la tierra.", price: "130.000", image: "MEDIA/RETABLO DE MARIA REINA.jpeg", material: "Cerámica italiana", size: "130*40cm", details: "Técnica italiana al horno" },
            { name: "Retablo de arcángel San Miguel", description: "San Miguel arcángel venciendo al demonio.", price: "120.000", image: "MEDIA/RETABLO DE ARCANGEL SAN MIGUEL.jpeg", material: "Cerámica italiana", size: "40*20cm", details: "Técnica italiana al horno" },
            { name: "Retablo del arcángel San Rafael ", description: "Arcángel sanador y guía de los viajeros.", price: "120.000", image: "MEDIA/RETABLO DE ARCANGEL SAN RAFAEL.jpeg", material: "Cerámica italiana", size: "48*20cm", details: "Técnica italiana al horno" },
            { name: "Retablo santísima Trinidad ", description: "Padre, Hijo y Espíritu Santo en unidad divina.", price: "120.000", image: "MEDIA/RETABLO SANTISIMA TRINIDAD.jpeg", material: "Cerámica italiana", size: "27*27cm", details: "Técnica italiana al horno" },
            { name: "Retablo Madonna", description: "Representación clásica de la Virgen María.", price: "130.000", image: "MEDIA/RETABLO MADONA.jpeg", material: "Cerámica italiana", size: "33*28cm", details: "Técnica italiana al horno" },
            { name: "Retablo virgen de Lourdes", description: "Aparición mariana en la gruta de Massabielle.", price: "130.000", image: "MEDIA/RETABLO VIRGEN DE LOURDES.jpeg", material: "Cerámica italiana", size: "38*18cm", details: "Técnica italiana al horno" },
            { name: "Aplique Madonna", description: "Medallón de la Virgen María para pared.", price: "70.000", image: "MEDIA/APLIQUE MADONNA.jpeg", material: "Cerámica italiana", size: "22*11cm", details: "Técnica italiana al horno" },
            { name: "Aplique Rosa mística", description: "Medallón de la Rosa Mística para decoración.", price: "65.000", image: "MEDIA/APLIQUE ROSA MISTICA.jpeg ", material: "Cerámica italiana", size: "24*9cm", details: "Técnica italiana al horno" },
            { name: "Aplique virgen del Carmen ", description: "Medallón de la Virgen del Monte Carmelo.", price: "70.000", image: "MEDIA/APLIQUE VIRGEN DEL CARMEN.jpeg", material: "Cerámica italiana", size: "20*14cm", details: "Técnica italiana al horno" },
            { name: "Aplique niño Jesús", description: "Medallón del Niño Dios para devoción familiar.", price: "70.000", image: "MEDIA/APLIQUE NIÑO DE JESUS.jpeg", material: "Cerámica italiana", size: "20*12cm", details: "Técnica italiana al horno" },
            { name: "Retablo virgen de Fátima", description: "Aparición mariana a los pastorcitos de Portugal.", price: "150.000", image: "MEDIA/RETABLO VIRGEN DE FATIMA.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "Retablo del Tao de San Francisco de Asís", description: "San Francisco en meditación y oración.", price: "120.000", image: "MEDIA/RETABLO DEL TAO DE SAN FRANCISCO.jpeg", material: "Cerámica italiana", size: "24*20cm", details: "Técnica italiana al horno" },
            { name: "Retablo Madonna clasico", description: "Representación tradicional de la Madre de Dios.", price: "110.000", image: "MEDIA/RETABLO MADONNA CLASICA.jpeg", material: "Cerámica italiana", size: "24*16cm", details: "Técnica italiana al horno" },
            { name: "Retablo ultima cena", description: "Última cena de Jesús con sus apóstoles.", price: "130.000", image: "MEDIA/RETABLO ULTIMA CENA.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "Retablo San Rafael ", description: "Arcángel protector y guía de los caminantes.", price: "80.000", image: "MEDIA/RETABLO SAN RAFAEL.jpeg", material: "Cerámica italiana", size: "30*16cm", details: "Técnica italiana al horno" },
            { name: "Niño Dios canasta ", description: "Niño Jesús en canasta, símbolo de humildad.", price: "120.000", image: "MEDIA/NIÑO DIOS EN CANASTA.jpeg", material: "Cerámica italiana", size: "28cm", details: "Técnica italiana al horno" },
            { name: "San José estilizado", description: "Representación moderna del padre adoptivo de Jesús.", price: "170.000", image: "MEDIA/SAN JOSE ESTILIZADO.jpeg", material: "Cerámica italiana", size: "50cm", details: "Técnica italiana al horno" },
            { name: "Sueño de Jesús ", description: "Niño Jesús durmiendo plácidamente.", price: "120.000", image: "MEDIA/SUEÑO DE JESUS.jpeg", material: "Cerámica italiana", size: "23cm", details: "Técnica italiana al horno" },
            { name: "Cristo San Benito ", description: "Cristo bendito representado con devoción.", price: "130.000", image: "MEDIA/CRISTO BENDITO.jpeg", material: "Cerámica italiana", size: "50*30cm", details: "Técnica italiana al horno" },
            { name: "Cristo en Cruz", description: "Jesucristo crucificado, sacrificio por la humanidad.", price: "110.000", image: "MEDIA/CRISTO EN LA RUZ.jpeg ", material: "Cerámica italiana", size: "49*25", details: "Técnica italiana al horno" },
            { name: "Cruz de San Damián", description: "Cruz que habló a San Francisco de Asís.", price: "100.000", image: "MEDIA/CRUZ DE SAN DAMIAN.jpeg   ", material: "Cerámica italiana", size: "28*20cm", details: "Técnica italiana al horno" },
            { name: "Retablo Guadalupe ", description: "Virgen de Guadalupe, emperatriz de América.", price: "120.000", image: "MEDIA/RETABLO GUADALUPE.jpeg", material: "Cerámica italiana", size: "30*26cm", details: "Técnica italiana al horno" },
            { name: "Ángel de la lechuga ", description: "Ángel que sostiene una lechuga, símbolo de prosperidad.", price: "90.000", image: "MEDIA/ANGEL DE LA LECHUGA.jpeg", material: "Cerámica italiana", size: "35*20cm", details: "Técnica italiana al horno" },
            { name: "Retablo sagrada familia de pared ", description: "Jesús, María y José, modelo de familia cristiana.", price: "00.000", image: "MEDIA/RETABLO SAGRADA FAMILIA DE PARED.jpeg", material: "Cerámica italiana", size: "29*15cm", details: "Técnica italiana al horno" },
            { name: "Arcangeles niños x unidad", description: "Arcángeles en representación infantil.", price: "40.000", image: "MEDIA/ACRCANGELES NIÑOS.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "Virgen Rosa mística con vestido ", description: "Rosa Mística con vestido decorado.", price: "160.000", image: "MEDIA/VIRGEN ROSA MISTICA CON VESTIDO.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "Cristo eucarístico", description: "Jesús en la Eucaristía, pan de vida eterna.", price: "45.000", image: "MEDIA/CRISTO EUCARISTICO.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "Virgen María Auxiliadora", description: "María auxiliadora en versión dorada.", price: "60.000", image: "MEDIA/VIRGEN MARIA AUXILIADORA DORADA.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "Retablo Lourdes", description: "Virgen de Lourdes en su gruta milagrosa.", price: "100.000", image: "MEDIA/RETABLO LIURDES.jpeg", material: "Cerámica italiana", size: "42*27cm", details: "Técnica italiana al horno" },
            { name: "Retablo Jesús con niños", description: "Jesús bendiciendo a los niños.", price: "85.000", image: "MEDIA/RETABLO JESUS CON NIÑO DIOS.jpeg", material: "Cerámica italiana", size: "21*12cm", details: "Técnica italiana al horno" },
            { name: "Teresa de Ávila ", description: "Doctora de la Iglesia y reformadora carmelita.", price: "90.000", image: "MEDIA/TERESA DE AVILA.jpeg", material: "Cerámica italiana", size: "30cm", details: "Técnica italiana al horno" },
            { name: "Virgen María Auxiliadora", description: "Doctora de la Iglesia y reformadora carmelita.", price: "110.000", image: "MEDIA/VIRGEN MARIA AUXILIADORA 3.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "San Antonio", description: "Doctora de la Iglesia y reformadora carmelita.", price: "86.000", image: "MEDIA/SAN ANTONIO.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "Virgen polaca", description: "Doctora de la Iglesia y reformadora carmelita.", price: "86.000", image: "MEDIA/VIRGEN POLACA.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "Juan Diego", description: "Doctora de la Iglesia y reformadora carmelita.", price: "85.000", image: "MEDIA/JUAN DIEGO.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "Virgen de la leche", description: "Doctora de la Iglesia y reformadora carmelita.", price: "80.000", image: "MEDIA/VIRGEN DE LA LECHE.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "Virgen estrella del mar ", description: "Doctora de la Iglesia y reformadora carmelita.", price: "85.000", image: "MEDIA/VIRGEN ESTRELLA DEL MAR.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "San Patrick ", description: "Doctora de la Iglesia y reformadora carmelita.", price: "88.000", image: "MEDIA/SAN PATRICK.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "San Pedro ", description: "Doctora de la Iglesia y reformadora carmelita.", price: "90.000", image: "MEDIA/SAN PEDRO.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "Santa Inés ", description: "Doctora de la Iglesia y reformadora carmelita.", price: "80.000", image: "MEDIA/SAN INES.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "Virgen de Fátima", description: "Representación del Cristo de San Juan de la Cruz.", price: "350.000", image: "MEDIA/VIRGEN DE FATIMA.jpeg", material: "Fibra", size: "30cm", details: "Técnica italiana al horno" },
            { name: "Arcángel San Miguel en acrílico ", description: "Doctora de la Iglesia y reformadora carmelita.", price: "350.000", image: "MEDIA/ARCANGEL SAN MIGUEL EN ACRILICO.jpeg", material: "Acrilico", size: "30cm", details: "Técnica italiana al horno" },
            { name: "Virgen Guadalupe", description: "Representación del Cristo de San Juan de la Cruz.", price: "250.000", image: "MEDIA/VIRGEN DE GUADALUPE POLICERAMICA.jpeg", material: "Policeramica", size: "30cm", details: "Técnica italiana al horno" },
            { name: "San Miguel arcángel ", description: "Doctora de la Iglesia y reformadora carmelita.", price: "250.000", image: "MEDIA/SAN MIGUEL ARCANGEL POLICERAMICA.jpeg", material: "Policeramica", size: "30cm", details: "Técnica italiana al horno" },
            { name: "Cristo trinitario", description: "Representación del Cristo de San Juan de la Cruz.", price: "70.000", image: "MEDIA/CRISTO TRINITARIO.jpeg", material: "Cerámica italiana", size: "cm", details: "Técnica italiana al horno" },
            { name: "Arcángel San Miguel", description: "Doctora de la Iglesia y reformadora carmelita.", price: "160.000", image: "MEDIA/ARCANGEL SAN MIGUEL POLICERAMICA.jpeg", material: "Policerámica ", size: "30 cm", details: "Técnica italiana al horno" },
            { name: "Arcángel San Gabriel", description: "Representación del Cristo de San Juan de la Cruz.", price: "150.000", image: "MEDIA/ARCANGEL SAN GABRIEL POLICERAMICA.jpeg", material: "Policeramica", size: "30cm", details: "Técnica italiana al horno" },
            { name: "Arcángel San  Rafael  ", description: "Doctora de la Iglesia y reformadora carmelita.", price: "150.000", image: "MEDIA/ARCANGEL SAN RAFAEL POLICERAMICA.jpeg", material: "Policeramica", size: "30cm", details: "Técnica italiana al horno" },
            { name: "Carlo acutis", description: "Representación del Cristo de San Juan de la Cruz.", price: "60.000", image: "MEDIA/CARLOS ACUTIS.jpeg", material: "Cerámica italiana", size: "5 Pulgadas", details: "Técnica italiana al horno" },
            { name: "Virgen de Guadalupe", description: "Doctora de la Iglesia y reformadora carmelita.", price: "120.000", image: "MEDIA/VIRGEN DE GUADALUPE POLICERAMICA 2.jpeg", material: "Policeramica", size: "15cm", details: "Técnica italiana al horno" },
            { name: "Milagroso de buga", description: "Representación del Cristo de San Juan de la Cruz.", price: "40.000", image: "MEDIA/MILAGROSO DE BUGA.jpeg", material: "pPoliceramica", size: "5 Pulgadas", details: "Técnica italiana al horno" },
            { name: "Virgen del Rosario ", description: "Doctora de la Iglesia y reformadora carmelita.", price: "120.000", image: "MEDIA/VIRGEN DEL ROSARIO POLICERAMICA.jpeg", material: "Policeramica", size: "15cm", details: "Técnica italiana al horno" },
            { name: "Virgen María reina de la paz ", description: "Representación del Cristo de San Juan de la Cruz.", price: "140.000", image: "MEDIA/VIRGEN MARIA REINA DE LA PAZ POLICERAMICA.jpeg", material: "Policeramica", size: "15 Pulgadas", details: "Técnica italiana al horno" },
            { name: "Beso de San José", description: "Doctora de la Iglesia y reformadora carmelita.", price: "160.000", image: "MEDIA/BESO DE SAN JOSE.jpeg", material: "Policeramica", size: "20 Pulgadas", details: "Técnica italiana al horno" },
            { name: "Virgen del Carmen", description: "Representación del Cristo de San Juan de la Cruz.", price: "140.000", image: "MEDIA/VIRGEN DEL CARMEN POLICERAMICA.jpeg", material: "Policeramica", size: "30cm", details: "Técnica italiana al horno" }
        ]
    },
    rosaries: {
        items: [
            { name: "Rosario novena de San Jose", description: "Rosario artesanal con cuentas de madera de olivo traída de Tierra Santa, bendecido en Jerusalén.", price: "15.000", image: "MEDIA/ROSARIO NOVENA A SAN JOSE.jpeg", material: "Madera de olivo", size: "cm", details: "Bendecido en Jerusalén" },
            { name: "Denario de San José ", description: "Rosario delicado con cuentas de pétalos de rosa natural prensados, con aroma suave y duradero.", price: "12.000", image: "MEDIA/DENARIO DE SAN JOSE.jpeg", material: "Pétalos de rosa", size: "cm", details: "Aroma natural" },
            { name: "Rosario de Cristal Swarovski", description: "Rosario elegante con cuentas de cristal Swarovski auténtico que refleja la luz divinamente.", price: "85.000", image: "MEDIA/rosario3.jpg", material: "Cristal Swarovski", size: "48cm", details: "Elegante y luminoso" }
        ]
    },
    medals: {
        items: [
            { name: "Medallón de San Benito acero ", description: "Medallón protector de San Benito en acero inoxidable con todas las inscripciones sagradas para protección espiritual.", price: "85.000", image: "MEDIA/MEDALLON SAN BEDITO 13X13.jpeg", material: "Acero", size: "13x13cm", details: "Protección contra el mal" },
            { name: "Medalla de San Benito", description: "Medalla protectora contra el mal con inscripciones sagradas de exorcismo, bañada en oro de 18k.", price: "80.000", image: "MEDIA/MEDALLON DE SAN BENITO.jpeg", material: "Metal bañado en oro", size: "3cm", details: "Exorcismo y protección" },
            { name: "Medallón de Ángel Custodio", description: "Medallón con imagen del ángel de la guarda para protección diaria de niños y adultos.", price: "18.000", image: "MEDIA/medallon.jpg", material: "Plata con esmalte", size: "3.5cm", details: "Para niños y adultos" }
        ]
    },
    amulets: {
        items: [
            { name: "Amuleto de San Miguel arcánge", description: "Amuleto de protección contra el mal de ojo elaborado en plata 925, símbolo de protección divina.", price: "25.000", image: "MEDIA/AMULETO SAN MIGUEL.png", material: "", size: "", details: "Contra envidias y malas energías" },
            { name: "Pulsera de San Miguel arcángel con novena", description: "Protección tradicional contra energías negativas y mal de ojo, en cristal azul auténtico.", price: "15.000", image: "MEDIA/PULSERA DE SAN MIGUEL ARCANGEL CON NOVENA.jpeg", material: "Cristal azul", size: "", details: "Protección contra el mal de ojo" },
            { name: "Escudo de fe", description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.", price: "40.000", image: "MEDIA/ECUDO DE FE.jpeg", material: "Plata y esmalte", size: "cm", details: "Protección contra maleficios" },
            { name: "Escudo de fe", description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.", price: "40.000", image: "MEDIA/ESCUDO DE FE 2.jpeg", material: "Plata y esmalte", size: "cm", details: "Protección contra maleficios" },
            { name: "Llavero divina protección", description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.", price: "69.000", image: "MEDIA/LLAVERO DIVINA PROTECCION.jpeg", material: "Plata y esmalte", size: "cm", details: "Protección contra maleficios" },
            { name: "Llavero bendición del hogar", description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.", price: "80.000", image: "MEDIA/LLAVERO BENDICION DEL HOGAR.jpeg", material: "Plata y esmalte", size: "cm", details: "Protección contra maleficios" },
            { name: "Pulsera de protección del sagrado corazón", description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.", price: "40.000", image: "MEDIA/PULSERA DE PROTECCION DEL SAGRADO CORAZON.jpeg", material: "Plata y esmalte", size: "cm", details: "Protección contra maleficios" },
            { name: "Pulsera milagrosa", description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.", price: "40.000", image: "MEDIA/PULSERA MILAGROSA.jpeg", material: "", size: "cm", details: "Protección contra maleficios" },
            { name: "Bendición para el hogar", description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.", price: "50.000", image: "MEDIA/BENDICION PARA EL HOGAR.jpeg", material: "P", size: "cm", details: "Protección contra maleficios" },
            { name: "Llavero  San Benito", description: "Cruz de doble travesaño con propiedades protectoras contra maleficios y energías negativas.", price: "50.000", image: "MEDIA/LLAVERO DE SAN BENITO.jpeg", material: "", size: "cm", details: "Protección contra maleficios" }
        ]
    },
    scapulars: {
        items: [
            { name: "Pulsera con escapulario", description: "Escapulario del Carmen con bordados artesanales, promesa de salvación el sábado siguiente a la muerte.", price: "25.000", image: "MEDIA/PULSERA CON ESCAPULARIO.jpeg", material: "", size: "", details: "Promesa del sábado siguiente a la muerte" }
        ]
    },
    liturgical: {
        items: [
            { name: "Caliz misionero", description: "Elemento sagrado para la celebración eucarística, fabricado con materiales de alta calidad.", price: "250.000", image: "MEDIA/CALIZ MISIONEROS.jpeg", material: "", size: "", details: "Para uso en celebraciones litúrgicas" },
            { name: "Sirio en cera de abeja x1", description: "Pieza ceremonial utilizada en rituales religiosos con simbolismo espiritual profundo.", price: "25.000", image: "MEDIA/SIRIO EN CERA DE ABEJA.jpeg", material: "Metal plateado y esmalte", size: "", details: "Consagrado para uso litúrgico" },
            { name: "Objeto Litúrgico de Altar 3", description: "Instrumento ceremonial para ceremonias religiosas con acabados artesanales detallados.", price: "150.000", image: "MEDIA/liturgical3.jpg", material: "Bronce y piedras preciosas", size: "30x18cm", details: "Para uso exclusivo en celebraciones" },
            { name: "Elemento Litúrgico Ceremonial 1", description: "Herramienta sagrada utilizada en rituales de consagración y bendición.", price: "95.000", image: "MEDIA/liturgical4.jpg", material: "Latón y cristal", size: "22x14cm", details: "Para ceremonias especiales" },
            { name: "Elemento Litúrgico Ceremonial 2", description: "Accesorio ritual con significado simbólico profundo en la tradición cristiana.", price: "110.000", image: "MEDIA/liturgical5.jpg", material: "Plata y madera noble", size: "18x10cm", details: "Con simbolismo espiritual" },
            { name: "Elemento Litúrgico Ceremonial 3", description: "Utensilio sagrado para ceremonias litúrgicas con diseño tradicional y significado teológico.", price: "130.000", image: "MEDIA/liturgical6.jpg", material: "Metal dorado y terciopelo", size: "28x16cm", details: "Para uso en celebraciones solemnes" },
            { name: "Accesorio Litúrgico Ritual 1", description: "Pieza ceremonial utilizada en servicios religiosos con valor simbólico y espiritual.", price: "75.000", image: "MEDIA/liturgical7.jpg", material: "Cobre y esmalte vitral", size: "15x8cm", details: "Para rituales litúrgicos" },
            { name: "Accesorio Litúrgico Ritual 2", description: "Objeto sagrado para ceremonias religiosas con diseño inspirado en la tradición eclesial.", price: "105.000", image: "MEDIA/liturgical8.jpg", material: "Alpaca y piedras semipreciosas", size: "20x12cm", details: "Para uso ceremonial" },
            { name: "Accesorio Litúrgico Ritual 3", description: "Instrumento litúrgico para celebraciones religiosas con acabados artesanales y significado teológico.", price: "140.000", image: "MEDIA/liturgical9.jpg", material: "Plata esterlina y marfil vegetal", size: "25x15cm", details: "Para ceremonias litúrgicas" }
        ]
    }
};

/* ---------- GENERAR PRODUCTOS ---------- */
const BADGE_MAP = {
    saints: 'SANTO',
    rosaries: 'ROSARIO',
    medals: 'MEDALLA',
    amulets: 'AMULETO',
    scapulars: 'ESCAPULARIO',
    liturgical: 'LITÚRGICO'
};

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function generateProducts() {
    Object.keys(productCategories).forEach(category => {
        const catData = productCategories[category];
        const gridElement = document.getElementById(`${category}Grid`);
        if (!gridElement) return;

        gridElement.innerHTML = '';

        catData.items.forEach((product) => {
            const card = document.createElement('div');
            card.className = 'product-card visible';

            const safeName = escapeHtml(product.name);
            const safeDesc = escapeHtml(product.description);
            const safeImage = escapeHtml(product.image);
            const safeMaterial = escapeHtml(product.material || '—');
            const safeSize = escapeHtml(product.size || '—');
            const safePrice = escapeHtml(product.price);
            const badge = BADGE_MAP[category] || category.toUpperCase();

            const fallback = `https://via.placeholder.com/300x200/f0e6d3/5d4c34?text=${encodeURIComponent((product.name || '').substring(0, 15))}`;

            card.innerHTML = `
                <div class="product-image">
                    <span class="product-badge">${badge}</span>
                    <img src="${safeImage}" alt="${safeName}" loading="lazy" data-protected="true"
                         onerror="this.onerror=null;this.src='${fallback}';this.style.objectFit='contain';">
                </div>
                <div class="product-info">
                    <h3>${safeName}</h3>
                    <p class="product-description">${safeDesc}</p>
                    <div class="product-details">
                        <div><i class="fas fa-ruler"></i> ${safeSize}</div>
                        <div><i class="fas fa-cube"></i> ${safeMaterial}</div>
                    </div>
                    <div class="product-price">${safePrice}</div>
                    <button class="btn-add-to-cart" type="button"
                            data-product='${JSON.stringify(product).replace(/'/g, "&#39;")}'>
                        Añadir al Carrito
                    </button>
                </div>
            `;
            gridElement.appendChild(card);
        });
    });
}

function animateProductCards(category) {
    const grid = document.getElementById(`${category}Grid`);
    if (!grid) return;
    grid.querySelectorAll('.product-card').forEach(card => {
        card.classList.add('visible');
    });
}

/* ---------- AÑADIR AL CARRITO ---------- */
document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-add-to-cart');
    if (!btn) return;

    if (!rateLimiter.check('addToCart', 10, 60000)) {
        console.warn('Rate limit');
        return;
    }

    const raw = btn.getAttribute('data-product');
    if (!raw) return;

    let productData;
    try {
        productData = JSON.parse(raw.replace(/&#39;/g, "'"));
    } catch (err) { return; }

    showToast(`<i class="fas fa-check-circle"></i> <span>${escapeHtml(productData.name)} añadido al carrito</span>`);

    setTimeout(() => showWhatsappPrompt(productData), 900);
});

function showToast(html, duration = 3200) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position:fixed; top:100px; right:24px;
        background:linear-gradient(135deg, #1E3A2F, #2C5142);
        color:#F5E6C3; padding:16px 24px;
        border-radius:14px; border-left:4px solid #D4AF37;
        box-shadow:0 14px 40px rgba(0,0,0,0.28);
        z-index:10001; font-weight:600; font-size:0.88rem;
        display:flex; align-items:center; gap:10px;
        max-width:340px; letter-spacing:0.3px;
        transform:translateX(400px); transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);
    `;
    toast.innerHTML = html;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.transform = 'translateX(0)');

    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

function showWhatsappPrompt(productData) {
    const box = document.createElement('div');
    box.style.cssText = `
        position:fixed; top:170px; right:24px;
        background:#FDFBF7; color:#2C2622;
        padding:22px; border-radius:18px;
        box-shadow:0 20px 50px rgba(0,0,0,0.2);
        z-index:10001; border:1.5px solid rgba(212,175,55,0.4);
        max-width:320px; transform:translateX(400px);
        transition:transform 0.4s cubic-bezier(0.4,0,0.2,1);
        font-size:0.85rem;
    `;
    box.innerHTML = `
        <button style="position:absolute;top:8px;right:12px;background:none;border:none;
                       color:#9C8E80;font-size:1.4rem;cursor:pointer;line-height:1;"
                aria-label="Cerrar">×</button>
        <p style="margin:0 0 14px;font-weight:700;color:#1A1614;font-size:0.95rem;padding-right:20px;">
            ¿Deseas pedir este producto?
        </p>
        <a href="https://wa.me/573008486851?text=Hola,%20me%20interesa%20el%20producto:%20${encodeURIComponent(productData.name)}%20por%20$${encodeURIComponent(productData.price)}"
           target="_blank" rel="noopener noreferrer"
           style="display:inline-flex;align-items:center;gap:10px;background:linear-gradient(135deg,#25D366,#128C7E);
                  color:white;padding:11px 20px;border-radius:50px;text-decoration:none;
                  font-weight:700;font-size:0.82rem;letter-spacing:0.5px;
                  box-shadow:0 6px 18px rgba(37,211,102,0.35);">
            <i class="fab fa-whatsapp" style="font-size:1.05rem;"></i> Pedir por WhatsApp
        </a>
    `;
    document.body.appendChild(box);
    requestAnimationFrame(() => box.style.transform = 'translateX(0)');

    const close = () => {
        box.style.transform = 'translateX(400px)';
        setTimeout(() => box.remove(), 400);
    };
    box.querySelector('button').addEventListener('click', close);
    setTimeout(() => { if (document.body.contains(box)) close(); }, 12000);
}

/* ---------- BUSCADOR ---------- */
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResultsInfo = document.getElementById('searchResultsInfo');
    const searchResultsText = document.getElementById('searchResultsText');
    const noResults = document.getElementById('noResults');
    const suggestionTags = document.querySelectorAll('.suggestion-tag');

    if (!searchInput || !searchButton) return;

    function performSearch() {
        if (!rateLimiter.check('search', 20, 30000)) return;
        const term = searchInput.value.trim().toLowerCase();

        searchResultsInfo.classList.remove('show');
        noResults.classList.remove('show');

        if (term === '') { showAllProducts(); return; }

        let totalFound = 0;

        Object.keys(productCategories).forEach(category => {
            const grid = document.getElementById(`${category}Grid`);
            if (!grid) return;
            const cards = grid.querySelectorAll('.product-card');
            let foundInCat = 0;

            cards.forEach(card => {
                const name = card.querySelector('h3').textContent.toLowerCase();
                const desc = card.querySelector('.product-description').textContent.toLowerCase();
                const badge = card.querySelector('.product-badge').textContent.toLowerCase();

                if (name.includes(term) || desc.includes(term) || badge.includes(term)) {
                    card.style.display = 'flex';
                    foundInCat++;
                    totalFound++;
                } else {
                    card.style.display = 'none';
                }
            });

            const tabButton = document.querySelector(`.tab-button[data-tab="${category}"]`);
            const tabContent = document.getElementById(`${category}-tab`);
            if (foundInCat > 0) {
                if (tabContent) tabContent.style.display = 'block';
                if (tabButton) tabButton.style.display = 'inline-flex';
            } else {
                if (tabContent) tabContent.style.display = 'none';
                if (tabButton) tabButton.style.display = 'none';
            }
        });

        if (totalFound > 0) {
            searchResultsText.textContent = `Encontramos ${totalFound} producto${totalFound !== 1 ? 's' : ''} que coinciden con "${term}"`;
            searchResultsInfo.classList.add('show');

            const visibleTabs = document.querySelectorAll('.tab-button[style*="display: inline-flex"], .tab-button[style*="display:inline-flex"]');
            if (visibleTabs.length > 0) {
                const first = visibleTabs[0];
                const tabId = first.getAttribute('data-tab');
                document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                first.classList.add('active');
                const content = document.getElementById(`${tabId}-tab`);
                if (content) content.classList.add('active');
            }
        } else {
            noResults.classList.add('show');
            Object.keys(productCategories).forEach(category => {
                const grid = document.getElementById(`${category}Grid`);
                if (grid) grid.querySelectorAll('.product-card').forEach(c => c.style.display = 'none');
            });
        }
    }

    function showAllProducts() {
        Object.keys(productCategories).forEach(category => {
            const grid = document.getElementById(`${category}Grid`);
            if (grid) grid.querySelectorAll('.product-card').forEach(c => c.style.display = 'flex');

            const tabButton = document.querySelector(`.tab-button[data-tab="${category}"]`);
            const tabContent = document.getElementById(`${category}-tab`);
            if (tabContent) tabContent.style.display = 'block';
            if (tabButton) tabButton.style.display = 'inline-flex';
        });

        const first = document.querySelector('.tab-button');
        if (first) {
            document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            first.classList.add('active');
            const content = document.getElementById(`${first.dataset.tab}-tab`);
            if (content) content.classList.add('active');
        }

        searchResultsInfo.classList.remove('show');
        noResults.classList.remove('show');
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', e => { if (e.key === 'Enter') performSearch(); });

    suggestionTags.forEach(tag => {
        tag.addEventListener('click', function() {
            searchInput.value = this.getAttribute('data-search');
            performSearch();
        });
    });
}

/* ---------- TOP BANNER ---------- */
function initializeConstructionAlert() {
    const alertEl = document.getElementById('constructionAlert');
    const closeBtn = document.getElementById('closeAlert');
    if (!alertEl) return;

    const closed = localStorage.getItem('topBannerClosed');
    if (closed === 'true') {
        alertEl.classList.add('hidden');
        document.body.classList.add('banner-hidden');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            alertEl.classList.add('hidden');
            document.body.classList.add('banner-hidden');
            localStorage.setItem('topBannerClosed', 'true');
        });
    }
}

/* ---------- TABS ---------- */
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            button.classList.add('active');
            const content = document.getElementById(`${tabId}-tab`);
            if (content) content.classList.add('active');
        });
    });
}

/* ---------- MOBILE MENU ---------- */
function initializeMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mainNav');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        nav.classList.toggle('active');
        btn.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            btn.classList.remove('active');
        });
    });
}

/* ---------- SCROLL SPY ---------- */
function initializeScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.clientHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
                });
            }
        });

        const header = document.getElementById('mainHeader');
        if (header) header.classList.toggle('scrolled', window.scrollY > 30);

        const backTop = document.getElementById('backToTop');
        if (backTop) backTop.classList.toggle('visible', window.scrollY > 400);
    });
}

/* ---------- SMOOTH SCROLL ---------- */
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = target.offsetTop - 80;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
}

/* ---------- MODAL ---------- */
function initializeModal() {
    const modal = document.getElementById('imageModal');
    const closeBtn = document.getElementById('closeModal');
    if (!modal || !closeBtn) return;

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', e => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ---------- BACK TO TOP ---------- */
function initializeBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    btn.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ---------- AÑO ACTUAL ---------- */
function updateYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
}

/* ---------- PRELOADER ---------- */
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    document.body.style.overflow = 'hidden';
    const start = Date.now();
    const MIN_TIME = 1400;

    function hide() {
        const elapsed = Date.now() - start;
        const wait = Math.max(MIN_TIME - elapsed, 0);
        setTimeout(() => {
            preloader.classList.add('loaded');
            document.body.style.overflow = '';
            setTimeout(() => { preloader.style.display = 'none'; }, 900);
        }, wait);
    }

    if (document.readyState === 'complete') hide();
    else window.addEventListener('load', hide);

    setTimeout(() => {
        if (preloader && !preloader.classList.contains('loaded')) hide();
    }, 4500);
}

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', function() {
    // Primero la seguridad
    initSecurity();

    // Luego el sitio
    initializeConstructionAlert();
    initializePreloader();
    generateProducts();
    initializeTabs();
    initializeSearch();
    initializeMobileMenu();
    initializeScrollSpy();
    initializeSmoothScroll();
    initializeModal();
    initializeBackToTop();
    updateYear();
});