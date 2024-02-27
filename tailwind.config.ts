import type { Config } from 'tailwindcss'
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      
        animation: {
          "background-shine": "background-shine 2s linear infinite",
          "text-gradient": "text-gradient 1.5s linear infinite"
        },
        "keyframes": {
          "text-gradient": {
            "to": {
              "backgroundPosition": "200% center"
            }
          },
          "background-shine": {
            "from": {
              "backgroundPosition": "0 0"
            },
            "to": {
              "backgroundPosition": "-200% 0"
            }
          }
        }
      
    },
  },
   darkMode: "class",
  plugins: [nextui()],
}
export default config


// // tailwind.config.js
// const {nextui} = require("@nextui-org/react");

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     // ...
//     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   darkMode: "class",
//   plugins: [nextui()],
// };
