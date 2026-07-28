/**
 * Friendship Day Experience - Production Script
 * Fully compatible with existing index.html and style.css
 */

"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const introOverlay = document.getElementById('intro-overlay');
    const startBtn = document.getElementById('start-btn');
    const bgMusic = document.getElementById('bg-music');
    const mainContent = document.getElementById('main-content');
    const openLetterBtn = document.getElementById('open-letter-btn');
    const letterModal = document.getElementById('letter-modal');
    const canvas = document.getElementById('canvas');
    const mainWish = document.querySelector('.main-wish');
    const memoryCards = document.querySelectorAll('.memory-card');
    const closeBtns = document.querySelectorAll('.close-btn');
    const modalOverlay = document.querySelector('.modal-overlay');

    const ctx = canvas.getContext('2d');

    // --- State ---
    let particles = [];
    let animationFrameId;
    let isExperienceStarted = false;

    // --- Particle Engine ---
    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 4 + 2;
            this.speedY = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 2 - 1;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = Math.random() * 0.04 - 0.02;
            
            // Types: 0 = Gold Sparkle, 1 = Rose Petal, 2 = Floating Heart
            this.type = Math.floor(Math.random() * 3);
            
            const colors = {
                gold: ['#D4AF37', '#F9E29C', '#FFD700'],
                rose: ['#FFB6C1', '#FF69B4', '#F08080'],
                heart: ['#FF0000', '#FF3855', '#FD3A4A']
            };

            if (this.type === 0) this.color = colors.gold[Math.floor(Math.random() * 3)];
            else if (this.type === 1) this.color = colors.rose[Math.floor(Math.random() * 3)];
            else this.color = colors.heart[Math.floor(Math.random() * 3)];

            this.opacity = Math.random() * 0.6 + 0.4;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;

            if (this.type === 0) { // Gold Sparkle
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    ctx.lineTo(0, -this.size);
                    ctx.rotate(Math.PI / 5);
                    ctx.lineTo(0, -this.size / 2);
                    ctx.rotate(Math.PI / 5);
                }
                ctx.fill();
            } else if (this.type === 1) { // Rose Petal
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size, this.size * 1.5, 0, 0, Math.PI * 2);
                ctx.fill();
            } else { // Heart
                const s = this.size;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-s, -s, -s * 2, s / 3, 0, s * 1.5);
                ctx.bezierCurveTo(s * 2, s / 3, s, -s, 0, 0);
                ctx.fill();
            }
            ctx.restore();
        }

        update() {
            this.y -= this.speedY;
            this.x += Math.sin(this.y / 60) * 0.5 + this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y < -50) {
                this.init();
            }
        }
    }

    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    const createParticles = () => {
        const count = window.innerWidth < 768 ? 40 : 90;
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        animationFrameId = requestAnimationFrame(animate);
    };

    // --- Core Interaction Logic ---

    // 1. Enter Experience
    startBtn.addEventListener('click', () => {
        // Fade out transition
        introOverlay.style.opacity = '0';
        introOverlay.style.transition = 'opacity 1s ease';

        // Play music (handle browser autoplay policy)
        if (bgMusic) {
            bgMusic.play().catch(err => console.log("Audio play blocked by browser."));
        }

        setTimeout(() => {
            introOverlay.classList.add('hidden');
            mainContent.classList.remove('hidden');
            
            // Animation for main wish
            if (mainWish) {
                mainWish.style.animation = 'fadeInUp 1.5s forwards';
            }

            setCanvasSize();
            createParticles();
            animate();
            isExperienceStarted = true;
        }, 1000);
    });

    // 2. Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.15
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    memoryCards.forEach(card => cardObserver.observe(card));

    // 3. Modal Controls
    const openModal = () => {
        letterModal.classList.remove('hidden');
    };

    const closeModal = () => {
        letterModal.classList.add('hidden');
    };

    openLetterBtn.addEventListener('click', openModal);
    
    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // 4. Lifecycle & Responsiveness
    window.addEventListener('resize', () => {
        if (isExperienceStarted) {
            setCanvasSize();
            createParticles();
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else if (isExperienceStarted) {
            animate();
        }
    });

});```