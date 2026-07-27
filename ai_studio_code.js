document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const audio = document.getElementById('bg-music');
    const intro = document.getElementById('scene-1');
    const mainWrapper = document.getElementById('main-wrapper');
    const heartBtn = document.querySelector('.open-heart-btn');
    const modal = document.getElementById('letter-modal');
    const closeModal = document.querySelector('.close-modal');

    // 1. Start Experience
    startBtn.addEventListener('click', () => {
        intro.style.opacity = '0';
        setTimeout(() => {
            intro.classList.add('hidden');
            mainWrapper.classList.remove('hidden');
            audio.play();
            revealWish();
        }, 1500);
    });

    // 2. Reveal Wish Animation
    function revealWish() {
        const wishText = document.querySelector('.wish-text');
        wishText.classList.add('visible');
    }

    // 3. Scroll Reveal for Memories
    window.addEventListener('scroll', () => {
        const cards = document.querySelectorAll('.memory-card');
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < window.innerHeight - 100) {
                card.classList.add('show');
            }
        });
    });

    // 4. Heart Modal Logic
    heartBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        startPetals();
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // 5. Cinematic Rose Petals & Sparkles Effect
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height - canvas.height;
            this.size = Math.random() * 5 + 2;
            this.speed = Math.random() * 2 + 1;
            this.angle = Math.random() * 360;
            this.spin = Math.random() < 0.5 ? -1 : 1;
            this.color = Math.random() > 0.5 ? '#D4AF37' : '#ff4d4d'; // Gold & Rose Red
        }
        update() {
            this.y += this.speed;
            this.angle += this.spin;
            if (this.y > canvas.height) {
                this.y = -20;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle * Math.PI / 180);
            ctx.fillStyle = this.color;
            ctx.beginPath();
            // Drawing a simple petal shape
            ctx.ellipse(0, 0, this.size, this.size * 1.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < 70; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    function startPetals() {
        initParticles();
        animate();
    }
});