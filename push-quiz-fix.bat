@echo off
echo ============================================
echo  Cleaning ALL git lock files...
echo ============================================
cd /d "C:\Users\luba_\Documents\GitHub\shopify-assistant"

del /f /q ".git\index.lock" 2>nul
del /f /q ".git\index.lock.bak" 2>nul
del /f /q ".git\index.lock.bak2" 2>nul
del /f /q ".git\index.lock.bak3" 2>nul
del /f /q ".git\index.lock.bak7" 2>nul
del /f /q ".git\index.lock.bak9" 2>nul
del /f /q ".git\index.lock.bak10" 2>nul
del /f /q ".git\index.lock.bak11" 2>nul
del /f /q ".git\HEAD.lock.bak9" 2>nul
del /f /q ".git\HEAD.lock.bak10" 2>nul
del /f /q ".git\objects\maintenance.lock" 2>nul
del /f /q ".git\objects\maintenance.lock.bak9" 2>nul
del /f /q ".git\packed-refs.lock.bak9" 2>nul
del /f /q ".git\REBASE_HEAD.lock.bak9" 2>nul
del /f /q ".git\refs\heads\main.lock.bak9" 2>nul
del /f /q ".git\refs\heads\main.lock.bak10" 2>nul
del /f /q ".git\refs\remotes\origin\main.lock" 2>nul
echo Lock files cleaned.

echo ============================================
echo  Staging new quiz design + template fix...
echo ============================================
git add sections/wellness-quiz-main.liquid
git add templates/page.wellness-quiz.json
git commit -m "fix: deploy new wellness quiz design with CSS visibility fix + correct template"
if %ERRORLEVEL% neq 0 (
  echo Commit failed or nothing to commit, continuing...
)

echo ============================================
echo  Pulling remote changes...
echo ============================================
git pull --rebase origin main 2>&1

echo ============================================
echo  Pushing to GitHub...
echo ============================================
git push origin main
if %ERRORLEVEL% equ 0 (
  echo.
  echo SUCCESS - New quiz design pushed to GitHub!
  echo.
  echo NEXT STEP: Go to Shopify Admin - Online Store - Themes
  echo and check if shopify-assistant/main auto-updated.
  echo If not, open the theme code editor and manually replace
  echo sections/wellness-quiz-main.liquid with the file in this folder.
) else (
  echo.
  echo PUSH FAILED - see error above.
)

echo.
pause
