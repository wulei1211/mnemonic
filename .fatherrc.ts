// @ts-ignore
import {defineConfig} from 'father';
// @ts-ignore
import * as path from "node:path";

export default defineConfig({
    cjs: { 
        input: 'wallet',
        output: 'dist/cjs',
        platform: 'node',
        transformer: 'babel'
    },
    esm: { 
        input: 'wallet',
        output: 'dist/esm',
        platform: 'browser',
        transformer: 'babel'
    },
    umd: {
        entry: 'wallet/index.ts',  // 使用 'entry' 而不是 'input'
        output: 'dist/umd',
        name: 'WalletSDK'
    },
    alias: {
        '@': path.resolve(__dirname, './wallet'),
    },
    // 全局配置
    prebundle: {
        deps: {}
    },
    sourcemap: true,
    extraBabelPlugins: [
        '@babel/plugin-transform-modules-commonjs',
    ],
    extraBabelPresets: [
        ['@babel/preset-env', {
            targets: {
                browsers: ['last 2 versions', 'not dead', '> 0.2%'],
                node: '14'
            }
        }]
    ]
});
