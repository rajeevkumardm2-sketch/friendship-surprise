/**
 * Production-ready script.js for Friendship Day Experience
 * Features: High-performance Particle Engine, Intersection Observers, and Cinematic UI Transitions
 */

"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // --- Selectors ---
    const startBtn = document.getElementById('start-btn');
    const bgMusic = document.getElementById('bg-music');
    const introOverlay = document.getElementById('intro-overlay');
    const mainContent = document.getElementById('main-content');
    const openLetterBtn = document.getElementById('open-letter-btn');
    const letterModal = document.getElementById('letter-modal');
    const canvas = document.getElementById('canvas');
    const closeBtns = document.querySelectorAll('.close-btn');
    const memoryCards = document.querySelectorAll('.memory-card');
    const mainWish = document.querySelector('.main-wish');

    const ctx = canvas.getContext('2d');

    // --- State Management ---
    let animationFrameId;
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    let isPaused = false;

    // --- Particle Engine ---
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height + canvas.height; // Start from bottom
            this.size = Math.random() * 5 + 2;
            this.speedY = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 2 - 1;
            this.type = Math.floor(Math.random() * 3); // 0: Sparkle, 1: Petal, 2: Heart
            this.opacity = Math.random() * 0.5 + 0.3;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = Math.random() * 0.02 - 0.01;
            this.color = this.getRandomColor();
        }

        getRandomColor() {
            const types = [
                'rgba(255, 215, 0, ', // Gold
                'rgba(255, 182, 193, ', // Rose Pink
                'rgba(255, 105, 180, '  // Hot Pink
            ];
            return types[this.type];
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();

            if (this.type === 0) {
                // Golden Sparkle (Star shape)
                ctx.shadowBlur = 10;
                ctx.shadowColor = "gold";
                for (let i = 0; i < 5; i++) {
                    ctx.lineTo(0, -this.size);
                    ctx.rotate(Math.PI / 5);
                    ctx.lineTo(0, -this.size / 2);
                    ctx.rotate(Math.PI / 5);
                }
                ctx.fillStyle = "gold";
                ctx.fill();
            } else if (this.type === 1) {
                // Rose Petal
                ctx.ellipse(0, 0, this.size, this.size * 1.5, 0, 0, Math.PI * 2);
                ctx.fillStyle = this.color + '1)';
                ctx.fill();
            } else {
                // Floating Heart
                const s = this.size;
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(-s, -s, -s * 2, s / 3, 0, s * 1.5);
                ctx.bezierCurveTo(s * 2, s