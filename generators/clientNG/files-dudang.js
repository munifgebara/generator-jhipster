/**
 * Copyright 2013-2017 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const mkdirp = require('mkdirp');
const constants = require('../generator-constants');

/* Constants use throughout */
const MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR;
const TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR;
const ANGULAR_DIR = constants.ANGULAR_DIR;

/**
 * The default is to use a file path string. It implies use of the template method.
 * For any other config an object { file:.., method:.., template:.. } can be used
*/
const files = {
    common: [
        {
            templates: [
                '_.angular-cli.json',
                '_.editorconfig',
                '_karma.conf.js',
                '_package.json',
                '_protractor.conf.js',
                '_tsconfig.json',
                '_tslint.json',
            ]
        }
    ],
    srcmainwebappenvironments: [
        {
            templates: [
                'src/main/webapp/environments/_environment.ts',
                'src/main/webapp/environments/_environment.prod.ts'
            ]
        }

    ],
    srcmainwebappassets: [
        {
            templates: [
                'src/main/webapp/assets/_.gitkeep'
            ]
        }

    ],
    srcmainwebappapp: [
        {
            templates: [
                'src/main/webapp/app/_app.component.css',
                'src/main/webapp/app/_app.component.html',
                'src/main/webapp/app/_app.component.spec.ts',
                'src/main/webapp/app/_app.component.ts',
                'src/main/webapp/app/_app.module.ts',
                'src/main/webapp/app/_app-routing.module.ts'
            ]
        }

    ],
    srcmainwebapp: [
        {
            templates: [
                'src/main/webapp/_index.html',
                'src/main/webapp/_main.ts',
                'src/main/webapp/_polyfills.ts',
                'src/main/webapp/_styles.css',
                'src/main/webapp/_test.ts',
                'src/main/webapp/_tsconfig.app.json',
                'src/main/webapp/_tsconfig.spec.json',
                'src/main/webapp/_typings.d.ts',
                { file: 'src/main/webapp/_favicon.ico', method: 'copy' },
            ]
        }
    ],
    clientTestFw: [
        {
            templates: [
                'e2e/_app.e2e-spec.ts', 'e2e/_app.po.ts', 'e2e/_tsconfig.e2e.json'
            ]
        }
    ]
};

module.exports = {
    writeFiles,
    files
};

function writeFiles() {
    mkdirp(MAIN_SRC_DIR);
    // write angular 2.x and above files
    this.writeFilesToDisk(files, this, false, 'dudang');
}
