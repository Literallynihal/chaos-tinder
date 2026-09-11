// File: src/chaos.js

// 1. FAKE CURSOR
export function initFakeCursor() {
  const fakeCursor = document.createElement('div');
  fakeCursor.id = 'fake-cursor';
  document.body.appendChild(fakeCursor);

  let offsetX = 200; // Start offset

  document.addEventListener('mousemove', (e) => {
    // Randomly switch sides
    if (Math.random() < 0.02) {
      offsetX = Math.random() > 0.5 ? 200 : -200;
    }
    
    fakeCursor.style.left = (e.clientX + offsetX) + 'px';
    fakeCursor.style.top = (e.clientY + 30) + 'px';
  });
}

// 2. CHAOTIC SCROLL
export function initChaoticScroll() {
  let scrollPos = 0;
  
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    const chaos = Math.random();
    let amount = e.deltaY;
    
    if (chaos < 0.3) {
      amount = -amount * 2; // Opposite direction
    } else if (chaos > 0.8) {
      amount = amount * 4; // Overshoot
    }
    
    scrollPos += amount;
    window.scrollTo(0, scrollPos);
  }, { passive: false });
}

// 3. ELUSIVE LIKE BUTTON
export function initElusiveLikeButton() {
  const likeBtn = document.querySelector('.like-button');
  if (!likeBtn) return;

  let resetTimer;

  likeBtn.addEventListener('mouseenter', () => {
    const action = Math.random();
    
    if (action < 0.4) {
      // Teleport
      const newX = Math.random() * (window.innerWidth - 100);
      const newY = Math.random() * (window.innerHeight - 100);
      likeBtn.style.position = 'fixed';
      likeBtn.style.left = newX + 'px';
      likeBtn.style.top = newY + 'px';
    } else if (action < 0.7) {
      // Shrink
      likeBtn.style.transform = 'scale(0.2)';
    } else {
      // Camouflage
      likeBtn.style.opacity = '0.1';
    }

    // Reset after 2 seconds
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      likeBtn.style.transform = 'scale(1)';
      likeBtn.style.opacity = '1';
    }, 2000);
  });
}

// 4. AGGRESSIVE AUTO-COMPLETE
export function initAggressiveChat() {
  const completions = [
    " and I still sleep with my teddy bear",
    " but my horoscope said no",
    " because astrology is real",
    " ... wait, do you like pineapple on pizza?",
    " and I think the earth is flat",
    " but actually I'm 3 cats in a trenchcoat",
    " because my mom controls my life",
    " ... also I collect toenail clippings",
    " but I'm emotionally unavailable",
    " and I still ask my mom for permission"
  ];

  const chatInput = document.querySelector('#chat-input, input[type="text"], textarea');
  if (!chatInput) return;

  let charCount = 0;

  chatInput.addEventListener('input', (e) => {
    charCount++;
    
    // Every 4-7 characters, autocomplete
    if (charCount > 4 && Math.random() > 0.5) {
      const random = completions[Math.floor(Math.random() * completions.length)];
      e.target.value = e.target.value + random;
      charCount = 0;
      
      // Auto-send after 1 second
      setTimeout(() => {
        const sendBtn = document.querySelector('button[type="submit"], .send-button');
        if (sendBtn) sendBtn.click();
      }, 1000);
    }
  });
}

// Initialize all chaos
export function initAllChaos() {
  setTimeout(() => {
    initFakeCursor();
    initChaoticScroll();
    initElusiveLikeButton();
    initAggressiveChat();
    console.log('🎭 Chaos mode activated!');
  }, 1000);
}
