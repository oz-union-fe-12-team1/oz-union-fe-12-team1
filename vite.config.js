import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});



// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss({
//       config: {
//         content: ['./src/**/*.{js,jsx,ts,tsx}'],
//         theme: {
//           extend: {
//             boxShadow: {
//               'custom-3d': 'inset 0 0 2px rgba(255, 255, 255, 0.7), -1px 1px 2px rgba(0, 0, 0, 0.7)',
//             },
//           },
//         },
//         plugins: [],
//       },
//     }),
//   ],
// });
