@echo off
cd /d "C:\Users\luba_\Documents\GitHub\shopify-assistant"
echo Running Shopify theme push...
echo.
shopify theme push --path "C:\Users\luba_\Documents\GitHub\shopify-assistant" --theme 159757697252 --store lovesolmara.myshopify.com --only snippets/product-card.liquid sections/product-detail.liquid sections/product-main.liquid sections/recently-viewed.liquid sections/goal-page-hero.liquid sections/collections-list.liquid sections/hero-banner.liquid sections/featured-products.liquid sections/shop-by-goal.liquid sections/feature-split.liquid sections/ingredients-grid.liquid sections/quiz-banner.liquid sections/testimonials.liquid sections/newsletter.liquid templates/list-collections.json assets/solmara.css --force
echo.
echo Done! Press any key to close.
pause
