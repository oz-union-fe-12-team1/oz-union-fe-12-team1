import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // 1. Tailwind CSS 플러그인 import
import fs from 'fs';
import path from 'path';

export default ({ mode }) => {
  // .env 파일의 환경 변수를 불러옵니다.
  const env = loadEnv(mode, process.cwd(), '');

  // VITE_DEVELOP 변수가 "true"일 때만 isDevelop이 true가 됩니다.
  const isDevelop = env.VITE_DEVELOP === 'true';

  return defineConfig({
    plugins: [
      react(),
      tailwindcss(), // 2. Tailwind CSS 플러그인 추가
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // isDevelop이 true일 때만 https 설정을 적용합니다.
      https: isDevelop
        ? {
            key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
          }
        : undefined, // 아닐 경우 https를 사용하지 않습니다.
    },
  });
};
