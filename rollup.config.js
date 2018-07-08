import babel from 'rollup-plugin-babel';
import { peerDependencies } from './package.json';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: false,
    },
    plugins: [
        babel({
            plugins: ['external-helpers'],
            exclude: 'node_modules/**',
            runtimeHelpers: true,
        })
    ],
    external: id => /lodash/.test(id) || Object.keys(peerDependencies).includes(id),
};
