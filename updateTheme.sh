#!/bin/bash
themePath=~/vuepress-theme-gungnir
gh repo clone Renovamen/vuepress-theme-gungnir $themePath
cp -r $themePath/packages/theme-gungnir "$(pwd)"/src/.vuepress/
Echo "Cleaning files..."
rm -rf $themePath
echo "Done."