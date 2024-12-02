import type { Config } from 'tailwindcss';

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            screens: {
                xs: '480px',
            },
            colors: {
                gray: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                },
            },
            boxShadow: {
                'inner-shadow':
                    '4px 4px 12px rgba(0,0,0,0.15), -4px -4px 12px white, inset 6px 6px 12px rgba(0,0,0,0.1), inset -6px -6px 12px rgb(255 255 255)',
                'outer-shadow':
                    '4px 4px 12px rgba(0,0,0,0.1), -4px -4px 12px white',
            },
        },
    },
    darkMode: 'class',
    plugins: [],
} satisfies Config;
