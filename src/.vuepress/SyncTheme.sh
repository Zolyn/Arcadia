#!/bin/bash
echo 'Cleaning old files...'
rm -rf theme
echo 'Copying new files...'
cp -r ../../../vuepress-theme-gungnir/packages/theme-gungnir theme
echo 'Done'