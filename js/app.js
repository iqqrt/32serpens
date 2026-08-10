/**
 * Main Application Logic & Phase Controller
 * Mengatur transisi alur cerita, modal dialog 33 maba, audio toggle, dan pencarian.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements Reference
  const canvasElement = document.getElementById('spaceCanvas');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const listToggleBtn = document.getElementById('listToggleBtn');

  // Story Phase Elements
  const cardPhase1 = document.getElementById('cardPhase1');
  const cardPhase2 = document.getElementById('cardPhase2');
  const cardPhase3 = document.getElementById('cardPhase3');
  const cardPhase5 = document.getElementById('cardPhase5');

  // Text positioning containers
  const textAbove = document.getElementById('textAbove');
  const belowConstellation = document.getElementById('belowConstellation');

  // Text Elements
  const quotePhase1 = document.getElementById('quoteTextPhase1');
  const quotePhase2 = document.getElementById('quoteTextPhase2');
  const titlePhase3 = document.getElementById('titlePhase3');

  // Buttons
  const btnStartPhase5 = document.getElementById('btnStartPhase5');
  const btnRestart = document.getElementById('btnRestart');

  // Modal Elements
  const menteeModal = document.getElementById('menteeModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const starNumberPill = document.getElementById('starNumberPill');
  const menteeAvatar = document.getElementById('menteeAvatar');
  const menteeName = document.getElementById('menteeName');
  const menteeStarTitle = document.getElementById('menteeStarTitle');
  const menteeMessageBox = document.getElementById('menteeMessageBox');
  const prevMenteeBtn = document.getElementById('prevMenteeBtn');
  const nextMenteeBtn = document.getElementById('nextMenteeBtn');

  // Sheet Elements
  const menteeListSheet = document.getElementById('menteeListSheet');
  const sheetCloseBtn = document.getElementById('sheetCloseBtn');
  const searchInput = document.getElementById('searchInput');
  const menteeGrid = document.getElementById('menteeGrid');

  // Bottom Hint
  const footerHint = document.getElementById('footerHint');

  // State
  let currentPhase = 0;
  let currentMenteeIndex = 0;
  let starClickCount = 0; // Track how many stars the user has clicked

  // Initialize Canvas Engine
  const canvasEngine = new ConstellationCanvas(canvasElement, MABA_DATA);

  // =============================================
  // Position text elements relative to constellation bounding box
  // =============================================
  function positionUIRelativeToConstellation() {
    const boxY = canvasEngine.boxY;
    const boxH = canvasEngine.boxH;

    if (boxY === undefined || boxH === undefined) return;

    // Text goes above the constellation with some padding
    const aboveTop = Math.max(8, boxY - 12);
    textAbove.style.bottom = 'auto';
    textAbove.style.top = aboveTop + 'px';
    // Align text to sit just above the box by anchoring from bottom
    textAbove.style.top = '';
    textAbove.style.bottom = (window.innerHeight - boxY + 10) + 'px';

    // Button goes below the constellation
    const belowTop = boxY + boxH + 16;
    belowConstellation.style.top = belowTop + 'px';
  }

  positionUIRelativeToConstellation();

  // Re-position on resize
  window.addEventListener('resize', () => {
    setTimeout(positionUIRelativeToConstellation, 100);
  });

  // Setup Star Click Callback
  canvasEngine.onStarClickCallback = (star, index) => {
    soundEngine.playStarClickSound();
    starClickCount++;
    openMenteeModal(index);

    // Show "Pesan Penutup" button after user has clicked at least 2 stars
    if (starClickCount >= 2 && currentPhase === 3) {
      showPesanPenutupButton();
    }
  };

  // When constellation animation (fly-in + line drawing) fully completes → go to Phase 3
  canvasEngine.onConstellationComplete = () => {
    if (currentPhase === 2) {
      setPhase(3);
    }
  };

  function showPesanPenutupButton() {
    belowConstellation.style.opacity = '1';
    belowConstellation.style.pointerEvents = 'auto';
  }

  // =============================================
  // Cinematic Ending Page — Init & Populate
  // =============================================
  const endingPage = document.getElementById('endingPage');
  const warpOverlay = document.getElementById('warpOverlay');
  const endingScrollContainer = document.getElementById('endingScrollContainer');

  function initEndingPage() {
    // Populate mentor 1
    if (typeof MENTOR_DATA !== 'undefined' && MENTOR_DATA[0]) {
      const m1 = MENTOR_DATA[0];
      document.getElementById('mentor1Img').src = m1.photo;
      document.getElementById('mentor1Name').textContent = m1.name;
      document.getElementById('mentor1Role').textContent = m1.role;
      document.getElementById('mentor1Message').textContent = m1.message;
    }
    // Populate mentor 2
    if (typeof MENTOR_DATA !== 'undefined' && MENTOR_DATA[1]) {
      const m2 = MENTOR_DATA[1];
      document.getElementById('mentor2Img').src = m2.photo;
      document.getElementById('mentor2Name').textContent = m2.name;
      document.getElementById('mentor2Role').textContent = m2.role;
      document.getElementById('mentor2Message').textContent = m2.message;
    }

    // Populate credits roll from MABA_DATA
    const creditsRoll = document.getElementById('creditsRoll');
    if (creditsRoll && typeof MABA_DATA !== 'undefined') {
      creditsRoll.innerHTML = '';
      MABA_DATA.forEach((maba, i) => {
        const entry = document.createElement('div');
        entry.className = 'credit-entry';
        entry.innerHTML = `
          <span class="credit-number">${String(i + 1).padStart(2, '0')}</span>
          <span class="credit-name">${maba.name}</span>
          <span class="credit-prodi">${maba.prodi}</span>
        `;
        creditsRoll.appendChild(entry);
      });
    }

    // Populate photo strip (5 photos, alternating L/R)
    const photoStrip = document.getElementById('photoStrip');
    if (photoStrip && typeof DOCUMENTATION_PHOTOS !== 'undefined') {
      photoStrip.innerHTML = '';
      const photos = DOCUMENTATION_PHOTOS.slice(0, 5);
      photos.forEach((photo, i) => {
        const dir = i % 2 === 0 ? 'from-left' : 'from-right';
        const item = document.createElement('div');
        item.className = `photo-strip-item ${dir}`;
        item.innerHTML = `
          <div class="photo-strip-img-wrap">
            <img src="${photo.url}" alt="${photo.caption}" class="photo-strip-img" loading="lazy">
          </div>
          <div class="photo-strip-caption">
            <div class="photo-caption-num">0${i + 1}</div>
            <div class="photo-caption-text">${photo.caption}</div>
          </div>
        `;
        photoStrip.appendChild(item);
      });
    }

    // Setup IntersectionObserver for scroll reveal (root = scroll container)
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      }, {
        root: endingScrollContainer,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      const revealEls = endingScrollContainer.querySelectorAll(
        '.reveal-up, .reveal-from-left, .reveal-from-right, .credit-entry, .photo-strip-item'
      );
      revealEls.forEach(el => observer.observe(el));
    }, 100);
  }

  // Launch warp transition → ending page
  function launchEndingPage() {
    // Show ending page container
    endingPage.classList.add('active');

    // Kick off warp animation
    warpOverlay.classList.add('active');

    // Canvas zooms out in the background
    canvasEngine.zoomOutToNormal();

    // After warp plays (1.6s), fade canvas + show scroll page
    setTimeout(() => {
      warpOverlay.classList.remove('active');
      endingScrollContainer.classList.add('visible');
      // Scroll to top of ending container
      endingScrollContainer.scrollTop = 0;
      // Trigger hero reveal-up elements
      endingScrollContainer.querySelectorAll('.ending-section-hero .reveal-up').forEach(el => {
        setTimeout(() => el.classList.add('revealed'), 200);
      });
    }, 1600);
  }

  initEndingPage();

  // =============================================
  // Typewriter Text Effect
  // =============================================
  let currentTypeTimeout = null;

  function typeWriterText(element, text, speed = 45, callback = null) {
    if (!element) return;
    if (currentTypeTimeout) clearTimeout(currentTypeTimeout);

    element.textContent = '';
    element.classList.add('typing-active');
    let index = 0;

    function typeChar() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        currentTypeTimeout = setTimeout(typeChar, speed);
      } else {
        element.classList.remove('typing-active');
        if (callback) callback();
      }
    }

    typeChar();
  }

  // =============================================
  // Phase Controller
  // =============================================
  function hideAllPhases() {
    [cardPhase1, cardPhase2, cardPhase3].forEach(el => {
      if (el) el.style.display = 'none';
    });
    if (cardPhase5) cardPhase5.classList.remove('active');
  }

  function showPhase(el) {
    if (el) {
      el.style.display = 'flex';
    }
  }

  function setPhase(phase) {
    currentPhase = phase;
    canvasEngine.setPhase(phase);
    hideAllPhases();

    // Hide pesan penutup button by default
    belowConstellation.style.opacity = '0';
    belowConstellation.style.pointerEvents = 'none';

    if (phase === 0) {
      // Pure dark sky + initial prompt hint
      starClickCount = 0;
      footerHint.textContent = '✨ ( Sentuh / klik di mana saja untuk mulai perjalanan )';
      footerHint.style.opacity = '1';

    } else if (phase === 1) {
      // First step: Type "Sebelum kita bertemu..."
      showPhase(cardPhase1);
      footerHint.textContent = '✨ ( Klik lagi untuk menghubungkan rasi bintang )';
      footerHint.style.opacity = '1';

      typeWriterText(quotePhase1, "\u201CSebelum kita bertemu, kita hanyalah titik-titik yang berdiri sendiri.\u201D", 45);

    } else if (phase === 2) {
      // Second click: Type "Lalu kita dipertemukan." + Domino fly-in
      showPhase(cardPhase2);
      footerHint.style.opacity = '0';

      typeWriterText(quotePhase2, "\u201CLalu kita dipertemukan.\u201D", 55);

    } else if (phase === 3) {
      // Constellation revealed: Type "CLUSTER 32 SERPENS"
      showPhase(cardPhase3);
      footerHint.textContent = '⭐ Klik titik bintang untuk melihat pesan Maba';
      footerHint.style.opacity = '1';

      typeWriterText(titlePhase3, "CLUSTER 32 SERPENS", 65);

      // If user already clicked enough stars before (from restart), show button
      if (starClickCount >= 2) {
        showPesanPenutupButton();
      }

    } else if (phase === 5) {
      // Ending overlay
      if (cardPhase5) cardPhase5.classList.add('active');
      footerHint.style.opacity = '0';
    }

    // Re-position after phase change
    positionUIRelativeToConstellation();
  }

  // =============================================
  // Intro Star Fade Sequence Listener
  // =============================================
  canvasEngine.onIntroComplete = () => {
    // Intro bg stars done — now fade in the 33 big constellation stars sequentially
    canvasEngine.startSequentialStarFadeIn(() => {
      // All stars (big + small) revealed — unlock interaction
      canvasEngine.introComplete = true;
    });
  };

  // =============================================
  // Auto-play BGM on first user interaction
  // =============================================
  let bgmStarted = false;

  function tryAutoPlayBGM() {
    if (bgmStarted) return;
    bgmStarted = true;

    // Init sound engine & play BGM
    soundEngine.init();
    soundEngine.isPlaying = true;
    soundEngine.playBGM();
    soundEngine.start();

    // Update button to show playing state
    if (soundToggleBtn) soundToggleBtn.innerHTML = '🔊';
  }

  // =============================================
  // Global Click Step Controller
  // =============================================
  document.addEventListener('click', (e) => {
    if (e.target.closest('.icon-btn-minimal') || e.target.closest('.mentee-modal-card') ||
        e.target.closest('.mentee-list-sheet') || e.target.closest('.btn-celestial') ||
        e.target.closest('.ending-page') || e.target.closest('.modal-overlay')) return;

    if (currentPhase === 0) {
      // FIRST CLICK: Trigger audio immediately on direct user gesture!
      tryAutoPlayBGM();

      // Start canvas sky transition (black -> deep space blue/purple) + stars fade in!
      canvasEngine.startIntroSequence();
      soundEngine.playStarClickSound();

      // Advance to Phase 1
      setPhase(1);

    } else if (currentPhase === 1) {
      // Block clicking while stars are still fading in
      if (!canvasEngine.introComplete) return;

      soundEngine.playStarClickSound();
      setPhase(2);
    }
  });

  // Phase 5 Button — launch cinematic ending
  if (btnStartPhase5) {
    btnStartPhase5.addEventListener('click', () => {
      soundEngine.playStarClickSound();
      launchEndingPage();
    });
  }

  // Sound Toggle — manual override
  soundToggleBtn.addEventListener('click', () => {
    const isPlaying = soundEngine.toggle();
    soundToggleBtn.innerHTML = isPlaying ? '🔊' : '🔇';
    bgmStarted = isPlaying; // Sync state
  });

  // =============================================
  // Modal Functions
  // =============================================
  function openMenteeModal(index) {
    currentMenteeIndex = index;
    const mentee = MABA_DATA[index];
    if (!mentee) return;

    // Trigger space warp camera zoom into the clicked star
    canvasEngine.zoomToStar(index);

    starNumberPill.textContent = `BINTANG #${mentee.id} / 33`;
    menteeAvatar.style.background = mentee.avatarBg;
    menteeAvatar.textContent = mentee.icon || '🌟';
    menteeName.textContent = mentee.name;
    menteeStarTitle.textContent = `${mentee.starName} • Prodi ${mentee.prodi || 'PKKMB'}`;
    menteeMessageBox.textContent = `"${mentee.message}"`;

    prevMenteeBtn.disabled = index === 0;
    nextMenteeBtn.disabled = index === MABA_DATA.length - 1;

    menteeModal.classList.add('active');
  }

  function closeMenteeModal() {
    menteeModal.classList.remove('active');

    // Zoom camera back out to full constellation view
    canvasEngine.zoomOutToNormal();

    // Check if we should show button after closing modal
    if (starClickCount >= 2 && currentPhase === 3) {
      showPesanPenutupButton();
    }
  }

  modalCloseBtn.addEventListener('click', closeMenteeModal);
  menteeModal.addEventListener('click', (e) => {
    if (e.target === menteeModal) closeMenteeModal();
  });

  prevMenteeBtn.addEventListener('click', () => {
    if (currentMenteeIndex > 0) {
      soundEngine.playStarClickSound();
      openMenteeModal(currentMenteeIndex - 1);
    }
  });

  nextMenteeBtn.addEventListener('click', () => {
    if (currentMenteeIndex < MABA_DATA.length - 1) {
      soundEngine.playStarClickSound();
      openMenteeModal(currentMenteeIndex + 1);
    }
  });

  // =============================================
  // Mentee Search & List Sheet
  // =============================================
  function renderMenteeChips(filterQuery = '') {
    menteeGrid.innerHTML = '';
    const query = filterQuery.toLowerCase();

    MABA_DATA.forEach((mentee, index) => {
      const matchName = mentee.name.toLowerCase().includes(query);
      const matchNick = mentee.nickname.toLowerCase().includes(query);
      const matchProdi = (mentee.prodi || '').toLowerCase().includes(query);
      const matchId = `${mentee.id}`.includes(query);

      if (matchName || matchNick || matchProdi || matchId) {
        const chip = document.createElement('div');
        chip.className = 'mentee-chip';
        chip.innerHTML = `
          <span class="chip-num">#${mentee.id}</span>
          <span style="font-size: 1.2rem;">${mentee.icon || '🌟'}</span>
          <span class="chip-name">${mentee.nickname}</span>
          <span style="font-size: 0.65rem; color: var(--color-purple-light); text-align: center;">${mentee.prodi || ''}</span>
        `;
        chip.addEventListener('click', () => {
          soundEngine.playStarClickSound();
          menteeListSheet.classList.remove('active');
          if (currentPhase < 3) setPhase(3);
          openMenteeModal(index);
        });
        menteeGrid.appendChild(chip);
      }
    });
  }

  if (listToggleBtn) {
    listToggleBtn.addEventListener('click', () => {
      renderMenteeChips();
      menteeListSheet.classList.add('active');
    });
  }

  sheetCloseBtn.addEventListener('click', () => {
    menteeListSheet.classList.remove('active');
  });

  searchInput.addEventListener('input', (e) => {
    renderMenteeChips(e.target.value);
  });

  // =============================================
  // Scroll / Swipe Phase Navigation
  // =============================================
  let lastScrollTime = 0;
  let touchStartY = 0;

  function triggerNextScrollPhase() {
    const now = Date.now();
    if (now - lastScrollTime < 1000) return;
    lastScrollTime = now;

    if (currentPhase === 0) {
      soundEngine.playStarClickSound();
      setPhase(1);
    } else if (currentPhase === 1) {
      soundEngine.playStarClickSound();
      setPhase(2);
    }
  }

  window.addEventListener('wheel', (e) => {
    if (menteeModal.classList.contains('active') || menteeListSheet.classList.contains('active')) return;
    if (e.deltaY > 20) triggerNextScrollPhase();
  }, { passive: true });

  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (menteeModal.classList.contains('active') || menteeListSheet.classList.contains('active')) return;
    const diffY = touchStartY - e.changedTouches[0].clientY;
    if (diffY > 45) triggerNextScrollPhase();
  }, { passive: true });

  // Keyboard
  window.addEventListener('keydown', (e) => {
    if (menteeModal.classList.contains('active')) {
      if (e.key === 'Escape') closeMenteeModal();
      if (e.key === 'ArrowLeft' && currentMenteeIndex > 0) openMenteeModal(currentMenteeIndex - 1);
      if (e.key === 'ArrowRight' && currentMenteeIndex < MABA_DATA.length - 1) openMenteeModal(currentMenteeIndex + 1);
    }
  });

  // Initial Start
  setPhase(0);
});
