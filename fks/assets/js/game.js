/* =========================== */
    /* =========================== */
    /* =========================== */
    // ═══════════════════════════════════════════════════════════════════════════════
		// CANVAS SETUP
		// ═══════════════════════════════════════════════════════════════════════════════
		const canvas = document.getElementById('gameCanvas');
		const ctx = canvas.getContext('2d');
		function resizeCanvas() {
			const dpr = window.devicePixelRatio || 1;

			const rect = canvas.getBoundingClientRect();

			canvas.width = rect.width * dpr;
			canvas.height = rect.height * dpr;

			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			// Update global width/height
			W = rect.width;
			H = rect.height;
		}

		let W, H;

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		// ─── LAYOUT ───────────────────────────────────────────────────────────────────
		const HUD_H = 200;
		const FLOOR_Y = H - 100;
		const WALL_TOP = HUD_H + 50;
		const WALL_BOT = FLOOR_Y;
		const SHELF_ROWS = 5;
		const COLS_PER_GROUP = 4;
		const COL_SPACING = 50;
		const GROUP_GAP = 40;
		const SEC_H = (WALL_BOT - WALL_TOP) / SHELF_ROWS;
		const PROD_H = 42;
		const PROD_W = 38;
		const PERSON_X = 300;
		const FLOOR_DRAW_Y = FLOOR_Y + 30;

		// ─── GAME CONSTANTS ───────────────────────────────────────────────────────────
		const GAME_DURATION = 50;
		const MAX_WEIGHT = 15;

		// ═══════════════════════════════════════════════════════════════════════════════
		// PRODUCTS (no power-ups, simple grocery items only)
		// ═══════════════════════════════════════════════════════════════════════════════
		const PRODUCTS = [
			{ name: 'Mongoffi', img: 'assets/images/product/Group 188.png', weight: 0.5, category: 'Biscuits' },
			{ name: 'Manga', img: 'assets/images/product/Manga.png', weight: 0.5, category: 'Biscuits' },
			{ name: 'Break', img: 'assets/images/product/Break.png', weight: 0.5, category: 'Biscuits' },
			{ name: 'CookieBoom', img: 'assets/images/product/CookieBoom.png', weight: 0.3, category: 'Biscuits' },
			{ name: 'Empire', img: 'assets/images/product/Empire.png', weight: 1.2, category: 'Biscuits' },
			{ name: 'Monsaic', img: 'assets/images/product/Monsaic.png', weight: 0.6, category: 'Biscuits' },
			{ name: 'Harmony', img: 'assets/images/product/Harmony.png', weight: 0.7, category: 'Biscuits' },
			{ name: 'Dorello', img: 'assets/images/product/Dorello.png', weight: 0.7, category: 'Biscuits' },
			{ name: 'Go7', img: 'assets/images/product/Go7.png', weight: 0.7, category: 'Biscuits' },
			{ name: 'Carnaval', img: 'assets/images/product/Carnaval.png', weight: 0.7, category: 'Biscuits' },
			{ name: 'Miximax', img: 'assets/images/product/Miximax.png', weight: 0.7, category: 'Chocolate' },
			{ name: 'MonChoco', img: 'assets/images/product/MonChoco.png', weight: 0.4, category: 'Chocolate' },
			{ name: 'MonChoco2', img: 'assets/images/product/MonChoco1.png', weight: 0.4, category: 'Chocolate' },
			{ name: 'ChocoBoss', img: 'assets/images/product/ChocoBoss.png', weight: 0.7, category: 'Chocolate' },
			{ name: 'Nuttos', img: 'assets/images/product/Nuttos.png', weight: 0.7, category: 'Chocolate' },
			{ name: 'Classic', img: 'assets/images/product/Classic.png', weight: 0.4, category: 'Coffee' },
			{ name: 'Carmel Cappuccino', img: 'assets/images/product/Carmel Cappuccino.png', weight: 0.4, category: 'Coffee' },
			{ name: '3in1', img: 'assets/images/product/3in1.png', weight: 0.4, category: 'Coffee' },
			{ name: 'White Chocolate', img: 'assets/images/product/White Chocolate.png', weight: 0.4, category: 'Coffee' },
			{ name: 'Majeste', img: 'assets/images/product/Majeste.png', weight: 0.4, category: 'Coffee' },
			{ name: 'Panelli', img: 'assets/images/product/Panelli.png', weight: 0.4, category: 'Baking' },
			{ name: 'Gourmet', img: 'assets/images/product/Gourmet.png', weight: 0.4, category: 'Baking' },
			{ name: 'Creamaya', img: 'assets/images/product/Creamaya.png', weight: 0.4, category: 'Peanut' },
			{ name: 'Nutlove', img: 'assets/images/product/Nutlove.png', weight: 0.4, category: 'Peanut' },
			{ name: 'Super Type55', img: 'assets/images/product/Super Type55.png', weight: 0.4, category: 'Flour' },
			{ name: 'Export Type45', img: 'assets/images/product/Export Type45.png', weight: 0.4, category: 'Flour' },
			{ name: 'Export Type55', img: 'assets/images/product/Export Type55.png', weight: 0.4, category: 'Flour' },
			{ name: 'Type65', img: 'assets/images/product/Type65.png', weight: 0.4, category: 'Flour' },
			{ name: 'Type150', img: 'assets/images/product/Type150.png', weight: 0.4, category: 'Flour' },
		];

		// ── Preload images keyed by img path (avoids duplicate-name collision) ────────
		const productImages = {};
		PRODUCTS.forEach(p => {
			const img = new Image();
			img.src = window.themeUrl + '/' + p.img;
			productImages[p.img] = img;
		});

		// ── Category-to-products lookup built once ────────────────────────────────────
		const CATEGORIES = ['Biscuits', 'Chocolate', 'Coffee', 'Baking', 'Peanut', 'Flour'];
		const CAT_PRODUCTS = {};
		CATEGORIES.forEach(cat => {
			CAT_PRODUCTS[cat] = PRODUCTS.filter(p => p.category === cat);
		});

		// const CAT_EMOJIS = { Biscuits: 'assets/images/product/cookie.png', Chocolate: 'assets/images/product/spreads.png', Coffee: 'assets/images/product/coffee.png', Baking: 'assets/images/product/baking.png', Peanut: 'assets/images/product/peanut.png', Flour: 'assets/images/product/flour.png' };
		const CAT_EMOJIS = { Biscuits: '', Chocolate: '', Coffee: '', Baking: '', Peanut: '', Flour: '' };

		// ═══════════════════════════════════════════════════════════════════════════════
		// SOUND ENGINE
		// ═══════════════════════════════════════════════════════════════════════════════
		const SoundEngine = (() => {
			let ctx2 = null;
			function init() { if (!ctx2) ctx2 = new (window.AudioContext || window.webkitAudioContext)(); }
			function beep(freq, dur, type = 'sine', vol = 0.3) {
				if (!ctx2) return;
				try {
					const o = ctx2.createOscillator(), g = ctx2.createGain();
					o.connect(g); g.connect(ctx2.destination);
					o.type = type; o.frequency.value = freq;
					g.gain.setValueAtTime(vol, ctx2.currentTime);
					g.gain.exponentialRampToValueAtTime(0.001, ctx2.currentTime + dur);
					o.start(ctx2.currentTime); o.stop(ctx2.currentTime + dur);
				} catch (e) { }
			}
			return {
				init,
				collect() { init(); beep(660, 0.12, 'sine', 0.25); setTimeout(() => beep(880, 0.10, 'sine', 0.20), 80); },
				newcat() { init(); beep(440, 0.07); setTimeout(() => beep(550, 0.07), 70); setTimeout(() => beep(660, 0.07), 140); setTimeout(() => beep(880, 0.14), 210); },
				wrong() { init(); beep(180, 0.22, 'sawtooth', 0.18); },
				pause() { init(); beep(330, 0.15, 'triangle', 0.20); },
				gameover() { init(); beep(220, 0.3, 'sawtooth', 0.25); setTimeout(() => beep(165, 0.4, 'sawtooth', 0.22), 250); setTimeout(() => beep(110, 0.6, 'sawtooth', 0.20), 500); },
				start() { init(); beep(440, 0.08); setTimeout(() => beep(660, 0.12, 'sine', 0.25), 80); },
				click() { init(); beep(500, 0.08, 'sine', 0.15); },
			};
		})();

		// ═══════════════════════════════════════════════════════════════════════════════
		// GAME STATE
		// ═══════════════════════════════════════════════════════════════════════════════
		let G = {};

		function resetGame() {
			G = {
				state: 'ready',          // 'ready' | 'playing' | 'gameover'
				isPaused: false,
				collectedCategories: new Set(),
				collectedItems: [],
				totalWeight: 0,
				timeLeft: GAME_DURATION,
				lastTS: null,
				scrollX: 0,
				scrollSpeed: 5,
				isStopped: false,
				isCollecting: false,
				collectProgress: 0,
				collectingItem: null,
				productGroups: [],
				floaters: [],
				confetti: [],
				nextWorldX: W * 0.28,
				catIdx: 0,
				walkFrame: 0,
				walkTimer: 0,
				wheelAngle: 0,
				shakeTimer: 0,
				flashTimer: 0,
				flashColor: '#fff',
				deathReason: 'time',
			};
			for (let i = 0; i < 7; i++) spawnGroup();
		}

		// ═══════════════════════════════════════════════════════════════════════════════
		// SPAWN — one shelf per category, products cycle within that category
		// ═══════════════════════════════════════════════════════════════════════════════
		function spawnGroup() {
			// Cycle through categories (not individual products)
			const catName = CATEGORIES[G.catIdx % CATEGORIES.length];
			G.catIdx++;

			const catProducts = CAT_PRODUCTS[catName]; // array of products for this category

			const collected = Array.from({ length: SHELF_ROWS }, () => new Array(COLS_PER_GROUP).fill(false));
			G.productGroups.push({
				startX: G.nextWorldX,
				catName,       // e.g. 'Biscuits'
				catProducts,   // e.g. [{ name:'Mongoffi', ... }, { name:'Manga', ... }, ...]
				collected,
				highlight: 0,
			});
			G.nextWorldX += COLS_PER_GROUP * COL_SPACING + GROUP_GAP;
		}

		// ── Returns the specific product object for a given shelf slot (row, col) ─────
		// Products cycle: slot 0→product[0], slot 1→product[1], ... wraps around
		function getProductAt(g, r, c) {
			const slotIdx = r * COLS_PER_GROUP + c;
			return g.catProducts[slotIdx % g.catProducts.length];
		}

		// ═══════════════════════════════════════════════════════════════════════════════
		// INPUT
		// ═══════════════════════════════════════════════════════════════════════════════
		const keys = {};
		let mousePos = { x: 0, y: 0 };

		canvas.addEventListener('mousemove', e => {
			const r = canvas.getBoundingClientRect();
			mousePos.x = (e.clientX - r.left) * (W / r.width);
			mousePos.y = (e.clientY - r.top) * (H / r.height);
		});
		canvas.addEventListener('click', e => {
			const r = canvas.getBoundingClientRect();
			const mx = (e.clientX - r.left) * (W / r.width);
			const my = (e.clientY - r.top) * (H / r.height);
			SoundEngine.click();
			handleClick(mx, my);
		});
		document.addEventListener('keydown', e => {
			if (['Space', 'Enter', 'ArrowUp', 'ArrowDown', 'KeyP'].includes(e.code)) e.preventDefault();
			if (!keys[e.code]) {
				keys[e.code] = true;
				SoundEngine.init();
				if (e.code === 'Space' || e.code === 'Enter') {
					if (G.state === 'ready') { beginPlaying(); return; }
					if (G.state === 'gameover') { resetGame(); return; }
					if (G.state === 'playing' && !G.isPaused) G.isStopped = true;
				}
				if (e.code === 'KeyP' && G.state === 'playing') {
					G.isPaused = !G.isPaused;
					SoundEngine.pause();
				}
			}
		});
		document.addEventListener('keyup', e => {
			keys[e.code] = false;
			if ((e.code === 'Space' || e.code === 'Enter') && G.state === 'playing') {
				G.isStopped = false; G.isCollecting = false;
				G.collectProgress = 0; G.collectingItem = null;
			}
		});

		function handleClick(mx, my) {
			if (G.state === 'ready') { beginPlaying(); return; }
			if (G.state === 'gameover') { resetGame(); return; }
			if (G.state === 'playing') {
				if (mx > W - 80 && my < HUD_H) { G.isPaused = !G.isPaused; SoundEngine.pause(); }
			}
		}

		function beginPlaying() {
			SoundEngine.start();
			G.state = 'playing';
			G.lastTS = null; // reset so dt doesn't jump on first tick
		}

		// ═══════════════════════════════════════════════════════════════════════════════
		// MAIN LOOP
		// ═══════════════════════════════════════════════════════════════════════════════
		function loop(ts) {
			if (!G.lastTS) G.lastTS = ts;
			const dt = Math.min(ts - G.lastTS, 50);
			G.lastTS = ts;
			update(dt);
			draw();
			requestAnimationFrame(loop);
		}

		// ═══════════════════════════════════════════════════════════════════════════════
		// UPDATE
		// ═══════════════════════════════════════════════════════════════════════════════
		function scrollAndAnimate(dt) {
			G.walkTimer += dt;
			if (G.walkTimer > 110) { G.walkFrame = (G.walkFrame + 1) % 4; G.walkTimer = 0; }
			G.scrollX += G.scrollSpeed;
			G.wheelAngle += G.scrollSpeed * 0.027;
			while (G.nextWorldX - G.scrollX < W + 500) spawnGroup();
			const gw = COLS_PER_GROUP * COL_SPACING + GROUP_GAP;
			G.productGroups = G.productGroups.filter(g => g.startX + gw - G.scrollX > -400);
		}

		function update(dt) {
			if (G.isPaused) return;

			// ── READY STATE: shelf scrolls, character walks, timer frozen ──────────────
			if (G.state === 'ready') {
				scrollAndAnimate(dt);
				for (const g of G.productGroups) {
					const sx = g.startX - G.scrollX;
					const near = sx > PERSON_X - 20 && sx < PERSON_X + 180;
					g.highlight = near ? Math.min(1, g.highlight + dt * 0.005) : Math.max(0, g.highlight - dt * 0.005);
				}
				return;
			}

			if (G.state !== 'playing') return;

			// ── TIMER ──────────────────────────────────────────────────────────────────
			G.timeLeft -= dt / 1000;
			if (G.timeLeft <= 0) { G.timeLeft = 0; endGame('time'); return; }

			// ── SCROLL + WALK ──────────────────────────────────────────────────────────
			if (!G.isStopped) scrollAndAnimate(dt);

			// ── SHAKE / FLASH ──────────────────────────────────────────────────────────
			if (G.shakeTimer > 0) G.shakeTimer -= dt;
			if (G.flashTimer > 0) G.flashTimer -= dt;

			// ── SHELF HIGHLIGHT ────────────────────────────────────────────────────────
			for (const g of G.productGroups) {
				const sx = g.startX - G.scrollX;
				const near = sx > PERSON_X - 20 && sx < PERSON_X + 180;
				g.highlight = near ? Math.min(1, g.highlight + dt * 0.005) : Math.max(0, g.highlight - dt * 0.005);
			}

			// ── COLLECTION ─────────────────────────────────────────────────────────────
			if (G.isStopped) {
				if (!G.isCollecting) {
					let best = null, bestDist = Infinity;
					for (const g of G.productGroups) {
						for (let r = 0; r < SHELF_ROWS; r++) {
							for (let c = 0; c < COLS_PER_GROUP; c++) {
								if (g.collected[r][c]) continue;
								const sx = g.startX + c * COL_SPACING - G.scrollX;
								if (sx > PERSON_X - 20 && sx < PERSON_X + 210) {
									const d = Math.abs(sx - (PERSON_X + 90));
									if (d < bestDist) { bestDist = d; best = { g, r, c }; }
								}
							}
						}
					}
					if (best) { G.isCollecting = true; G.collectingItem = best; G.collectProgress = 0; }
				}
				if (G.isCollecting && G.collectingItem) {
					G.collectProgress += dt;
					if (G.collectProgress >= 400) {
						const { g, r, c } = G.collectingItem;
						if (!g.collected[r][c]) {
							g.collected[r][c] = true;
							const sx = g.startX + c * COL_SPACING - G.scrollX;
							const sy = WALL_TOP + r * SEC_H + SEC_H * 0.5;
							// ── CHANGED: look up the specific product at this slot ──
							const product = getProductAt(g, r, c);
							collectItem(product, sx, sy);
						}
						G.isCollecting = false; G.collectProgress = 0; G.collectingItem = null;
					}
				}
			}

			// ── FLOATERS ───────────────────────────────────────────────────────────────
			G.floaters = G.floaters.filter(f => {
				f.life -= dt; f.y -= f.vy * dt * 0.06;
				f.alpha = Math.max(0, f.life / f.maxLife);
				return f.life > 0;
			});

			// ── CONFETTI ───────────────────────────────────────────────────────────────
			G.confetti.forEach(c => {
				c.x += c.vx * (dt / 16); c.y += c.vy * (dt / 16);
				c.vy += 0.18; c.r += c.rs; c.life -= dt;
			});
			G.confetti = G.confetti.filter(c => c.life > 0 && c.y < H + 20);
		}

		// ═══════════════════════════════════════════════════════════════════════════════
		// COLLECT ITEM — now receives a specific product object
		// ═══════════════════════════════════════════════════════════════════════════════
		function collectItem(cat, sx, sy) {
			const newWeight = G.totalWeight + cat.weight;
			if (newWeight > MAX_WEIGHT + 0.001) {
				SoundEngine.wrong();
				spawnFloater('TOO HEAVY! ⚖', sx, sy - 20, '#ff4444', 20, 1400);
				G.shakeTimer = 250; G.flashTimer = 200; G.flashColor = '#ff6600';
				endGame('weight');
				return;
			}

			const isNewCat = !G.collectedCategories.has(cat.category);
			G.totalWeight = parseFloat(newWeight.toFixed(2));
			G.collectedCategories.add(cat.category);
			G.collectedItems.push({ cat, time: G.timeLeft });

			SoundEngine.collect();
			if (isNewCat) {
				SoundEngine.newcat();
				spawnFloater(`✨ NEW: ${cat.category}!`, sx, sy - 38, '#ffd700', 18, 1600);
			}
			spawnFloater(`+${cat.weight}kg`, sx, sy, '#ffffff', 17, 1100);
			G.shakeTimer = 80; G.flashTimer = 80; G.flashColor = '#ffffff';
		}

		// ═══════════════════════════════════════════════════════════════════════════════
		// END GAME
		// ═══════════════════════════════════════════════════════════════════════════════
		function endGame(reason) {
			G.deathReason = reason;
			G.state = 'gameover';
			SoundEngine.gameover();
			/* spawnConfetti(); */
		}

		function spawnFloater(text, x, y, color, size, duration) {
			G.floaters.push({ text, x, y, color, size: size || 16, maxLife: duration || 1000, life: duration || 1000, alpha: 1, vy: 1 });
		}

		/* function spawnConfetti() {
			for (let i = 0; i < 100; i++) {
				G.confetti.push({
					x: Math.random() * W, y: -10,
					vx: (Math.random() - 0.5) * 4, vy: Math.random() * 3 + 1,
					r: 0, rs: (Math.random() - 0.5) * 0.15,
					w: Math.random() * 10 + 4, h: Math.random() * 6 + 3,
					color: ['#ffd700', '#e74c3c', '#2ecc71', '#3498db', '#9b59b6', '#e67e22', '#1abc9c'][Math.floor(Math.random() * 7)],
					life: 4000 + Math.random() * 2000,
				});
			}
		} */

		// ═══════════════════════════════════════════════════════════════════════════════
		// DRAW HELPERS
		// ═══════════════════════════════════════════════════════════════════════════════
		function rr(x, y, w, h, r) {
			if (w < 2 * r) r = w / 2;
			if (h < 2 * r) r = h / 2;
			ctx.beginPath();
			ctx.moveTo(x + r, y);
			ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
			ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
			ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
			ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
			ctx.closePath();
		}
		function lighten(hex, amt) {
			const n = parseInt(hex.replace('#', ''), 16);
			const r = Math.min(255, ((n >> 16) & 0xff) + amt);
			const g = Math.min(255, ((n >> 8) & 0xff) + amt);
			const b = Math.min(255, (n & 0xff) + amt);
			return `rgb(${r},${g},${b})`;
		}

		// ═══════════════════════════════════════════════════════════════════════════════
		// DRAW MAIN
		// ═══════════════════════════════════════════════════════════════════════════════
		function draw() {
			if (G.state === 'gameover') { drawGameOver(); return; }

			// Screen shake (playing only)
			const shakeAmt = G.shakeTimer > 0 ? (Math.random() - 0.5) * Math.min(G.shakeTimer * 0.04, 8) : 0;
			ctx.save();
			ctx.translate(shakeAmt, shakeAmt * 0.5);

			drawBackground();
			drawShelves();
			drawPerson();
			drawHUD();
			drawFloaters();
			drawConfetti();

			if (G.flashTimer > 0) {
				ctx.fillStyle = G.flashColor;
				ctx.globalAlpha = (G.flashTimer / 200) * 0.18;
				ctx.fillRect(0, 0, W, H);
				ctx.globalAlpha = 1;
			}

			ctx.restore();
			if (G.isPaused) drawPause();

			// Ready state overlay on top of moving game world
			if (G.state === 'ready') drawReadyOverlay();
		}

		// ─── BACKGROUND ───────────────────────────────────────────────────────────────
		function drawBackground() {
			const ceil = ctx.createLinearGradient(0, 0, 0, HUD_H + 20);
			ceil.addColorStop(0, '#ffffff'); ceil.addColorStop(1, '#ffffff');
			ctx.fillStyle = ceil;
			ctx.fillRect(0, 0, W, HUD_H + 20);

			const wallGrad = ctx.createLinearGradient(0, HUD_H, 0, FLOOR_Y);
			wallGrad.addColorStop(0, '#ffffff'); wallGrad.addColorStop(0.4, '#ffffff'); wallGrad.addColorStop(1, '#ffffff');
			ctx.fillStyle = wallGrad;
			ctx.fillRect(0, HUD_H, W, FLOOR_Y - HUD_H);

			ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1;
			for (let tx = (-G.scrollX * 0.15) % 80; tx < W; tx += 80) {
				ctx.beginPath(); ctx.moveTo(tx, HUD_H); ctx.lineTo(tx, FLOOR_Y); ctx.stroke();
			}
			for (let ty = HUD_H; ty < FLOOR_Y; ty += 50) {
				ctx.beginPath(); ctx.moveTo(0, ty); ctx.lineTo(W, ty); ctx.stroke();
			}

			const flrGrad = ctx.createLinearGradient(0, FLOOR_Y, 0, H);
			flrGrad.addColorStop(0, '#bdc3c7'); flrGrad.addColorStop(0.15, '#d5d8dc'); flrGrad.addColorStop(1, '#aab2bd');
			ctx.fillStyle = flrGrad;
			ctx.fillRect(0, FLOOR_Y, W, H - FLOOR_Y);

			ctx.save();
			const tileSize = 90, tileOff = (-G.scrollX * 0.95) % tileSize;
			for (let tx = tileOff - tileSize; tx < W + tileSize; tx += tileSize) {
				for (let ty = FLOOR_Y; ty < H; ty += tileSize * 0.5) {
					ctx.strokeStyle = 'rgba(0,0,0,0.06)'; ctx.lineWidth = 1;
					ctx.strokeRect(tx, ty, tileSize, tileSize * 0.5);
				}
			}
			for (let tx = tileOff - tileSize; tx < W + tileSize; tx += tileSize) {
				ctx.fillStyle = 'rgba(255,255,255,0.06)';
				ctx.fillRect(tx + 4, FLOOR_Y + 4, tileSize - 8, 12);
			}
			ctx.restore();

			const shadowG = ctx.createLinearGradient(0, FLOOR_Y - 20, 0, FLOOR_Y + 15);
			shadowG.addColorStop(0, 'rgba(0,0,0,0.35)'); shadowG.addColorStop(1, 'rgba(0,0,0,0)');
			ctx.fillStyle = shadowG;
			ctx.fillRect(0, FLOOR_Y - 20, W, 35);

			const lightSpacing = 160, lightOff = (-G.scrollX * 0.1) % lightSpacing;
			for (let lx = lightOff; lx < W; lx += lightSpacing) {
				ctx.save();
				ctx.fillStyle = 'rgba(255,255,220,0.85)';
				rr(lx - 30, HUD_H + 6, 60, 10, 4); ctx.fill();
				const glowG = ctx.createRadialGradient(lx, HUD_H + 11, 0, lx, HUD_H + 11, 80);
				glowG.addColorStop(0, 'rgba(255,255,200,0.12)'); glowG.addColorStop(1, 'rgba(0,0,0,0)');
				ctx.fillStyle = glowG;
				ctx.fillRect(lx - 80, HUD_H, 160, 120);
				ctx.restore();
			}
		}

		// ─── SHELVES ──────────────────────────────────────────────────────────────────
		function drawShelves() {
			for (const g of G.productGroups) {
				const sx = g.startX - G.scrollX;
				const shelfW = COLS_PER_GROUP * COL_SPACING + 20;
				if (sx > W + 100 || sx + shelfW < -100) continue;
				drawShelfUnit(sx - 10, g.highlight);
				drawProducts(g, sx);
			}
		}

		function drawShelfUnit(sx, highlight) {
			const sw = COLS_PER_GROUP * COL_SPACING + 20;
			const top = WALL_TOP, bot = WALL_BOT;

			ctx.fillStyle = highlight > 0.1
				? '#ffffff' : 'rgb(255, 255, 255)';
			rr(sx, top, sw, bot - top, 4); ctx.fill();

			for (let r = 0; r <= SHELF_ROWS; r++) {
				const py = top + r * SEC_H, plankH = 12;
				const woodG = ctx.createLinearGradient(sx, py, sx, py + plankH);
				woodG.addColorStop(0, '#c8954a'); woodG.addColorStop(0.3, '#d4a456');
				woodG.addColorStop(0.7, '#b8853a'); woodG.addColorStop(1, '#a07030');
				ctx.fillStyle = woodG;
				ctx.fillRect(sx - 4, py - plankH / 2, sw + 8, plankH);
				ctx.strokeStyle = 'rgba(100,60,20,0.18)'; ctx.lineWidth = 1;
				for (let gx = sx - 4; gx < sx + sw + 8; gx += 14) {
					ctx.beginPath(); ctx.moveTo(gx, py - plankH / 2 + 2); ctx.lineTo(gx + 3, py + plankH / 2 - 2); ctx.stroke();
				}
				const depthG = ctx.createLinearGradient(sx, py + plankH / 2, sx, py + plankH / 2 + 7);
				depthG.addColorStop(0, '#8b5e2a'); depthG.addColorStop(1, '#6b4420');
				ctx.fillStyle = depthG;
				ctx.fillRect(sx - 4, py + plankH / 2, sw + 8, 7);
				ctx.fillStyle = 'rgba(255,255,200,0.18)';
				ctx.fillRect(sx - 4, py - plankH / 2, sw + 8, 2);
			}
			drawSteelPost(sx - 8, top - 4, 10, bot - top + 8, highlight);
			drawSteelPost(sx + sw - 2, top - 4, 10, bot - top + 8, highlight);
		}

		function drawSteelPost(x, y, w, h, highlight) {
			const metalG = ctx.createLinearGradient(x, 0, x + w, 0);
			metalG.addColorStop(0, '#606060'); metalG.addColorStop(0.3, '#909090');
			metalG.addColorStop(0.6, '#b0b0b0'); metalG.addColorStop(1, '#707070');
			ctx.fillStyle = metalG;
			ctx.fillRect(x, y, w, h);
			for (let ry = y + 20; ry < y + h - 10; ry += 30) {
				ctx.fillStyle = 'rgba(0,0,0,0.4)';
				ctx.beginPath(); ctx.arc(x + w / 2, ry, 2.5, 0, Math.PI * 2); ctx.fill();
				ctx.fillStyle = 'rgba(255,255,255,0.2)';
				ctx.beginPath(); ctx.arc(x + w / 2 - 0.5, ry - 0.5, 1.5, 0, Math.PI * 2); ctx.fill();
			}
			ctx.fillStyle = 'rgba(255,255,255,0.15)';
			ctx.fillRect(x + 1, y, 2, h);
		}

		// ── CHANGED: each slot draws its own product from the category ────────────────
		function drawProducts(g, sx) {
			for (let r = 0; r < SHELF_ROWS; r++) {
				for (let c = 0; c < COLS_PER_GROUP; c++) {
					if (g.collected[r][c]) continue;
					const px = sx + c * COL_SPACING + COL_SPACING / 2 - PROD_W / 2;
					const py = WALL_TOP + r * SEC_H + (SEC_H - PROD_H) - 8;
					// Get the specific product for this slot (cycles through category's products)
					const product = getProductAt(g, r, c);
					drawProduct(product, px, py, PROD_W, PROD_H, g.highlight);
				}
			}
		}

		// ── CHANGED: uses product.img as image key instead of product.name ────────────
		function drawProduct(cat, x, y, w, h, highlight) {
			ctx.save();

			// Draw image — keyed by img path to avoid duplicate-name collision
			const img = productImages[cat.img];

			if (img && img.complete) {
				ctx.drawImage(img, x, y, w, h);
			}

			ctx.restore();
		}

		// ─── PERSON + TROLLEY ─────────────────────────────────────────────────────────
		function drawPerson() {
			const foot = FLOOR_DRAW_Y, px = PERSON_X;
			const moving = !G.isStopped;
			const legSwing = moving ? Math.sin(G.walkFrame * Math.PI / 2) * 10 : 0;
			ctx.save();

			drawTrolley(px + 36, foot - 62, foot);

			ctx.fillStyle = 'rgba(0,0,0,0.22)';
			rr(px - 10, foot - 6, 38, 10, 5); ctx.fill();

			ctx.strokeStyle = '#1a252f'; ctx.lineWidth = 9; ctx.lineCap = 'round';
			ctx.beginPath(); ctx.moveTo(px + 10, foot - 28); ctx.lineTo(px + 10 + legSwing, foot); ctx.stroke();
			ctx.beginPath(); ctx.moveTo(px + 18, foot - 28); ctx.lineTo(px + 18 - legSwing, foot); ctx.stroke();
			ctx.fillStyle = '#1a252f';
			rr(px + 10 + legSwing - 6, foot - 5, 16, 7, 3); ctx.fill();
			rr(px + 18 - legSwing - 5, foot - 5, 16, 7, 3); ctx.fill();

			const bodyG = ctx.createLinearGradient(px, foot - 72, px + 30, foot - 28);
			bodyG.addColorStop(0, '#3498db'); bodyG.addColorStop(1, '#2980b9');
			ctx.fillStyle = bodyG;
			rr(px, foot - 72, 30, 44, 10); ctx.fill();
			ctx.strokeStyle = '#2471a3'; ctx.lineWidth = 1.5;
			rr(px, foot - 72, 30, 44, 10); ctx.stroke();
			ctx.fillStyle = 'rgba(255,255,255,0.15)';
			rr(px + 2, foot - 70, 14, 16, 6); ctx.fill();

			ctx.strokeStyle = '#f5cba7'; ctx.lineWidth = 8; ctx.lineCap = 'round';
			ctx.beginPath(); ctx.moveTo(px + 26, foot - 58); ctx.lineTo(px + 74, foot - 56); ctx.stroke();

			const headY = foot - 88;
			ctx.fillStyle = '#f5cba7';
			ctx.beginPath(); ctx.arc(px + 14, headY, 14, 0, Math.PI * 2); ctx.fill();
			ctx.strokeStyle = '#d4a574'; ctx.lineWidth = 1.5;
			ctx.beginPath(); ctx.arc(px + 14, headY, 14, 0, Math.PI * 2); ctx.stroke();
			ctx.fillStyle = '#2c1810';
			ctx.beginPath(); ctx.arc(px + 14, headY - 4, 14, Math.PI, 0); ctx.fill();
			rr(px + 2, headY - 16, 24, 10, 5); ctx.fill();

			ctx.fillStyle = 'white';
			ctx.beginPath(); ctx.ellipse(px + 9, headY - 2, 4, 5, 0, 0, Math.PI * 2); ctx.fill();
			ctx.beginPath(); ctx.ellipse(px + 19, headY - 2, 4, 5, 0, 0, Math.PI * 2); ctx.fill();
			ctx.fillStyle = '#1a252f';
			ctx.beginPath(); ctx.arc(px + 10, headY - 1, 2.5, 0, Math.PI * 2); ctx.fill();
			ctx.beginPath(); ctx.arc(px + 20, headY - 1, 2.5, 0, Math.PI * 2); ctx.fill();
			ctx.strokeStyle = '#c0392b'; ctx.lineWidth = 1.5;
			if (G.totalWeight > MAX_WEIGHT * 0.8) {
				ctx.beginPath(); ctx.arc(px + 14, headY + 6, 4, Math.PI * 0.1, Math.PI * 0.9, true); ctx.stroke();
			} else {
				ctx.beginPath(); ctx.arc(px + 14, headY + 4, 4, 0, Math.PI); ctx.stroke();
			}

			// Collection progress bar
			if (G.isCollecting && G.collectingItem) {
				const prog = G.collectProgress / 400;
				const bx = px - 10, by = foot - 110, bw = 52, bh = 9;
				ctx.fillStyle = 'rgba(0,0,0,0.5)';
				rr(bx, by, bw, bh, 4); ctx.fill();
				const pgG = ctx.createLinearGradient(bx, 0, bx + bw, 0);
				pgG.addColorStop(0, '#2ecc71'); pgG.addColorStop(1, '#27ae60');
				ctx.fillStyle = pgG;
				rr(bx, by, bw * prog, bh, 4); ctx.fill();
				ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1;
				rr(bx, by, bw, bh, 4); ctx.stroke();
			}
			ctx.restore();
		}

		function drawTrolley(tx, ty, foot) {
			ctx.fillStyle = 'rgba(0,0,0,0.2)';
			rr(tx - 2, foot - 7, 58, 10, 5); ctx.fill();

			ctx.strokeStyle = '#95a5a6'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
			ctx.beginPath();
			ctx.moveTo(tx, ty); ctx.lineTo(tx + 50, ty);
			ctx.lineTo(tx + 50, ty + 35); ctx.lineTo(tx, ty + 35);
			ctx.closePath(); ctx.stroke();
			ctx.beginPath(); ctx.moveTo(tx, ty + 35); ctx.lineTo(tx - 6, foot - 18); ctx.stroke();
			ctx.beginPath(); ctx.moveTo(tx + 50, ty + 35); ctx.lineTo(tx + 44, foot - 18); ctx.stroke();

			ctx.fillStyle = 'rgba(149,165,166,0.18)';
			rr(tx + 1, ty + 1, 49, 34, 3); ctx.fill();
			ctx.strokeStyle = 'rgba(149,165,166,0.30)'; ctx.lineWidth = 1;
			for (let mx = tx + 10; mx < tx + 50; mx += 10) {
				ctx.beginPath(); ctx.moveTo(mx, ty + 1); ctx.lineTo(mx, ty + 34); ctx.stroke();
			}
			for (let my = ty + 8; my < ty + 35; my += 8) {
				ctx.beginPath(); ctx.moveTo(tx + 1, my); ctx.lineTo(tx + 49, my); ctx.stroke();
			}

			if (G.collectedItems.length > 0) {
				const show = G.collectedItems.slice(-4);
				show.forEach((item, i) => {
					ctx.font = '13px serif';
					ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
					ctx.fillText(item.cat.emoji, tx + 10 + i * 12, ty + 18);
				});
				if (G.collectedItems.length > 4) {
					ctx.fillStyle = 'rgba(255,255,255,0.5)';
					ctx.font = 'bold 9px Nunito';
					ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
					ctx.fillText(`+${G.collectedItems.length - 4}`, tx + 44, ty + 18);
				}
			}

			ctx.strokeStyle = '#7f8c8d'; ctx.lineWidth = 4; ctx.lineCap = 'round';
			ctx.beginPath(); ctx.moveTo(tx + 50, ty + 8); ctx.lineTo(tx + 60, ty + 2); ctx.stroke();

			const wa = G.wheelAngle;
			[tx + 6, tx + 44].forEach(wx => {
				ctx.fillStyle = '#2c3e50';
				ctx.beginPath(); ctx.arc(wx, foot - 8, 8, 0, Math.PI * 2); ctx.fill();
				ctx.strokeStyle = '#bdc3c7'; ctx.lineWidth = 2;
				ctx.beginPath(); ctx.arc(wx, foot - 8, 8, 0, Math.PI * 2); ctx.stroke();
				ctx.strokeStyle = '#95a5a6'; ctx.lineWidth = 1.5;
				for (let s = 0; s < 4; s++) {
					const a = wa + s * Math.PI / 2;
					ctx.beginPath();
					ctx.moveTo(wx, foot - 8);
					ctx.lineTo(wx + Math.cos(a) * 7, foot - 8 + Math.sin(a) * 7);
					ctx.stroke();
				}
			});

			// Weight dots on trolley
			const wPct = G.totalWeight / MAX_WEIGHT;
			if (G.totalWeight > 0) {
				const wCol = wPct > 0.8 ? '#e74c3c' : wPct > 0.5 ? '#e67e22' : '#2ecc71';
				ctx.save(); ctx.globalAlpha = 0.85; ctx.fillStyle = wCol;
				for (let d = 0; d < Math.ceil(wPct * 5); d++) {
					ctx.beginPath(); ctx.arc(tx + 6 + d * 10, ty - 8, 4, 0, Math.PI * 2); ctx.fill();
				}
				ctx.restore();
			}
		}

		// ─── HUD ──────────────────────────────────────────────────────────────────────
		function drawHUD() {
			// Background
			const hudG = ctx.createLinearGradient(0, 0, 0, HUD_H);
			hudG.addColorStop(0, 'rgba(10,17,28,0.98)');
			hudG.addColorStop(1, 'rgba(15,22,35,0.94)');
			ctx.fillStyle = hudG;
			ctx.fillRect(0, 0, W, HUD_H);
			ctx.strokeStyle = 'rgba(255,215,0,0.20)'; ctx.lineWidth = 1;
			ctx.beginPath(); ctx.moveTo(0, HUD_H); ctx.lineTo(W, HUD_H); ctx.stroke();

			const cy = HUD_H / 2;

			// ── TIMER (left) ────────────────────────────────────────────────────────
			const timerLow = G.timeLeft < 10;
			const timerBlink = timerLow && Math.floor(Date.now() / 350) % 2 === 0;
			const tCX = 46, tCY = cy, tR = 30;

			// Ring track
			ctx.save();
			ctx.strokeStyle = 'rgba(255,255,255,0.10)'; ctx.lineWidth = 6;
			ctx.beginPath(); ctx.arc(tCX, tCY, tR, 0, Math.PI * 2); ctx.stroke();

			// Ring fill
			ctx.strokeStyle = timerBlink ? '#e74c3c' : timerLow ? '#e67e22' : '#3498db';
			ctx.lineWidth = 6;
			ctx.beginPath();
			ctx.arc(tCX, tCY, tR, -Math.PI / 2, -Math.PI / 2 + (G.timeLeft / GAME_DURATION) * Math.PI * 2);
			ctx.stroke();

			// Timer number
			ctx.fillStyle = timerBlink ? '#ff4444' : timerLow ? '#e67e22' : '#ffffff';
			ctx.font = `bold ${timerBlink ? 26 : 24}px "Baloo 2"`;
			ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
			ctx.fillText(Math.ceil(G.timeLeft), tCX, tCY - 2);

			ctx.fillStyle = 'rgba(255,255,255,0.40)';
			ctx.font = 'bold 10px Nunito';
			ctx.fillText('SEC', tCX, tCY + 18);
			ctx.restore();

			// ── WEIGHT BAR (left-center) ─────────────────────────────────────────────
			const wbX = 96, wbW = 230, wbH = 20, wby = cy - 10;
			const wPct = Math.min(1, G.totalWeight / MAX_WEIGHT);
			const wCol = wPct > 0.85 ? '#e74c3c' : wPct > 0.60 ? '#e67e22' : '#2ecc71';

			// Label row
			ctx.fillStyle = 'rgba(255,255,255,0.55)';
			ctx.font = 'bold 12px Nunito';
			ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
			ctx.fillText('⚖  CART WEIGHT', wbX, wby - 3);
			ctx.fillStyle = wCol;
			ctx.font = 'bold 12px Nunito';
			ctx.textAlign = 'right';
			ctx.fillText(`${G.totalWeight.toFixed(1)} / ${MAX_WEIGHT} kg`, wbX + wbW, wby - 3);

			// Bar background
			ctx.fillStyle = 'rgba(255,255,255,0.08)';
			rr(wbX, wby, wbW, wbH, 6); ctx.fill();

			// Bar fill
			if (wPct > 0) {
				const wbFill = ctx.createLinearGradient(wbX, 0, wbX + wbW, 0);
				wbFill.addColorStop(0, wCol); wbFill.addColorStop(1, lighten(wCol, 35));
				ctx.fillStyle = wbFill;
				rr(wbX, wby, wbW * wPct, wbH, 6); ctx.fill();
				// Shimmer
				ctx.fillStyle = 'rgba(255,255,255,0.18)';
				rr(wbX + 2, wby + 2, (wbW * wPct - 4) * 0.5, wbH / 2 - 2, 4); ctx.fill();
			}
			ctx.strokeStyle = 'rgba(255,255,255,0.14)'; ctx.lineWidth = 1;
			rr(wbX, wby, wbW, wbH, 6); ctx.stroke();

			// ── DIVIDER ──────────────────────────────────────────────────────────────
			ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 1;
			ctx.beginPath(); ctx.moveTo(345, 8); ctx.lineTo(345, HUD_H - 8); ctx.stroke();

			// ── CATEGORIES (center) ──────────────────────────────────────────────────
			const catBaseX = 360;
			const catCount = `${G.collectedCategories.size} / ${CATEGORIES.length}`;
			ctx.fillStyle = 'rgba(255,255,255,0.55)';
			ctx.font = 'bold 12px Nunito';
			ctx.textAlign = 'left'; ctx.textBaseline = 'bottom';
			ctx.fillText('🗂  CATEGORIES', catBaseX, cy - 13);
			ctx.fillStyle = G.collectedCategories.size === CATEGORIES.length ? '#2ecc71' : 'rgba(255,255,255,0.85)';
			ctx.font = 'bold 16px "Baloo 2"';
			ctx.fillText(catCount, catBaseX + 120, cy - 11);

			const iconSize = 24, iconGap = 88;
			CATEGORIES.forEach((cat, i) => {
				const haveIt = G.collectedCategories.has(cat);
				const ciX = catBaseX + i * iconGap;
				const ciY = cy + 10;

				ctx.save();
				// Badge bg
				ctx.fillStyle = haveIt ? 'rgba(46,204,113,0.18)' : 'rgba(255,255,255,0.05)';
				rr(ciX - 4, ciY - iconSize / 2 - 2, iconGap - 6, iconSize + 16, 8); ctx.fill();
				if (haveIt) {
					ctx.strokeStyle = 'rgba(46,204,113,0.5)'; ctx.lineWidth = 1.5;
					rr(ciX - 4, ciY - iconSize / 2 - 2, iconGap - 6, iconSize + 16, 8); ctx.stroke();
				}

				if (!haveIt) ctx.globalAlpha = 0.28;
				ctx.font = `${iconSize}px serif`;
				ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
				ctx.fillText(CAT_EMOJIS[cat], ciX + iconGap / 2 - 7, ciY);

				// Name label
				ctx.font = `${haveIt ? 'bold ' : ''}9px Nunito`;
				ctx.fillStyle = haveIt ? '#2ecc71' : 'rgba(255,255,255,0.65)';
				ctx.textBaseline = 'top';
				ctx.fillText(cat.slice(0, 3).toUpperCase() + (cat.length > 3 ? '.' : ''), ciX + iconGap / 2 - 7, ciY + iconSize / 2 + 2);

				if (haveIt) {
					ctx.globalAlpha = 1;
					ctx.fillStyle = '#2ecc71';
					ctx.font = 'bold 11px Nunito';
					ctx.textBaseline = 'middle';
					ctx.fillText('✓', ciX + iconGap - 8, ciY - iconSize / 2 + 2);
				}
				ctx.restore();
			});

			// ── DIVIDER right ─────────────────────────────────────────────────────────
			ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 1;
			ctx.beginPath(); ctx.moveTo(W - 88, 8); ctx.lineTo(W - 88, HUD_H - 8); ctx.stroke();

			// ── ITEMS COUNT (right) ───────────────────────────────────────────────────
			ctx.fillStyle = '#ecf0f1';
			ctx.font = 'bold 28px "Baloo 2"';
			ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
			ctx.fillText(G.collectedItems.length, W - 54, cy - 4);
			ctx.fillStyle = 'rgba(255,255,255,0.40)';
			ctx.font = 'bold 10px Nunito';
			ctx.fillText('ITEMS', W - 54, cy + 18);

			// ── PAUSE BUTTON ──────────────────────────────────────────────────────────
			ctx.fillStyle = 'rgba(255,255,255,0.10)';
			rr(W - 88, HUD_H - 26, 82, 20, 6); ctx.fill();
			ctx.fillStyle = 'rgba(255,255,255,0.45)';
			ctx.font = 'bold 10px Nunito';
			ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
			ctx.fillText('⏸  P to pause', W - 47, HUD_H - 16);
		}

		// ─── FLOATERS ─────────────────────────────────────────────────────────────────
		function drawFloaters() {
			for (const f of G.floaters) {
				ctx.save();
				ctx.globalAlpha = f.alpha;
				ctx.font = `bold ${f.size}px "Baloo 2"`;
				ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
				ctx.fillStyle = 'rgba(0,0,0,0.5)';
				ctx.fillText(f.text, f.x + 1, f.y + 1);
				ctx.fillStyle = f.color;
				ctx.fillText(f.text, f.x, f.y);
				ctx.restore();
			}
		}

		// ─── CONFETTI ─────────────────────────────────────────────────────────────────
		function drawConfetti() {
			for (const c of G.confetti) {
				ctx.save();
				ctx.globalAlpha = Math.min(1, c.life / 500);
				ctx.translate(c.x, c.y); ctx.rotate(c.r);
				ctx.fillStyle = c.color;
				ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
				ctx.restore();
			}
		}

		// ─── READY OVERLAY ────────────────────────────────────────────────────────────
		function drawReadyOverlay() {
			// Subtle dim
			ctx.fillStyle = 'rgba(0,0,0,0.38)';
			ctx.fillRect(0, 0, W, H);

			const cx = W / 2, cy = H / 2;
			const cw = 500, ch = 160;

			// Card glow
			const glowG = ctx.createRadialGradient(cx, cy, 10, cx, cy, 260);
			glowG.addColorStop(0, 'rgba(255,215,0,0.10)');
			glowG.addColorStop(1, 'rgba(0,0,0,0)');
			ctx.fillStyle = glowG; ctx.fillRect(0, 0, W, H);

			// Card
			ctx.fillStyle = 'rgba(10,16,24,0.92)';
			rr(cx - cw / 2, cy - ch / 2, cw, ch, 20); ctx.fill();
			ctx.strokeStyle = 'rgba(255,215,0,0.45)'; ctx.lineWidth = 2;
			rr(cx - cw / 2, cy - ch / 2, cw, ch, 20); ctx.stroke();

			// Title
			ctx.fillStyle = '#ffd700';
			ctx.font = 'bold 30px "Baloo 2"';
			ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
			ctx.fillText('🛒  SUPERMARKET RUSH!', cx, cy - 26);

			// Prompt blink
			const vis = Math.floor(Date.now() / 580) % 2 === 0;
			if (vis) {
				ctx.fillStyle = '#ffffff';
				ctx.font = 'bold 17px Nunito';
				ctx.fillText('CLICK  or  press  SPACE  to  begin  shopping', cx, cy + 18);
			}

			// Controls hint
			ctx.fillStyle = 'rgba(255,255,255,0.30)';
			ctx.font = '11px Nunito';
			ctx.fillText('SPACE / CLICK — Hold to grab items    •    P — Pause', cx, cy + 52);
		}

		// ─── PAUSE SCREEN ─────────────────────────────────────────────────────────────
		function drawPause() {
			ctx.fillStyle = 'rgba(0,0,0,0.72)';
			ctx.fillRect(0, 0, W, H);
			const cx = W / 2, cy = H / 2;
			const cw = 400, ch = 260;

			ctx.fillStyle = '#0d1117';
			rr(cx - cw / 2, cy - ch / 2, cw, ch, 20); ctx.fill();
			ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2;
			rr(cx - cw / 2, cy - ch / 2, cw, ch, 20); ctx.stroke();

			ctx.fillStyle = '#ffd700';
			ctx.font = 'bold 36px "Baloo 2"';
			ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
			ctx.fillText('⏸  PAUSED', cx, cy - 76);

			const stats = [
				['⏱ Time Remaining', `${Math.ceil(G.timeLeft)}s`],
				['⚖ Cart Weight', `${G.totalWeight.toFixed(1)} / ${MAX_WEIGHT} kg`],
				['🗂 Categories', `${G.collectedCategories.size} of ${CATEGORIES.length}`],
				['📦 Items Picked', `${G.collectedItems.length}`],
			];
			stats.forEach(([label, val], i) => {
				const sy = cy - 34 + i * 36;
				ctx.fillStyle = 'rgba(255,255,255,0.38)';
				ctx.font = '13px Nunito'; ctx.textAlign = 'left';
				ctx.fillText(label, cx - 140, sy);
				ctx.fillStyle = 'rgba(255,255,255,0.90)';
				ctx.font = 'bold 15px Nunito'; ctx.textAlign = 'right';
				ctx.fillText(val, cx + 140, sy);
				ctx.strokeStyle = 'rgba(255,255,255,0.06)'; ctx.lineWidth = 1;
				ctx.beginPath(); ctx.moveTo(cx - 140, sy + 13); ctx.lineTo(cx + 140, sy + 13); ctx.stroke();
			});

			if (Math.floor(Date.now() / 600) % 2 === 0) {
				ctx.fillStyle = 'rgba(255,215,0,0.65)';
				ctx.font = 'bold 14px Nunito'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
				ctx.fillText('Press P to resume', cx, cy + 106);
			}
		}

		// ─── GAME OVER SCREEN ─────────────────────────────────────────────────────────
		function drawGameOver() {
			ctx.fillStyle = 'rgba(0,0,0,0.82)';
			ctx.fillRect(0, 0, W, H);
			drawConfetti();

			const cx = W / 2, cy = H / 2;
			const cw = 500, ch = 400;

			// Card
			ctx.fillStyle = '#0d1117';
			rr(cx - cw / 2, cy - ch / 2, cw, ch, 22); ctx.fill();

			// Header band
			const hbH = 64;
			const hbCol = G.deathReason === 'weight' ? '#7b241c' : '#1a3a5c';
			ctx.fillStyle = hbCol;
			rr(cx - cw / 2, cy - ch / 2, cw, hbH, 22); ctx.fill();
			ctx.fillRect(cx - cw / 2, cy - ch / 2 + 22, cw, hbH - 22);

			ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1.5;
			rr(cx - cw / 2, cy - ch / 2, cw, ch, 22); ctx.stroke();

			ctx.fillStyle = '#ffffff';
			ctx.font = 'bold 25px "Baloo 2"';
			ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
			ctx.fillText(G.deathReason === 'weight' ? '🛒  TROLLEY TOO HEAVY!' : '⏰  TIME\'S UP!', cx, cy - ch / 2 + hbH / 2);

			// ── ITEMS (big center number) ──────────────────────────────────────────
			const topSY = cy - ch / 2 + hbH + 20;
			ctx.fillStyle = '#ffd700';
			ctx.font = 'bold 72px "Baloo 2"';
			ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
			ctx.fillText(G.collectedItems.length, cx, topSY + 44);
			ctx.fillStyle = 'rgba(255,255,255,0.38)';
			ctx.font = 'bold 13px Nunito';
			ctx.fillText('ITEMS COLLECTED', cx, topSY + 84);

			// Divider
			ctx.strokeStyle = 'rgba(255,215,0,0.18)'; ctx.lineWidth = 1;
			ctx.beginPath(); ctx.moveTo(cx - 200, topSY + 100); ctx.lineTo(cx + 200, topSY + 100); ctx.stroke();

			// ── TWO STATS: CATEGORIES + WEIGHT ────────────────────────────────────
			const row2y = topSY + 118;

			// Categories
			ctx.save();
			ctx.fillStyle = 'rgba(255,255,255,0.07)';
			rr(cx - 218, row2y - 10, 200, 80, 12); ctx.fill();
			ctx.fillStyle = G.collectedCategories.size === CATEGORIES.length ? '#2ecc71' : '#ecf0f1';
			ctx.font = 'bold 42px "Baloo 2"';
			ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
			ctx.fillText(`${G.collectedCategories.size} / ${CATEGORIES.length}`, cx - 118, row2y + 28);
			ctx.fillStyle = 'rgba(255,255,255,0.40)';
			ctx.font = 'bold 12px Nunito';
			ctx.fillText('CATEGORIES', cx - 118, row2y + 62);
			ctx.restore();

			// Weight
			ctx.save();
			ctx.fillStyle = 'rgba(255,255,255,0.07)';
			rr(cx + 18, row2y - 10, 200, 80, 12); ctx.fill();
			ctx.fillStyle = '#ecf0f1';
			ctx.font = 'bold 42px "Baloo 2"';
			ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
			ctx.fillText(`${G.totalWeight.toFixed(1)}kg`, cx + 118, row2y + 28);
			ctx.fillStyle = 'rgba(255,255,255,0.40)';
			ctx.font = 'bold 12px Nunito';
			ctx.fillText('TOTAL WEIGHT', cx + 118, row2y + 62);
			ctx.restore();

			// ── ITEM EMOJI PREVIEW ─────────────────────────────────────────────────
			if (G.collectedItems.length > 0) {
				const prevMax = Math.min(G.collectedItems.length, 12);
				const isz = 28;
				const rowW = prevMax * (isz + 4) - 4;
				const ix0 = cx - rowW / 2;
				const iy = row2y + 82;
				for (let i = 0; i < prevMax; i++) {
					const itm = G.collectedItems[G.collectedItems.length - prevMax + i];
					const ix = ix0 + i * (isz + 4);
					ctx.fillStyle = 'rgba(255,255,255,0.07)';
					rr(ix, iy, isz, isz, 4); ctx.fill();
					ctx.font = `${isz * 0.72}px serif`;
					ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
					ctx.fillText(itm.cat.emoji, ix + isz / 2, iy + isz / 2);
				}
			}

			// ── PLAY AGAIN BUTTON ──────────────────────────────────────────────────
			const rbW = 240, rbH = 54;
			const rbX = cx - rbW / 2, rbY = cy + ch / 2 - 68;
			const rbHov = mousePos.x > rbX && mousePos.x < rbX + rbW && mousePos.y > rbY && mousePos.y < rbY + rbH;

			const rbG = ctx.createLinearGradient(rbX, rbY, rbX, rbY + rbH);
			rbG.addColorStop(0, rbHov ? '#e74c3c' : '#c0392b');
			rbG.addColorStop(1, rbHov ? '#c0392b' : '#7b241c');
			ctx.fillStyle = rbG;
			rr(rbX, rbY, rbW, rbH, 16); ctx.fill();
			if (rbHov) {
				ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 2;
				rr(rbX, rbY, rbW, rbH, 16); ctx.stroke();
			}
			ctx.fillStyle = 'rgba(255,255,255,0.14)';
			rr(rbX + 4, rbY + 4, rbW - 8, rbH / 2 - 4, 12); ctx.fill();
			ctx.fillStyle = '#ffffff';
			ctx.font = 'bold 18px Nunito';
			ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
			ctx.fillText('🔄   Play Again', cx, rbY + rbH / 2);

			requestAnimationFrame(() => { if (G.state === 'gameover') draw(); });
		}

		// ═══════════════════════════════════════════════════════════════════════════════
		// BOOT
		// ═══════════════════════════════════════════════════════════════════════════════
		resetGame();
		requestAnimationFrame(loop);

        /* ======================== */
        /* ======================== */
        /* ======================== */