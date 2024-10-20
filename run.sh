git submodule init
git submodule update
cp env.example .env
npm install
npm run lint
npm run build
npm run start