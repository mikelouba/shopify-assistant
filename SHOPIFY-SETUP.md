# Solmara Shopify Admin Setup Guide

This is everything you need to set up in **Shopify admin** so the theme works end-to-end. Theme code (sections, templates) is already in this repo. The items below are *data records* in your store — they live in Shopify's database, not in code.

The previous theme code change adds a fallback: if a referenced collection doesn't exist yet, the buttons now link to `/collections/all` (your full catalog) instead of 404'ing. So nothing will look broken while you build these out.

---

## 1. Pages

Go to **Online Store → Pages → Add page** and create one record per row. The **Handle** is what shows in the URL after `/pages/` — set it via the "Edit URL" link near the bottom of the page editor.

| Title             | Handle           | Template (right sidebar) | Body content                |
|-------------------|------------------|--------------------------|-----------------------------|
| Better Sleep      | `goal-sleep`     | `goal-sleep`             | Leave empty (sections fill it) |
| Focus & Clarity   | `goal-focus`     | `goal-focus`             | Leave empty                 |
| Stress Relief     | `goal-stress`    | `goal-stress`            | Leave empty                 |
| Skin Glow         | `goal-glow`      | `goal-glow`              | Leave empty                 |
| Energy & Vitality | `goal-energy`    | `goal-energy`            | Leave empty                 |
| Wellness Quiz     | `wellness-quiz`  | Default page             | Quiz copy or embed (placeholder ok) |
| Our Standards     | `our-standards`  | Default page             | Sourcing / quality copy     |
| Contact           | `contact`        | Default page             | Contact form / email / phone |
| About             | `about`          | `about`                  | Leave empty (sections fill it) |
| FAQ               | `faq`            | `faq`                    | Leave empty (sections fill it) |

**Why "leave empty" for the goal/about/FAQ pages:** their templates render everything from theme sections (hero, products grid, testimonials, etc.), so the body field is unused.

---

## 2. Collections

Go to **Products → Collections → Create collection**. Use **Manual** type (you pick products) or **Smart** (rules pick automatically). The handle is what shows in `/collections/<handle>`.

| Title             | Handle          | Used by                                                          |
|-------------------|-----------------|------------------------------------------------------------------|
| Sleep             | `sleep`         | goal-sleep page (hero, products, CTA)                            |
| Focus             | `focus`         | goal-focus page                                                  |
| Stress Relief     | `stress-relief` | goal-stress page (hero + CTA buttons)                            |
| Skin Glow         | `skin-glow`     | goal-glow page (hero + CTA buttons)                              |
| Energy            | `energy`        | goal-energy page                                                 |
| Bestsellers       | `bestsellers`   | Home page "Our Bestsellers" section                              |
| All products      | `all`           | Built-in — already exists, no action needed                      |

**Note on `stress` vs `stress-relief` and `glow` vs `skin-glow`:** the goal-products section will look for collection handle `stress` and `glow` by default (matching the page handle). The hero/CTA buttons on the same page link to `stress-relief` and `skin-glow`. Two ways to reconcile:

- **Easiest:** create your collections with handles `stress-relief` and `skin-glow`. Then on the `goal-stress` and `goal-glow` pages, open the theme editor and on the "Goal Products" section, set the **"Collection to display (overrides auto-detection)"** field to point at `stress-relief` / `skin-glow`. This makes everything consistent.
- **Or:** create both `stress` and `stress-relief` (and both `glow` and `skin-glow`) as collections, with the same products in each.

Add at least 3–8 products to each goal collection so the products grid on the goal page has something to show. Until then, the section displays styled placeholder cards.

---

## 3. Navigation menus

Go to **Online Store → Navigation**. The theme expects four menus by handle:

| Menu             | Handle             | Suggested links                                                                                       |
|------------------|--------------------|-------------------------------------------------------------------------------------------------------|
| Main menu        | `main-menu`        | Shop (→ /collections/all), Sleep (→ /pages/goal-sleep), Focus (→ /pages/goal-focus), Stress (→ /pages/goal-stress), Glow (→ /pages/goal-glow), Energy (→ /pages/goal-energy), About (→ /pages/about), FAQ (→ /pages/faq) |
| Footer — Shop    | `footer-shop`      | All Products, Bestsellers, Sleep, Focus, Stress Relief, Skin Glow, Energy                              |
| Footer — Learn   | `footer-learn`     | About, Wellness Quiz, Our Standards, FAQ, Blog (if you create one)                                     |
| Footer — Support | `footer-support`   | Contact, Shipping, Returns, Privacy Policy, Terms                                                      |

If you've already named menus differently, you can change which menu the theme uses in **Online Store → Themes → Customize → Theme settings**.

---

## 4. Order to do this in

1. **Create the collections first** — even empty ones. This stops the goal-page hero/CTA buttons from 404'ing.
2. **Create the goal pages** and assign their templates. Each one will immediately render with hero/products/CTA.
3. **Create wellness-quiz, our-standards, contact** pages.
4. **Set up the navigation menus** so the header and footer render real links.
5. **Add products to each collection.** As soon as a collection has products, the goal-page product grid switches from placeholder cards to real product cards.

---

## 5. Where the home-page tabs go

The "Shop by Goal" tabs on the home page link to `/pages/goal-sleep`, `/pages/goal-focus`, `/pages/goal-stress`, `/pages/goal-glow`, `/pages/goal-energy`. These all work the moment you create the matching pages in step 1.

---

## 6. Themed product pages (per-goal product templates)

Every product can use one of five themed product templates. Each one wraps the standard product page in goal-specific colors (palette, accent, eyebrow) and adds a matching CTA banner at the bottom — so a sleep product page feels visually consistent with the sleep landing page, a focus product feels like the focus landing page, etc.

The templates available (already in this theme):

| Template       | Use for products in   | Visual palette      |
|----------------|-----------------------|