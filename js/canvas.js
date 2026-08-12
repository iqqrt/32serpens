/**
 * Canvas Celestial Engine for Serpens Constellation (33 Stars)
 * Menangani latar langit malam, animasi particle starfield, pendaran rasi Serpens, 
 * serta deteksi tap/klik pada 33 titik bintang.
 */

class ConstellationCanvas {
  constructor(canvasElement, data) {
    this.canvas = canvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.data = data;
    this.stars = [];
    this.bgStars = [];
    this.connections = [];
    this.lineProgress = 0; // 0 to 1 for animated connection
    this.hoveredStarIndex = -1;
    this.activePhase = 0;

    this.onStarClickCallback = null;
    this.onConstellationComplete = null;
    this.onCanvasTapCallback = null;

    // Tap Shockwave Ripples
    this.ripples = [];

    // Camera Transform State (for cinematic deep space zoom into clicked stars)
    this.camera = { x: 0, y: 0, scale: 1 };
    this.targetCamera = { x: 0, y: 0, scale: 1 };

    // Nebula Glow Transition (Smooth fade-in instead of sudden jump)
    this.nebulaAlpha = 0;
    this.targetNebulaAlpha = 0;

    // Intro sequence state (starts pitch black until user clicks)
    this.skyBlueProgress = 0;
    this.introStarted = false;
    this.introComplete = false;
    this.onIntroComplete = null; // Callback fired after dark intro finishes

    // High quality visual flags & optimized DPR scaling for mobile GPUs
    this.isMobile = window.innerWidth < 768 || ('ontouchstart' in window);
    this.dpr = this.isMobile ? Math.min(window.devicePixelRatio || 1, 1.25) : Math.min(window.devicePixelRatio || 1, 1.75);

    // Frame throttle
    this._lastFrame = 0;
    this._frameInterval = 0; // Smooth 60fps

    // Pause canvas when modals are active
    this.pauseAnimation = false;

    this._dirty = true;
    this._idleTimer = null;

    // Bind animate once to avoid per-frame arrow function allocation
    this._animateBound = this.animate.bind(this);

    this.initCanvasSize();
    this.generateBgStars();
    this.generateConstellationNodes();
    this.bindEvents();
    this.animate();
  }

  initCanvasSize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(this.dpr, this.dpr);
  }

  generateBgStars() {
    this.bgStars = [];
    // Mobile: far fewer stars so GPU doesn't choke
    const maxStars = this.isMobile ? 90 : 220;
    const count = Math.min(maxStars, Math.floor((this.width * this.height) / (this.isMobile ? 6000 : 3800)));
    for (let i = 0; i < count; i++) {
      const isSparkle = i % 7 === 0; // ~15% are golden/magenta 4-pointed diamond sparkles
      this.bgStars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: isSparkle ? Math.random() * 3.5 + 2 : Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.85 + 0.15,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleDir: Math.random() > 0.5 ? 1 : -1,
        isSparkle: isSparkle,
        color: isSparkle ? (Math.random() > 0.4 ? '#fbbf24' : '#e879f9') : '#ffffff',
        revealAlpha: 0 // Starts invisible — intro sequence fades this in
      });
    }
  }

  /**
   * Layout 33 Serpens nodes maintaining strict aspect ratio (no distortion/gepeng)
   * Formed by Serpens Caput (Head - top left curve) & Serpens Cauda (Tail - bottom right curve)
   */
  generateConstellationNodes() {
    const isPortrait = this.height > this.width;

    // Define 33 relative normalized coordinates (0.0 - 1.0) forming Serpens
    const relativeCoords = [
      // === SERPENS CAPUT (Head & Upper Body - 15 Stars) ===
      { x: 0.35, y: 0.12 }, // Star 1 (Caput Top)
      { x: 0.28, y: 0.16 }, // Star 2 (Caput Left)
      { x: 0.42, y: 0.17 }, // Star 3 (Caput Right)
      { x: 0.22, y: 0.22 }, // Star 4 
      { x: 0.48, y: 0.23 }, // Star 5 
      { x: 0.35, y: 0.26 }, // Star 6 (Unukalhai - Alpha Serpentis Heart)
      { x: 0.29, y: 0.32 }, // Star 7
      { x: 0.24, y: 0.38 }, // Star 8
      { x: 0.22, y: 0.45 }, // Star 9 (Leftmost Mid Curve)
      { x: 0.26, y: 0.51 }, // Star 10
      { x: 0.33, y: 0.55 }, // Star 11
      { x: 0.42, y: 0.57 }, // Star 12
      { x: 0.50, y: 0.56 }, // Star 13 (Center Ophiuchus Gap Bridge)
      { x: 0.58, y: 0.53 }, // Star 14
      { x: 0.64, y: 0.48 }, // Star 15

      // === SERPENS CAUDA (Tail & Lower Body - 18 Stars) ===
      { x: 0.70, y: 0.42 }, // Star 16
      { x: 0.75, y: 0.36 }, // Star 17 (Cauda Upper Bend)
      { x: 0.72, y: 0.30 }, // Star 18
      { x: 0.65, y: 0.28 }, // Star 19
      { x: 0.58, y: 0.32 }, // Star 20
      { x: 0.54, y: 0.38 }, // Star 21
      { x: 0.53, y: 0.46 }, // Star 22
      { x: 0.55, y: 0.54 }, // Star 23
      { x: 0.59, y: 0.62 }, // Star 24
      { x: 0.64, y: 0.69 }, // Star 25
      { x: 0.68, y: 0.76 }, // Star 26
      { x: 0.65, y: 0.83 }, // Star 27 (Tail Bottom Curve)
      { x: 0.58, y: 0.87 }, // Star 28
      { x: 0.48, y: 0.88 }, // Star 29
      { x: 0.38, y: 0.85 }, // Star 30
      { x: 0.30, y: 0.80 }, // Star 31
      { x: 0.24, y: 0.73 }, // Star 32
      { x: 0.20, y: 0.66 }  // Star 33 (Tail Tip)
    ];

    // Maintain fixed aspect ratio box so geometry NEVER gets squished/gepeng
    let boxW, boxH;

    if (isPortrait) {
      // HP vertical screen
      boxW = this.width * 0.88;
      boxH = boxW * 1.30;
      if (boxH > this.height * 0.62) {
        boxH = this.height * 0.62;
        boxW = boxH / 1.30;
      }
    } else {
      // Laptop horizontal screen
      boxH = this.height * 0.65;
      boxW = boxH * 1.05;
      if (boxW > this.width * 0.75) {
        boxW = this.width * 0.75;
        boxH = boxW / 1.05;
      }
    }

    const boxX = (this.width - boxW) / 2;
    const boxY = (this.height - boxH) / 2 + (isPortrait ? 30 : 15);

    // Expose bounding box for UI positioning
    this.boxX = boxX;
    this.boxY = boxY;
    this.boxW = boxW;
    this.boxH = boxH;

    this.stars = this.data.map((maba, index) => {
      const rel = relativeCoords[index] || { x: 0.5, y: 0.5 };
      const targetX = boxX + rel.x * boxW;
      const targetY = boxY + rel.y * boxH;
      
      // Random scattered starting coordinates for Phase 1
      const scatterAngle = (index / 33) * Math.PI * 2 + Math.sin(index) * 0.5;
      const scatterDist = (0.2 + (index % 5) * 0.12) * Math.min(this.width, this.height);
      const startX = this.width / 2 + Math.cos(scatterAngle) * scatterDist;
      const startY = this.height / 2 + Math.sin(scatterAngle) * scatterDist;

      return {
        ...maba,
        index: index,
        startX: startX,
        startY: startY,
        targetX: targetX,
        targetY: targetY,
        x: startX, // Starts at scattered location
        y: startY,
        baseRadius: isPortrait ? 6 : 7,
        currentRadius: isPortrait ? 6 : 7,
        pulseOffset: Math.random() * Math.PI * 2,
        glowAlpha: 0.6,
        fadeAlpha: 0, // Starts invisible — fades in after dark intro sequence
        labelAlpha: 0,
        labelOffset: 8
      };
    });

    // Create sequential line connections
    this.connections = [];
    for (let i = 0; i < this.stars.length - 1; i++) {
      this.connections.push({
        from: this.stars[i],
        to: this.stars[i + 1]
      });
    }

    // Authentic constellation cross-bracing
    if (this.stars.length >= 33) {
      this.connections.push({ from: this.stars[0], to: this.stars[2] });
      this.connections.push({ from: this.stars[1], to: this.stars[5] });
      this.connections.push({ from: this.stars[2], to: this.stars[4] });
      this.connections.push({ from: this.stars[5], to: this.stars[0] });
      this.connections.push({ from: this.stars[16], to: this.stars[18] });
    }
  }

  /**
   * Phase 1 Initial Animation:
   * Triggered when text starts typing. Stars appear one by one slowly (140ms stagger per star)
   */
  startSequentialStarFadeIn(onDone = null) {
    const totalStars = this.stars.length;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      let allDone = true;
      for (let i = 0; i < totalStars; i++) {
        const starDelay = i * 140; // 140ms delay between each star appearing
        if (elapsed >= starDelay) {
          const starElapsed = elapsed - starDelay;
          const fadeProgress = Math.min(starElapsed / 800, 1); // 800ms fade duration per star
          this.stars[i].fadeAlpha = fadeProgress;
          if (fadeProgress < 1) allDone = false;
        } else {
          allDone = false;
        }
      }

      if (!allDone) {
        requestAnimationFrame(step);
      } else {
        if (onDone) onDone();
      }
    };
    requestAnimationFrame(step);
  }

  setPhase(phase) {
    this.activePhase = phase;
    if (phase === 0) {
      // Reset stars to scattered positions & reset camera & nebula
      this.lineProgress = 0;
      this.targetNebulaAlpha = 0;
      this.nebulaAlpha = 0;
      this.zoomOutToNormal();
      this.stars.forEach(s => { s.labelAlpha = 0; s.labelOffset = 8; });
      this.generateConstellationNodes();
    } else if (phase === 1) {
      this.targetNebulaAlpha = 0.20;
    } else if (phase === 2) {
      this.targetNebulaAlpha = 0.85; // Continuous smooth fade-in to peak brightness
      this.animateDominoWaveFlyIn();
    } else if (phase === 3) {
      this.targetNebulaAlpha = 0.85; // Glow stays permanently at peak brightness
      this.animateLabelsFadeIn();
    }
  }

  /**
   * Cinematic Camera Zoom:
   * Smoothly pans and zooms deep space toward a specific star when clicked
   */
  zoomToStar(index) {
    const star = this.stars[index];
    if (!star) return;

    const targetScale = this.isMobile ? 2.6 : 2.2;
    const targetX = star.x - this.width / 2;
    const targetY = star.y - this.height / 2;

    this.targetCamera = {
      x: targetX,
      y: targetY,
      scale: targetScale
    };
    this.markDirty();
  }

  zoomOutToNormal() {
    this.targetCamera = {
      x: 0,
      y: 0,
      scale: 1
    };
    this.markDirty();
  }

  /**
   * Phase 3 Animation:
   * Nickname labels appear sequentially under each star
   */
  animateLabelsFadeIn() {
    let start = null;
    const stagger = this.isMobile ? 90 : 50; // Slower sequential wave of names on mobile
    const duration = this.isMobile ? 700 : 450;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      let allDone = true;
      for (let i = 0; i < this.stars.length; i++) {
        const delay = i * stagger;
        if (elapsed >= delay) {
          const progress = Math.min((elapsed - delay) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          this.stars[i].labelAlpha = ease;
          this.stars[i].labelOffset = 8 * (1 - ease);
          if (progress < 1) allDone = false;
        } else {
          allDone = false;
        }
      }
      this.markDirty();

      if (!allDone) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }

  /**
   * Phase 2 Animation:
   * Domino Wave effect: Star 1 moves, then star 2, star 3... smoothly trailing into Serpens shape
   */
  animateDominoWaveFlyIn() {
    let flyStart = null;
    const durationPerStar = this.isMobile ? 2200 : 2400; // Elegant, graceful fly-in on mobile
    const staggerDelay = this.isMobile ? 120 : 140;       
    const totalFlyTime = (this.stars.length - 1) * staggerDelay + durationPerStar;

    const flyStep = (timestamp) => {
      if (!flyStart) flyStart = timestamp;
      const elapsed = timestamp - flyStart;

      const flyProgress = Math.min(elapsed / totalFlyTime, 1);

      let allArrived = true;

      for (let i = 0; i < this.stars.length; i++) {
        const star = this.stars[i];
        const delay = i * staggerDelay;

        if (elapsed >= delay) {
          const starProgress = Math.min((elapsed - delay) / durationPerStar, 1);
          const ease = starProgress < 0.5 
            ? 4 * starProgress * starProgress * starProgress 
            : 1 - Math.pow(-2 * starProgress + 2, 3) / 2;

          // Pure lerp from fixed startX/startY to targetX/targetY (Fixes stuttering!)
          star.x = star.startX + (star.targetX - star.startX) * ease;
          star.y = star.startY + (star.targetY - star.startY) * ease;

          if (starProgress < 1) allArrived = false;
        } else {
          allArrived = false;
        }
      }

      this.markDirty();

      if (!allArrived) {
        requestAnimationFrame(flyStep);
      } else {
        // Ensure exact target positions
        for (let star of this.stars) {
          star.x = star.targetX;
          star.y = star.targetY;
        }
        // Start line connection drawing animation
        this.animateLineConnection();
      }
    };
    requestAnimationFrame(flyStep);
  }

  animateLineConnection() {
    let start = null;
    const duration = this.isMobile ? 3500 : 3000; // 3.5s graceful line drawing on mobile

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      this.lineProgress = progress;
      this.markDirty();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (this.onConstellationComplete) this.onConstellationComplete();
      }
    };
    requestAnimationFrame(step);
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.initCanvasSize();
      this.generateBgStars();
      this.generateConstellationNodes();
    });

    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : 0));
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : 0));
      
      const rawX = clientX - rect.left;
      const rawY = clientY - rect.top;

      // Transform raw screen coordinates through current camera matrix
      const worldX = (rawX - this.width / 2) / this.camera.scale + this.width / 2 + this.camera.x;
      const worldY = (rawY - this.height / 2) / this.camera.scale + this.height / 2 + this.camera.y;

      return { x: worldX, y: worldY };
    };

    const handlePointerMove = (e) => {
      if (this.activePhase < 3) return;
      const pos = getPos(e);
      let foundIndex = -1;

      const hitRadius = this.isMobile ? 36 : 24;

      for (let i = 0; i < this.stars.length; i++) {
        const star = this.stars[i];
        const dist = Math.hypot(pos.x - star.x, pos.y - star.y);
        if (dist <= hitRadius) {
          foundIndex = i;
          break;
        }
      }

      if (this.hoveredStarIndex !== foundIndex) {
        this.hoveredStarIndex = foundIndex;
        this.markDirty();
      }
      this.canvas.style.cursor = foundIndex !== -1 ? 'pointer' : 'default';
    };

    let lastCanvasTapTime = 0;

    const handleCanvasTap = (e) => {
      const now = Date.now();
      if (now - lastCanvasTapTime < 350) return; // 350ms guard prevents double firing

      // Ignore taps on interactive UI overlays (modals, list sheet, action buttons)
      const targetEl = e.target || (e.srcElement);
      if (targetEl && targetEl.closest && (
          targetEl.closest('.icon-btn-minimal') || targetEl.closest('.mentee-modal-card') ||
          targetEl.closest('.mentee-list-sheet') || targetEl.closest('.btn-celestial') ||
          targetEl.closest('.ending-page') || targetEl.closest('.modal-overlay'))) return;

      lastCanvasTapTime = now;

      const pos = getPos(e);

      // In Phase 0, 1, 2: Tap advances the story phase!
      if (this.activePhase < 3) {
        if (this.onCanvasTapCallback) {
          this.onCanvasTapCallback();
        }
        return;
      }

      // In Phase 3: Check star collision (45px hit radius on mobile)
      const hitRadius = this.isMobile ? 45 : 24;
      for (let i = 0; i < this.stars.length; i++) {
        const star = this.stars[i];
        const dist = Math.hypot(pos.x - star.x, pos.y - star.y);
        if (dist <= hitRadius) {
          // Trigger magical tap shockwave ripple ring on clicked star!
          this.addTapRipple(star.x, star.y);

          if (this.onStarClickCallback) {
            this.onStarClickCallback(star, i);
          }
          return;
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove);

    // Attach to WINDOW so pointer-events: none wrappers on mobile never block touch interactions!
    window.addEventListener('pointerdown', (e) => {
      handleCanvasTap(e);
    });

    window.addEventListener('click', (e) => {
      if (e.pointerType !== 'touch' && e.pointerType !== 'pen') {
        handleCanvasTap(e);
      }
    });
  }

  // Mark canvas as needing a repaint
  markDirty() {
    this._dirty = true;
    clearTimeout(this._idleTimer);
    // On mobile, go idle after 3s of no changes (stars settled)
    if (this.isMobile && this.introComplete) {
      this._idleTimer = setTimeout(() => { this._dirty = false; }, 3000);
    }
  }

  animate() {
    if (this.pauseAnimation) return;

    const now = performance.now();

    // Mobile frame throttle
    if (this.isMobile && this._frameInterval > 0) {
      if (now - this._lastFrame < this._frameInterval) {
        requestAnimationFrame(this._animateBound);
        return;
      }
    }
    this._lastFrame = now;

    // On mobile, skip rendering when idle (nothing is animating)
    if (this.isMobile && !this._dirty && this.introComplete &&
        this.lineProgress >= 1 && this.activePhase >= 3 &&
        this.hoveredStarIndex === -1) {
      requestAnimationFrame(this._animateBound);
      return;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);

    this._dirty = false; // Will be set true again if animations still running

    // Smooth Lerp Camera
    const easeSpeed = 0.08;
    const scaleDiff = this.targetCamera.scale - this.camera.scale;
    const xDiff = this.targetCamera.x - this.camera.x;
    const yDiff = this.targetCamera.y - this.camera.y;
    if (Math.abs(scaleDiff) > 0.001 || Math.abs(xDiff) > 0.1 || Math.abs(yDiff) > 0.1) {
      this.camera.scale += scaleDiff * easeSpeed;
      this.camera.x += xDiff * easeSpeed;
      this.camera.y += yDiff * easeSpeed;
      this._dirty = true;
    }

    // Continuous silky smooth fade-in to peak brightness (0.85) over 3.5s
    const nebulaDiff = this.targetNebulaAlpha - this.nebulaAlpha;
    if (Math.abs(nebulaDiff) > 0.001) {
      this.nebulaAlpha += nebulaDiff * 0.015;
      this._dirty = true;
    }

    // 1. Draw Deep Nebula Background (Screen Space)
    this.drawNebulaBackground();

    // 2. Draw Twinkling Background Stars (Screen Space)
    this.drawBgStars();

    // 3. Save & Apply Camera Transform Matrix for Constellation Space
    this.ctx.save();
    this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.scale(this.camera.scale, this.camera.scale);
    this.ctx.translate(-this.width / 2 - this.camera.x, -this.height / 2 - this.camera.y);

    // 4. Draw Connecting Energy Lines
    if (this.activePhase >= 2 && this.lineProgress > 0) {
      this.drawConstellationLines();
    }

    // 5. Draw 33 Constellation Node Stars & Labels
    this.drawConstellationStars();

    // 6. Draw Tap Shockwave Ripples
    this.drawRipples();

    // Restore Screen Space Matrix
    this.ctx.restore();

    requestAnimationFrame(this._animateBound);
  }

  addTapRipple(x, y) {
    this.ripples.push({
      x: x,
      y: y,
      radius: 6,
      maxRadius: this.isMobile ? 38 : 50,
      alpha: 1
    });
    this.markDirty();
  }

  drawRipples() {
    if (this.ripples.length === 0) return;

    this.ctx.save();
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i];
      r.radius += (r.maxRadius - r.radius) * 0.22 + 0.6;
      r.alpha -= 0.045;

      if (r.alpha <= 0 || r.radius >= r.maxRadius) {
        this.ripples.splice(i, 1);
        continue;
      }

      // Golden expanding celestial ring
      this.ctx.strokeStyle = `rgba(251, 191, 36, ${r.alpha})`;
      this.ctx.lineWidth = 2.2;
      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      this.ctx.stroke();

      // Inner magenta glow ring
      if (r.radius > 10) {
        this.ctx.strokeStyle = `rgba(232, 121, 249, ${r.alpha * 0.75})`;
        this.ctx.lineWidth = 1.2;
        this.ctx.beginPath();
        this.ctx.arc(r.x, r.y, r.radius * 0.65, 0, Math.PI * 2);
        this.ctx.stroke();
      }
    }
    this.ctx.restore();

    if (this.ripples.length > 0) {
      this._dirty = true;
    }
  }

  drawNebulaBackground() {
    // 1. Fill base black
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 2. Transition sky to deep space gradient when intro starts
    if (this.introStarted && this.skyBlueProgress < 1) {
      this.skyBlueProgress = Math.min(this.skyBlueProgress + 0.015, 1);
    }

    if (this.skyBlueProgress > 0) {
      this.ctx.save();
      this.ctx.globalAlpha = this.skyBlueProgress;

      // Deep royal space purple background gradient (matching PKKMB reference)
      const grad = this.ctx.createRadialGradient(
        this.width / 2, this.height / 2, 50,
        this.width / 2, this.height / 2, Math.max(this.width, this.height)
      );
      grad.addColorStop(0, '#190838');
      grad.addColorStop(0.5, '#0e0324');
      grad.addColorStop(1, '#05010d');

      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.restore();
    }

    // Swirling vibrant purple, magenta & golden nebula clouds
    if (this.nebulaAlpha > 0.005) {
      this.ctx.save();
      this.ctx.globalCompositeOperation = 'screen';
      this.ctx.globalAlpha = this.nebulaAlpha * this.skyBlueProgress;

      const nebula1 = this.ctx.createRadialGradient(
        this.width * 0.45, this.height * 0.45, 20,
        this.width * 0.45, this.height * 0.45, this.width * 0.55
      );
      nebula1.addColorStop(0, 'rgba(168, 85, 247, 0.28)');
      nebula1.addColorStop(0.5, 'rgba(147, 51, 234, 0.15)');
      nebula1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      this.ctx.fillStyle = nebula1;
      this.ctx.fillRect(0, 0, this.width, this.height);

      const nebula2 = this.ctx.createRadialGradient(
        this.width * 0.55, this.height * 0.55, 10,
        this.width * 0.55, this.height * 0.55, this.width * 0.4
      );
      nebula2.addColorStop(0, 'rgba(251, 191, 36, 0.18)');
      nebula2.addColorStop(0.6, 'rgba(232, 121, 249, 0.12)');
      nebula2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      this.ctx.fillStyle = nebula2;
      this.ctx.fillRect(0, 0, this.width, this.height);
      this.ctx.restore();
    }
  }

  drawDiamondSparkle(x, y, size, alpha, color = '#fbbf24') {
    this.ctx.save();
    this.ctx.globalAlpha = alpha;
    this.ctx.fillStyle = color;
    this.ctx.shadowColor = color;
    this.ctx.shadowBlur = 10;
    
    // Draw 4-point diamond star (✦) matching PKKMB reference
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - size);
    this.ctx.quadraticCurveTo(x, y, x + size, y);
    this.ctx.quadraticCurveTo(x, y, x, y + size);
    this.ctx.quadraticCurveTo(x, y, x - size, y);
    this.ctx.quadraticCurveTo(x, y, x, y - size);
    this.ctx.fill();
    this.ctx.restore();
  }

  drawBgStars() {
    this.ctx.save();

    for (let star of this.bgStars) {
      if (star.revealAlpha <= 0) continue;

      star.alpha += star.twinkleSpeed * star.twinkleDir;
      if (star.alpha > 0.95) {
        star.alpha = 0.95;
        star.twinkleDir = -1;
      } else if (star.alpha < 0.15) {
        star.alpha = 0.15;
        star.twinkleDir = 1;
      }

      const effectiveAlpha = star.alpha * star.revealAlpha;

      if (star.isSparkle) {
        this.drawDiamondSparkle(star.x, star.y, star.radius, effectiveAlpha, star.color);
      } else {
        this.ctx.fillStyle = `rgba(255, 255, 255, ${effectiveAlpha})`;
        this.ctx.beginPath();
        this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }

    this.ctx.restore();
  }

  /**
   * Intro Sequence:
   * Called when user clicks/taps screen for the first time.
   */
  startIntroSequence() {
    if (this.introStarted) return;
    this.introStarted = true;

    const darkPauseDuration = 100;
    const totalRevealDuration = 2200;
    const perStarFadeDuration = 700;

    const count = this.bgStars.length;
    const revealDelays = this.bgStars.map(() =>
      darkPauseDuration + Math.random() * totalRevealDuration
    );

    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      let allDone = true;

      for (let i = 0; i < count; i++) {
        const delay = revealDelays[i];
        if (elapsed >= delay) {
          const progress = Math.min((elapsed - delay) / perStarFadeDuration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          this.bgStars[i].revealAlpha = eased;
          if (progress < 1) allDone = false;
        } else {
          allDone = false;
        }
      }

      this.markDirty();

      if (!allDone) {
        requestAnimationFrame(step);
      } else {
        this.bgStars.forEach(s => s.revealAlpha = 1);
        if (this.onIntroComplete) this.onIntroComplete();
      }
    };

    requestAnimationFrame(step);
  }

  drawConstellationLines() {
    const totalLines = this.connections.length;
    if (totalLines === 0 || this.lineProgress <= 0) return;

    const linesToDraw = Math.floor(totalLines * this.lineProgress);
    const partialProgress = (totalLines * this.lineProgress) % 1;

    this.ctx.save();
    this.ctx.lineWidth = this.isMobile ? 1.8 : 2.2;

    for (let i = 0; i < linesToDraw; i++) {
      const conn = this.connections[i];
      this.drawLineSegment(conn.from, conn.to, 1);
    }

    if (linesToDraw < totalLines) {
      const conn = this.connections[linesToDraw];
      this.drawLineSegment(conn.from, conn.to, partialProgress);
    }

    this.ctx.restore();
  }

  drawLineSegment(from, to, factor) {
    const currentX = from.x + (to.x - from.x) * factor;
    const currentY = from.y + (to.y - from.y) * factor;

    const grad = this.ctx.createLinearGradient(from.x, from.y, to.x, to.y);
    grad.addColorStop(0, 'rgba(192, 132, 252, 0.85)');
    grad.addColorStop(0.5, 'rgba(232, 121, 249, 0.9)');
    grad.addColorStop(1, 'rgba(251, 191, 36, 0.95)');

    this.ctx.strokeStyle = grad;
    this.ctx.shadowColor = '#c084fc';
    this.ctx.shadowBlur = this.isMobile ? 0 : 10;

    this.ctx.beginPath();
    this.ctx.moveTo(from.x, from.y);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();
  }

  drawConstellationStars() {
    const time = Date.now() * 0.003;

    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];
      const isHovered = i === this.hoveredStarIndex;
      const isRevealedPhase = this.activePhase >= 3;

      // Pulsing radius calculation
      const pulse = Math.sin(time + star.pulseOffset) * 1.5;
      const radius = isHovered ? star.baseRadius * 1.6 : star.baseRadius + (isRevealedPhase ? pulse : 0);

      this.ctx.save();
      this.ctx.globalAlpha = star.fadeAlpha !== undefined ? star.fadeAlpha : 1;

      // Outer Halo Glow (Gold & Purple celestial gradient)
      const haloGrad = this.ctx.createRadialGradient(
        star.x, star.y, radius * 0.2,
        star.x, star.y, radius * (isHovered ? 4.8 : 3.0)
      );
      haloGrad.addColorStop(0, isHovered ? 'rgba(251, 191, 36, 0.98)' : 'rgba(254, 240, 138, 0.9)');
      haloGrad.addColorStop(0.5, isHovered ? 'rgba(232, 121, 249, 0.6)' : 'rgba(168, 85, 247, 0.45)');
      haloGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.fillStyle = haloGrad;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, radius * (isHovered ? 4.8 : 3.0), 0, Math.PI * 2);
      this.ctx.fill();

      // Core Solid Star
      this.ctx.fillStyle = isHovered ? '#ffffff' : '#fffbeb';
      this.ctx.shadowColor = isHovered ? '#fbbf24' : '#c084fc';
      this.ctx.shadowBlur = this.isMobile ? (isHovered ? 6 : 0) : (isHovered ? 22 : 14);

      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, Math.max(radius, 4), 0, Math.PI * 2);
      this.ctx.fill();

      // 4-Point Diamond Sparkle Flare on Hovered Stars
      if (isHovered) {
        this.drawDiamondSparkle(star.x, star.y, radius * 2.5, 0.95, '#fbbf24');
      }

      // Star Number Label & Hover Tooltip Pill (Phase 3+)
      if (isRevealedPhase) {
        if (isHovered) {
          const badgeText = `${star.icon || '🌟'} #${star.id} ${star.nickname}`;
          this.ctx.font = `700 ${this.isMobile ? '11px' : '12px'} 'Outfit', sans-serif`;
          const textMetrics = this.ctx.measureText(badgeText);
          const badgeW = textMetrics.width + 18;
          const badgeH = 26;
          const badgeX = star.x - badgeW / 2;
          const badgeY = star.y - (this.isMobile ? 28 : 32);

          this.ctx.fillStyle = 'rgba(24, 9, 48, 0.95)';
          this.ctx.strokeStyle = '#fbbf24';
          this.ctx.lineWidth = 1.5;
          this.ctx.shadowColor = '#fbbf24';
          this.ctx.shadowBlur = this.isMobile ? 4 : 14;

          this.ctx.beginPath();
          this.ctx.roundRect(badgeX, badgeY, badgeW, badgeH, 13);
          this.ctx.fill();
          this.ctx.stroke();

          this.ctx.fillStyle = '#ffffff';
          this.ctx.textAlign = 'center';
          this.ctx.textBaseline = 'middle';
          this.ctx.shadowBlur = 0;
          this.ctx.fillText(badgeText, star.x, badgeY + badgeH / 2);
        } else {
          const alpha = star.labelAlpha !== undefined ? star.labelAlpha : 0;
          if (alpha > 0) {
            this.ctx.save();
            this.ctx.globalAlpha = alpha;
            const label = star.nickname || `${star.id}`;
            this.ctx.fillStyle = 'rgba(254, 240, 138, 0.95)';
            this.ctx.font = `600 ${this.isMobile ? '8.5px' : '10px'} 'Outfit', sans-serif`;
            this.ctx.shadowColor = '#c084fc';
            this.ctx.shadowBlur = this.isMobile ? 0 : 8 * alpha;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            const offsetY = (this.isMobile ? 16 : 20) + (star.labelOffset || 0);
            this.ctx.fillText(label, star.x, star.y + offsetY);
            this.ctx.restore();
          }
        }
      }

      this.ctx.restore();
    }
  }
}
