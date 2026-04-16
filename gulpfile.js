'use strict';

const { dest } = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rollup = require('@rollup/stream');
const { spawn } = require('child_process');

function cleanNodeModules() {
    return del(['node_modules'], { force: true });
}

function bundle() {
    return rollup({
        input: './app/assets/javascripts/gtm_dl.js',
        output: {
            format: 'iife',
            sourcemap: false
        }
    })
        .pipe(source('gtm_dl.js', './app/assets/javascripts/'))
        .pipe(buffer())
        .pipe(
            babel({
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: 'ie >= 11'
                        }
                    ]
                ]
            })
        )
        .pipe(dest('./app/assets/javascripts/bundle'));
}

function jestTask() {
    const jestBin = process.platform === 'win32'
        ? '.\\node_modules\\.bin\\jest.cmd'
        : './node_modules/.bin/jest';

    return spawn(jestBin, ['--ci'], {
        stdio: 'inherit',
        shell: true
    });
}

exports.bundle = bundle;
exports['clean:node_modules'] = cleanNodeModules;
exports.jest = jestTask;