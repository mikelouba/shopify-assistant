@echo off
echo Pulling remote changes with rebase...
git pull --rebase origin main
echo Pushing to origin main...
git push origin main
echo Done!
pause
