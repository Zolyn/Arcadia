#!/bin/bash
echo 'Cleaning old files...'
rm -rf ~/MyFiles/projects/vuepress-theme-gungnir/packages/theme-gungnir
echo 'Copying new files...'
cp -r ~/MyFiles/projects/Arcadia/src/.vuepress/theme ~/MyFiles/projects/vuepress-theme-gungnir/packages/theme-gungnir
echo 'Done'