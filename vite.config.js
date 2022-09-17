import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { externals } from './src/rollup';
import analyze from 'rollup-plugin-analyzer';
import p from './package.json';

export default defineConfig({
    plugins: [dts({})],
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'SharedBase',
            formats: ['es', 'umd'],
            fileName: (format) => `shared-base.${format}.js`,
        },
        rollupOptions: {
            plugins: [analyze()],
            ...externals({
                react: '',
                'react/jsx-runtime': '',
                'date-fns/locale': '',
                ...p.dependencies,
            }),
        },
    },
});
