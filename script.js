/**
 * ChromaMatch - Premium Edition
 * High-quality icon matching with advanced audio and visual effects
 */

// --- Audio System ---
class CyberAudio {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.25;
        this.masterGain.connect(this.ctx.destination);
    }

    playTone(freq, type, duration, release = 0.1) {
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration + release);

        osc.connect(gain);
        gain.connect(this.masterGain);
        
        osc.start();
        osc.stop(this.ctx.currentTime + duration + release);
    }

    playChord(notes, type = 'sine', duration = 0.5) {
        notes.forEach(note => this.playTone(note, type, duration));
    }

    sfxClick() { this.playTone(1200, 'sine', 0.03); }
    sfxHover() { this.playTone(600, 'sine', 0.02); }
    
    sfxMatch() {
        this.playChord([523.25, 659.25, 783.99], 'sine', 0.5);
        setTimeout(() => this.playChord([1046.50], 'triangle', 0.3), 150);
    }

    sfxError() {
        this.playTone(180, 'sawtooth', 0.25);
    }

    sfxWin() {
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((note, i) => {
            setTimeout(() => this.playTone(note, 'sine', 0.25), i * 120);
        });
    }

    sfxStart() {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(200, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1000, this.ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.4);
        
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.4);
    }
}

// --- Premium Icon Set (Font Awesome style paths) ---
const ICON_SET = [
    { name: 'rocket', path: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', color: '#00f3ff' },
    { name: 'star', path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', color: '#ffd60a' },
    { name: 'heart', path: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z', color: '#ff006e' },
    { name: 'bolt', path: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', color: '#ffd60a' },
    { name: 'shield', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', color: '#8b5cf6' },
    { name: 'diamond', path: 'M6 9l6-7 6 7-6 13-6-13z', color: '#00f3ff' },
    { name: 'cube', path: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', color: '#a855f7' },
    { name: 'crown', path: 'M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14', color: '#ffd60a' },
    { name: 'flame', path: 'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.3z', color: '#f97316' },
    { name: 'moon', path: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z', color: '#8b5cf6' },
    { name: 'sun', path: 'M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42', color: '#ffd60a' },
    { name: 'cloud', path: 'M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z', color: '#06b6d4' },
    { name: 'umbrella', path: 'M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7', color: '#ec4899' },
    { name: 'anchor', path: 'M12 17a5 5 0 0 0-5-5M12 17a5 5 0 0 1 5-5M12 17v4M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m0 0v4', color: '#0891b2' },
    { name: 'compass', path: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z', color: '#10b981' },
    { name: 'target', path: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z', color: '#ef4444' },
    { name: 'gift', path: 'M20 12v10H4V12M2 7h20v5H2zm10 15V7m0 0H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zm0 0h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z', color: '#ec4899' },
    { name: 'key', path: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4', color: '#f59e0b' },
    { name: 'bell', path: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0', color: '#fbbf24' },
    { name: 'camera', path: 'M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', color: '#06b6d4' },
    { name: 'music', path: 'M9 18V5l12-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3m12 0a3 3 0 1 1-3-3 3 3 0 0 1 3 3', color: '#a855f7' },
    { name: 'headphones', path: 'M3 18v-6a9 9 0 0 1 18 0v6M3 18a3 3 0 0 0 3 3h3v-6H3zm18 0a3 3 0 0 1-3 3h-3v-6h6z', color: '#8b5cf6' },
    { name: 'wifi', path: 'M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01', color: '#00f3ff' },
    { name: 'battery', path: 'M6 7h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm17 5h-2', color: '#22c55e' },

    { name: 'award', path: 'M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.21 13.89L7 23l5-3 5 3-1.21-9.12', color: '#ffd60a' },
    { name: 'bookmark', path: 'M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z', color: '#ec4899' },
    { name: 'flag', path: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7', color: '#ef4444' },
    { name: 'map', path: 'M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4zm7-4v16m8-12v16', color: '#10b981' },
    { name: 'inbox', path: 'M22 12h-6l-2 3h-4l-2-3H2M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z', color: '#06b6d4' },
    { name: 'feather', path: 'M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5zM16 8L2 22M17.5 15H9', color: '#a855f7' },
    { name: 'droplet', path: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z', color: '#06b6d4' }
];

// --- Config ---
const LEVELS = {
    easy: { cols: 4, rows: 3, time: 45, pairs: 6 },
    medium: { cols: 4, rows: 4, time: 60, pairs: 8 },
    hard: { cols: 6, rows: 4, time: 90, pairs: 12 }
};

// --- State ---
let audio = new CyberAudio();
let currentState = {
    level: 'easy',
    flippedCards: [],
    matchedPairs: 0,
    score: 0,
    timer: 0,
    intervalId: null,
    isLocked: false,
    combo: 0,
    cardAttempts: {},
    highScore: 0
};


// --- DOM Elements ---
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gridElement = document.getElementById('game-grid');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const levelIndicator = document.querySelector('.level-indicator');
const gameOverModal = document.getElementById('game-over-modal');
const finalScoreElement = document.getElementById('final-score');
const resultTitle = document.getElementById('result-title');
const mobileWarning = document.getElementById('mobile-warning');
const highScoreDisplay = document.getElementById('high-score-display');

// --- Init ---
function init() {
    // Load High Score
    currentState.highScore = parseInt(localStorage.getItem('chromaMatchHighScore')) || 0;
    highScoreDisplay.textContent = currentState.highScore;

    gameOverModal.classList.add('hidden'); 
    gameOverModal.style.display = 'none';

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    document.querySelectorAll('.btn-difficulty').forEach(btn => {
        btn.addEventListener('mouseenter', () => audio.sfxHover());
        btn.addEventListener('click', () => {
            audio.sfxClick();
            startGame(btn.dataset.level);
        });
    });

    document.getElementById('btn-quit').addEventListener('click', () => {
        audio.sfxClick();
        quitGame();
    });
    
    document.getElementById('btn-home').addEventListener('click', () => {
        audio.sfxClick();
        quitGame();
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
        audio.sfxClick();
        closeModal();
        startGame(currentState.level);
    });
}

function checkScreenSize() {
    const isSmall = window.innerWidth < 500;
    mobileWarning.classList.toggle('hidden', !isSmall);
}

// --- Game Logic ---
function startGame(level) {
    audio.sfxStart();
    const config = LEVELS[level];
    
    currentState.level = level;
    currentState.score = 0;
    currentState.timer = config.time;
    currentState.matchedPairs = 0;
    currentState.flippedCards = [];
    currentState.isLocked = false;
    currentState.combo = 0;
    currentState.cardAttempts = {};
    
    startScreen.classList.remove('active');
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    gameScreen.classList.add('active');
    
    closeModal();

    levelIndicator.textContent = level.toUpperCase();
    scoreElement.textContent = '0';
    updateTimerDisplay();

    scoreElement.classList.remove('score-bump', 'score-drop');

    generateGrid(config);

    if (currentState.intervalId) clearInterval(currentState.intervalId);
    currentState.intervalId = setInterval(gameLoop, 1000);
}

function generateGrid(config) {
    gridElement.innerHTML = '';
    // Use columns for grid class (e.g., grid-4, grid-6)
    gridElement.className = `grid grid-${config.cols}`;
    
    const shuffledIcons = [...ICON_SET].sort(() => 0.5 - Math.random());
    const selectedIcons = shuffledIcons.slice(0, config.pairs);
    const gameDeck = [...selectedIcons, ...selectedIcons].sort(() => 0.5 - Math.random());
    
    gameDeck.forEach((icon, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.dataset.value = icon.name;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-front">
                    <div class="card-pattern"></div>
                </div>
                <div class="card-face card-back">
                    <svg viewBox="0 0 24 24" fill="none" stroke="${icon.color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="${icon.path}"/>
                    </svg>
                </div>
            </div>
        `;
        
        card.addEventListener('mouseenter', () => {
            if(!card.classList.contains('flipped') && !card.classList.contains('matched')) {
                audio.sfxHover();
            }
        });
        card.addEventListener('click', () => handleCardClick(card));
        gridElement.appendChild(card);
    });
}

function handleCardClick(card) {
    if (currentState.isLocked) return;
    if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

    audio.sfxClick();
    card.classList.add('flipped');
    currentState.flippedCards.push(card);

    if (currentState.flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    currentState.isLocked = true;
    const [card1, card2] = currentState.flippedCards;
    const match = card1.dataset.value === card2.dataset.value;

    if (match) {
        setTimeout(() => {
            audio.sfxMatch();
            card1.classList.add('matched');
            card2.classList.add('matched');
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');

            currentState.matchedPairs++;
            
            // --- Advanced Scoring System ---
            // COMBO Multiplier: Increases by 1 for every consecutive match
            currentState.combo++;
            const comboMultiplier = Math.min(currentState.combo, 5); // Max 5x multiplier

            // Base Points
            const basePoints = 100;
            
            // Time Bonus: Add 3 seconds for every match found
            const timeBonus = 3;
            
            // Calculate final points for this move
            const points = (basePoints * comboMultiplier);

            // Update State
            updateScore(points);
            currentState.timer += timeBonus;
            updateTimerDisplay(); 
            
            currentState.flippedCards = [];
            currentState.isLocked = false;
            checkWin();
        }, 400);
    } else {
        setTimeout(() => {
            audio.sfxError();
            currentState.combo = 0; // Reset combo on error
            
            card1.classList.add('shake-error');
            card2.classList.add('shake-error');
            
            setTimeout(() => {
                card1.classList.remove('flipped', 'shake-error');
                card2.classList.remove('flipped', 'shake-error');
                
                currentState.flippedCards = [];
                currentState.isLocked = false;
                
                // Penalty
                updateScore(-20);

            }, 500);
        }, 600);
    }
}

function updateScore(points) {
    currentState.score += points;
    if (currentState.score < 0) currentState.score = 0;
    
    scoreElement.classList.remove('score-bump', 'score-drop');
    void scoreElement.offsetWidth;
    
    if(points > 0) {
        scoreElement.classList.add('score-bump');
    } else {
        scoreElement.classList.add('score-drop');
    }
    
    scoreElement.textContent = currentState.score;
}

function gameLoop() {
    currentState.timer--;
    updateTimerDisplay();

    if (currentState.timer <= 0) {
        endGame(false);
    }
}

function updateTimerDisplay() {
    const m = Math.floor(currentState.timer / 60).toString().padStart(2, '0');
    const s = (currentState.timer % 60).toString().padStart(2, '0');
    timerElement.textContent = `${m}:${s}`;
    
    if (currentState.timer <= 10) {
        timerElement.parentElement.classList.add('critical');
    } else {
        timerElement.parentElement.classList.remove('critical');
    }
}

function checkWin() {
    const config = LEVELS[currentState.level];
    if (currentState.matchedPairs === config.pairs) {
        endGame(true);
    }
}

function endGame(win) {
    clearInterval(currentState.intervalId);
    
    if (win) {
        audio.sfxWin();
        const timeBonus = currentState.timer * 15;
        currentState.score += timeBonus;
        resultTitle.textContent = "MEMORY MASTER!";
        resultTitle.style.color = "#00f3ff";

        // Check High Score
        if (currentState.score > currentState.highScore) {
            currentState.highScore = currentState.score;
            localStorage.setItem('chromaMatchHighScore', currentState.highScore);
            highScoreDisplay.textContent = currentState.highScore;
            // Optional: New High Score SFX or visual cue could go here
        }
    } else {
        audio.sfxError();
        resultTitle.textContent = "TIME'S UP!";
        resultTitle.style.color = "#ef4444";
    }

    finalScoreElement.textContent = currentState.score;
    gameOverModal.classList.remove('hidden');
    gameOverModal.style.display = 'flex';
}

function quitGame() {
    if (currentState.intervalId) clearInterval(currentState.intervalId);
    
    gameScreen.classList.remove('active');
    gameScreen.classList.add('hidden');
    
    startScreen.classList.remove('hidden');
    startScreen.classList.add('active');
    
    currentState.flippedCards = [];
    closeModal();
}

function closeModal() {
    gameOverModal.classList.add('hidden');
    gameOverModal.style.display = 'none';
}

init();
