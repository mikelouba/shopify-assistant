/**
 * SOLMARA SHOPIFY THEME — solmara.js
 * Place in: assets/solmara.js
 *
 * Uses Shopify's AJAX Cart API (/cart/add.js, /cart/change.js, /cart.js)
 * No dependencies required.
 */

'use strict';

/* ═══════════════════════════════════════
   CART DRAWER
═══════════════════════════════════════ */

const FREE_SHIPPING_THRESHOLD = 6000; // in cents ($60.00)

function openCart() {
  document.getElementById('overlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  document.body.style.overflow = 'hidden';
  fetchAndRenderCart();
}

function closeCart() {
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
  document.body.style.overflow = '';
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCart();
});

/* ═══════════════════════════════════════
   SHOPIFY AJAX CART API
═══════════════════════════════════════ */

/**
 * Add item to cart via AJAX
 * @param {string|number} variantId  - Shopify variant ID
 * @param {HTMLElement}   btn        - The button that was clicked (for loading state)
 * @param {number}        quantity   - Defaults to 1
 */
async function addToCartAjax(variantId, btn, quantity = 1) {
  if (!variantId) return;

  // Show loading state
  if (btn) btn.classList.add('btn-loading');

  try {
    const response = await fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: variantId, quantity })
    });

    if (!response.ok) {
      const err = await response.json();
      showToast('⚠️ ' + (err.description || 'Could not add to cart'));
      return;
    }

    const item = await response.json();
    showToast('✅ ' + item.title + ' added to bag');
    updateCartBadge();
    setTimeout(openCart, 350);

  } catch (err) {
    showToast('⚠️ Something went wrong. Please try again.');
    console.error('Solmara addToCart error:', err);
  } finally {
    if (btn) btn.classList.remove('btn-loading');
  }
}

/**
 * Fetch current cart and render items in the drawer
 */
async function fetchAndRenderCart() {
  try {
    const res  = await fetch('/cart.js');
    const cart = await res.json();
    renderCartItems(cart);
    updateCartBadge(cart.item_count);
  } catch (err) {
    console.error('Solmara fetchCart error:', err);
  }
}

/**
 * Change line item quantity
 * @param {number} line     - 1-based line item index
 * @param {number} quantity - new quantity (0 = remove)
 */
async function changeCartItem(line, quantity) {
  try {
    const res  = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ line, quantity })
    });
    const cart = await res.json();
    renderCartItems(cart);
    updateCartBadge(cart.item_count);
  } catch (err) {
    console.error('Solmara changeCart error:', err);
  }
}

/**
 * Render cart line items into the drawer
 */
function renderCartItems(cart) {
  const itemsEl  = document.getElementById('cdItems');
  const emptyEl  = document.getElementById('cdEmpty');
  const footerEl = document.getElementById('cdFooter');
  const totalEl  = document.getElementById('cdTotal');
  const shipEl   = document.getElementById('cdShipMsg');

  // Remove old items
  itemsEl.querySelectorAll('.cd-item').forEach(el => el.remove());

  if (cart.item_count === 0) {
    emptyEl.style.display  = 'flex';
    footerEl.style.display = 'none';
    return;
  }

  emptyEl.style.display  = 'none';
  footerEl.style.display = 'block';

  // Total & shipping bar
  totalEl.textContent = formatMoney(cart.total_price);
  const remaining = FREE_SHIPPING_THRESHOLD - cart.total_price;
  shipEl.textContent = remaining > 0
    ? `🌿 Add ${formatMoney(remaining)} more for free shipping`
    : '✅ You have free shipping!';

  // Render each line item
  cart.items.forEach((item, index) => {
    const line = index + 1; // Shopify uses 1-based line numbers
    const el   = document.createElement('div');
    el.className = 'cd-item';

    const imgHtml = item.image
      ? `<img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy">`
      : `<div class="cd-item-img-placeholder">🌿</div>`;

    el.innerHTML = `
      <div class="cd-item-img">${imgHtml}</div>
      <div class="cd-item-info">
        <a class="cd-item-name" href="${item.url}">${escapeHtml(item.product_title)}</a>
        <div class="cd-item-meta">${escapeHtml(item.variant_title || 'Default')}</div>
        <div class="cd-item-row">
          <div class="qty-ctrl">
            <button class="qty-btn" onclick="changeCartItem(${line}, ${item.quantity - 1})" aria-label="Decrease quantity">−</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn" onclick="changeCartItem(${line}, ${item.quantity + 1})" aria-label="Increase quantity">+</button>
          </div>
          <span class="cd-price">${formatMoney(item.line_price)}</span>
        </div>
      </div>
      <button class="cd-remove" onclick="changeCartItem(${line}, 0)" aria-label="Remove item">×</button>
    `;
    itemsEl.appendChild(el);
  });
}

/**
 * Update the cart badge number in the header
 */
async function updateCartBadge(count) {
  if (count === undefined) {
    try {
      const res  = await fetch('/cart.js');
      const cart = await res.json();
      count = cart.item_count;
    } catch { return; }
  }
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = count;
}

/* ═══════════════════════════════════════
   WISHLIST (localStorage — no app needed)
═══════════════════════════════════════ */

function toggleWishlist(btn, productId) {
  const key  = 'solmara_wishlist';
  let list   = JSON.parse(localStorage.getItem(key) || '[]');
  const idx  = list.indexOf(String(productId));

  if (idx === -1) {
    list.push(String(productId));
    btn.textContent = '♥';
    btn.classList.add('active');
    showToast('💚 Saved to wishlist');
  } else {
    list.splice(idx, 1);
    btn.textContent = '♡';
    btn.classList.remove('active');
    showToast('Removed from wishlist');
  }

  localStorage.setItem(key, JSON.stringify(list));
}

// Mark already-wishlisted items on page load
function initWishlist() {
  const key  = 'solmara_wishlist';
  const list = JSON.parse(localStorage.getItem(key) || '[]');
  document.querySelectorAll('.p-wish[data-product-id]').forEach(btn => {
    if (list.includes(btn.dataset.productId)) {
      btn.textContent = '♥';
      btn.classList.add('active');
    }
  });
}

/* ═══════════════════════════════════════
   TOAST NOTIFICATION
═══════════════════════════════════════ */

let toastTimer;
function showToast(msg) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

/* ═══════════════════════════════════════
   SMOOTH SCROLL (for anchor buttons)
═══════════════════════════════════════ */

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ═══════════════════════════════════════
   UTILITIES
═══════════════════════════════════════ */

/**
 * Format Shopify price (in cents) to currency string
 * Uses the store's money format if available
 */
function formatMoney(cents) {
  if (window.Shopify && Shopify.formatMoney) {
    return Shopify.formatMoney(cents, window.moneyFormat || '${{amount}}');
  }
  return '$' + (cents / 100).toFixed(2);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ═══════════════════════════════════════
   HEADER SCROLL BEHAVIOUR
═══════════════════════════════════════ */

(function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 80) {
      header.style.boxShadow = '0 2px 20px rgba(45,74,48,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
    lastY = y;
  }, { passive: true });
})();

/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initWishlist();
  updateCartBadge();

  // Expose money format for formatMoney()
  window.moneyFormat = window.moneyFormat || '${{amount}}';
});
