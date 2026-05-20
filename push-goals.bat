@echo off
setlocal enabledelayedexpansion

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║   SOLMARA — Push Goal Pages to Shopify (Theme ID 159757697252) ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo [1/4] Staging goal page files...
git add sections/goal-page-hero.liquid
git add templates/page.sleep.json
git add templates/page.focus.json
git add templates/page.stress.json
git add templates/page.glow.json
git add templates/page.energy.json
git add templates/page.wellness.json

echo.
echo [2/4] Checking staged changes...
git diff --cached --stat
echo.

echo [3/4] Committing...
git commit -m "feat: goal pages — product grid, benefits bar, bottom CTA, full theme editor controls

Sections added / updated:
- sections/goal-page-hero.liquid (full 5-section replacement)
  * §1 Hero: image, overlay color+opacity, badge, heading, CTAs
  * §2 Benefits Bar: 3-column cards with icon/title/description
  * §3 Product Grid: collection picker, columns 2-4, card styles,
       price toggle, add-to-cart toggle, configurable button text
  * §4 Testimonial: quote, stars, author, subtitle, bg color
  * §5 Bottom CTA: heading, subtext, button, bg+text colors
  * 6 goal presets with themed colors in schema

Templates updated with goal-specific defaults:
- templates/page.sleep.json   — Deep navy #2C3E6B / muted blue #8B9DC3
- templates/page.focus.json   — Forest green #1B4332 / sage #52B788
- templates/page.stress.json  — Warm brown #5C3D2E / terracotta #C8956C
- templates/page.glow.json    — Deep plum #6B2D5E / blush #E8A0BF
- templates/page.energy.json  — Burnt orange #7A3100 / amber #F4A261
- templates/page.wellness.json — Deep moss #2D5016 / mint #8DB87A

Theme: Solmara FINAL one dont touch (ID 159757697252)"

echo.
echo [4/4] Pushing to origin...
git push origin main

echo.
echo  ╔══════════════════════════════════════════════════════════════╗
echo  ║  Done! Shopify will sync automatically via GitHub.           ║
echo  ║                                                              ║
echo  ║  Next steps in Theme Editor:                                 ║
echo  ║  1. Open each goal page template in the editor              ║
echo  ║  2. Assign the correct collection to each page              ║
echo  ║  3. Upload hero background images per goal                  ║
echo  ╚══════════════════════════════════════════════════════════════╝
echo.
pause
