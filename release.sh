#!/bin/bash
eval yarn bump:minor

eval git push origin master --tags

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo $PACKAGE_VERSION

cp="gh release create v$PACKAGE_VERSION --notes \"v$PACKAGE_VERSION\" -p"

echo $cp

eval "$cp"