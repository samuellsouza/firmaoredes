/**
 * Berimbau Tela e Redes de Proteção - Script JavaScript Finalizado
 * Funcionalidades: Dark Mode, Menu Mobile, Navegação Suave, FAQ Accordion, 
 * Lightbox, Scroll to Top, Validação de Formulário
 */

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== DARK MODE FUNCTIONALITY =====
    const darkModeToggle = document.getElementById('darkModeToggle');
    const darkModeToggleMobile = document.getElementById('darkModeToggleMobile');
    const html = document.documentElement;

    // Verifica preferência salva ou usa modo claro como padrão
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        html.classList.add('dark');
    }

    function toggleDarkMode() {
        html.classList.toggle('dark');
        const theme = html.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    }

    // Event listeners para dark mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    if (darkModeToggleMobile) {
        darkModeToggleMobile.addEventListener('click', toggleDarkMode);
    }

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuContent = document.getElementById('mobileMenuContent');

    if (mobileMenu && mobileMenuContent) {
        mobileMenu.addEventListener('click', () => {
            mobileMenuContent.classList.toggle('hidden');
            const icon = mobileMenu.querySelector('i');
            
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
            
            // Atualiza atributo aria-expanded
            const isExpanded = mobileMenu.getAttribute('aria-expanded') === 'true';
            mobileMenu.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Compensa header fixo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Fecha menu mobile se estiver aberto
            if (mobileMenuContent) {
                mobileMenuContent.classList.add('hidden');
                const icon = mobileMenu?.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
                if (mobileMenu) {
                    mobileMenu.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // ===== FAQ ACCORDION =====
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const answer = faqItem?.querySelector('.faq-answer');
            const icon = question.querySelector('i');
            
            if (!faqItem || !answer) return;
            
            // Fecha todos os outros itens FAQ
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const itemAnswer = item.querySelector('.faq-answer');
                    const itemIcon = item.querySelector('.faq-question i');
                    
                    if (itemAnswer) {
                        itemAnswer.style.maxHeight = '0';
                    }
                    if (itemIcon) {
                        itemIcon.classList.remove('fa-chevron-up');
                        itemIcon.classList.add('fa-chevron-down');
                    }
                }
            });

            // Alterna item FAQ atual
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                if (icon) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
            } else {
                answer.style.maxHeight = '0';
                if (icon) {
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            }
        });
    });

    // ===== LIGHTBOX FUNCTIONALITY =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const closeLightbox = document.getElementById('closeLightbox');

    // Abre lightbox ao clicar em imagens da galeria
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            if (lightbox && lightboxImage && lightboxTitle) {
                lightboxImage.src = img.src;
                lightboxImage.alt = img.alt;
                lightboxTitle.textContent = img.alt || 'Imagem da Galeria';
                lightbox.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Previne scroll
            }
        });
    });

    // Fecha lightbox
    if (closeLightbox && lightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto'; // Restaura scroll
        });

        // Fecha lightbox ao clicar no overlay
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ===== SCROLL TO TOP BUTTON =====
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        // Mostra/esconde botão baseado na posição do scroll
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });

        // Scroll suave para o topo
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Elementos do formulário
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            const service = document.getElementById('service');
            const message = document.getElementById('message');
            const consent = document.getElementById('consent');
            
            // Elementos de erro
            const nameError = document.getElementById('nameError');
            const phoneError = document.getElementById('phoneError');
            const serviceError = document.getElementById('serviceError');
            const messageError = document.getElementById('messageError');
            
            let isValid = true;
            
            // Validação do nome
            if (!name?.value.trim()) {
                nameError?.classList.remove('hidden');
                name?.classList.add('border-red-500');
                isValid = false;
            } else {
                nameError?.classList.add('hidden');
                name?.classList.remove('border-red-500');
            }
            
            // Validação do telefone
            const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
            if (!phone?.value.trim() || !phoneRegex.test(phone.value)) {
                phoneError?.classList.remove('hidden');
                phone?.classList.add('border-red-500');
                isValid = false;
            } else {
                phoneError?.classList.add('hidden');
                phone?.classList.remove('border-red-500');
            }
            
            // Validação do serviço
            if (!service?.value) {
                serviceError?.classList.remove('hidden');
                service?.classList.add('border-red-500');
                isValid = false;
            } else {
                serviceError?.classList.add('hidden');
                service?.classList.remove('border-red-500');
            }
            
            // Validação da mensagem
            if (!message?.value.trim()) {
                messageError?.classList.remove('hidden');
                message?.classList.add('border-red-500');
                isValid = false;
            } else {
                messageError?.classList.add('hidden');
                message?.classList.remove('border-red-500');
            }
            
            // Validação do consentimento
            if (!consent?.checked) {
                alert('Por favor, aceite os termos de privacidade.');
                isValid = false;
            }
            
            if (isValid) {
                // Aqui você pode enviar o formulário
                // Por exemplo, via AJAX ou redirecionamento para WhatsApp
                const whatsappMessage = `Olá! Gostaria de solicitar um orçamento:
Nome: ${name?.value}
Telefone: ${phone?.value}
Email: ${email?.value || 'Não informado'}
Serviço: ${service?.value}
Descrição: ${message?.value}`;
                
                const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappUrl, '_blank');
                
                // Reset do formulário
                contactForm.reset();
                alert('Formulário enviado com sucesso! Você será redirecionado para o WhatsApp.');
            }
        });
        
        // Máscara para telefone
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length <= 11) {
                    value = value.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
                    e.target.value = value;
                }
            });
        }
    }

    // ===== TESTIMONIALS CAROUSEL (se existir) =====
    const testimonialContainer = document.querySelector('.testimonials-container');
    if (testimonialContainer) {
        let currentTestimonial = 0;
        const testimonials = testimonialContainer.querySelectorAll('.testimonial-card');
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }
        
        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }
        
        // Auto-rotate testimonials
        if (testimonials.length > 1) {
            showTestimonial(0);
            setInterval(nextTestimonial, 5000); // Muda a cada 5 segundos
        }
    }

    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Lazy loading para imagens (se suportado)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Debounce para eventos de scroll
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Aplica debounce ao scroll
    const debouncedScroll = debounce(() => {
        // Lógica de scroll otimizada
        if (scrollTopBtn) {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        }
    }, 100);

    window.addEventListener('scroll', debouncedScroll);

    // ===== ACCESSIBILITY IMPROVEMENTS =====
    
    // Navegação por teclado para elementos interativos
    document.querySelectorAll('.gallery-item, .service-card, .testimonial-card').forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
    });

    // Escape key para fechar lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && !lightbox.classList.contains('hidden')) {
            lightbox.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    console.log('Berimbau Tela e Redes de Proteção - Script carregado com sucesso!');
});

// ===== UTILITY FUNCTIONS =====

// Função para formatar telefone
function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
}

// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para smooth scroll personalizada (fallback)
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Exporta funções para uso global se necessário
window.BerimbauUtils = {
    formatPhone,
    validateEmail,
    smoothScrollTo
};