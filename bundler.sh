#!/bin/bash  
NAME=$(basename $PWD)
echo "Zipping plugin to ${NAME} 🔥"
cd ..
zip -r "${NAME}.zip" "./${NAME}" -x \
"**/.git*" \
"**/node_modules/*" \
"./${NAME}/src/*" \
"./${NAME}/tsconfig.json" \
"./${NAME}/yarn.lock" \
"./${NAME}/package.json" \
"./${NAME}/.eslintrc.js" \
"./${NAME}/.editorconfig" \
"./${NAME}/bundle.sh" \
"./${NAME}/tests/*" \
"./${NAME}/Gruntfile.js" \
"./${NAME}/composer.json" \
"./${NAME}/composer.lock" \
"./${NAME}/.github" \
