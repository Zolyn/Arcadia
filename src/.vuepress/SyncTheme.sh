#!/bin/bash
echo 'Cleaning old files...'
rm -rf ~/MyFiles/projects/Arcadia/src/.vuepress/theme
echo 'Copying new files...'
cp -r ~/MyFiles/projects/vuepress-theme-gungnir/packages/theme-gungnir ~/MyFiles/projects/Arcadia/src/.vuepress/theme
echo 'Done'