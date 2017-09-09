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
const _ = require('lodash');
const randexp = require('randexp');
const chalk = require('chalk');
const fs = require('fs');
const constants = require('../generator-constants');

/* Constants use throughout */
const INTERPOLATE_REGEX = constants.INTERPOLATE_REGEX;
const CLIENT_TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR;
const ANGULAR_DIR = constants.ANGULAR_DIR;
const SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR;
const SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR;
const TEST_DIR = constants.TEST_DIR;
const SERVER_TEST_SRC_DIR = constants.SERVER_TEST_SRC_DIR;

const SERVER_TEMPLATES_DIR = 'server';
const CLIENT_NG1_TEMPLATES_DIR = 'client/angularjs';
const CLIENT_NG2_TEMPLATES_DIR = 'client/duda';
const CLIENT_I18N_TEMPLATES_DIR = 'client';

/**
* The default is to use a file path string. It implies use of the template method.
* For any other config an object { file:.., method:.., template:.. } can be used
*/
const serverFiles = {
    db: [
        {
            condition: generator => generator.databaseType === 'sql',
            path: SERVER_MAIN_RES_DIR,
            templates: [{
                file: 'config/liquibase/changelog/_added_entityVicente.xml',
                options: { interpolate: INTERPOLATE_REGEX },
                renameTo: generator => `config/liquibase/changelog/${generator.changelogDate}_added_entity_${generator.entityClass}.xml`
            }]
        },
        {
            condition: generator => generator.databaseType === 'sql',
            path: SERVER_MAIN_RES_DIR,
            templates: [{
                file: 'config/liquibase/changelog/_added_entityAudVicente.xml',
                options: { interpolate: INTERPOLATE_REGEX },
                renameTo: generator => `config/liquibase/changelog/${generator.changelogDate}_added_entity_${generator.entityClass}AUD.xml`
            }]
        },
        {
            condition: generator => generator.databaseType === 'sql' && (generator.fieldsContainOwnerManyToMany || generator.fieldsContainOwnerOneToOne || generator.fieldsContainManyToOne),
            path: SERVER_MAIN_RES_DIR,
            templates: [{
                file: 'config/liquibase/changelog/_added_entity_constraints.xml',
                options: { interpolate: INTERPOLATE_REGEX },
                renameTo: generator => `config/liquibase/changelog/${generator.changelogDate}_added_entity_constraints_${generator.entityClass}.xml`
            }]
        },
        {
            condition: generator => generator.databaseType === 'cassandra',
            path: SERVER_MAIN_RES_DIR,
            templates: [{
                file: 'config/cql/changelog/_added_entity.cql',
                renameTo: generator => `config/cql/changelog/${generator.changelogDate}_added_entity_${generator.entityClass}.cql`
            }]
        }
    ],
    server: [
        {
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/domain/_EntityVicente.java',
                    renameTo: generator => `${generator.packageFolder}/domain/${generator.entityClass}.java`
                },
                {
                    file: 'package/repository/_EntityRepositoryVicente.java',
                    renameTo: generator => `${generator.packageFolder}/repository/${generator.entityClass}Repository.java`
                },
                {
                    file: 'package/web/rest/_EntityResourceVicente.java',
                    renameTo: generator => `${generator.packageFolder}/web/rest/${generator.entityClass}Resource.java`
                }
            ]
        },
        {
            condition: generator => generator.jpaMetamodelFiltering,
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/service/dto/_EntityCriteria.java',
                    renameTo: generator => `${generator.packageFolder}/service/dto/${generator.entityClass}Criteria.java`
                },
                {
                    file: 'package/service/_EntityQueryService.java',
                    renameTo: generator => `${generator.packageFolder}/service/${generator.entityClass}QueryService.java`
                },
            ]
        },
        {
            condition: generator => generator.searchEngine === 'elasticsearch',
            path: SERVER_MAIN_SRC_DIR,
            templates: [{
                file: 'package/repository/search/_EntitySearchRepository.java',
                renameTo: generator => `${generator.packageFolder}/repository/search/${generator.entityClass}SearchRepository.java`
            }]
        },
        {
            condition: generator => generator.service === 'serviceImpl',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/service/_EntityServiceVicente.java',
                    renameTo: generator => `${generator.packageFolder}/service/${generator.entityClass}Service.java`
                }
                // ,
                // {
                //     file: 'package/service/impl/_EntityServiceImpl.java',
                //     renameTo: generator => `${generator.packageFolder}/service/impl/${generator.entityClass}ServiceImpl.java`
                // }
            ]
        },
        {
            condition: generator => generator.service === 'serviceClass',
            path: SERVER_MAIN_SRC_DIR,
            templates: [{
                file: 'package/service/impl/_EntityServiceImpl.java',
                renameTo: generator => `${generator.packageFolder}/service/${generator.entityClass}Service.java`
            }]
        },
        {
            condition: generator => generator.dto === 'mapstruct',
            path: SERVER_MAIN_SRC_DIR,
            templates: [
                {
                    file: 'package/service/dto/_EntityDTOVicente.java',
                    renameTo: generator => `${generator.packageFolder}/service/dto/${generator.entityClass}DTO.java`
                },
                {
                    file: 'package/service/mapper/_BaseEntityMapper.java',
                    renameTo: generator => `${generator.packageFolder}/service/mapper/EntityMapper.java`
                },
                {
                    file: 'package/service/mapper/_EntityMapperVicente.java',
                    renameTo: generator => `${generator.packageFolder}/service/mapper/${generator.entityClass}Mapper.java`
                }
            ]
        }
    ],
    test: [
        {
            path: SERVER_TEST_SRC_DIR,
            templates: [{
                file: 'package/web/rest/_EntityResourceIntTestVicente.java',
                options: { context: { randexp, _, chalkRed: chalk.red, fs, SERVER_TEST_SRC_DIR } },
                renameTo: generator => `${generator.packageFolder}/web/rest/${generator.entityClass}ResourceIntTest.java`
            }]
        },
        {
            condition: generator => generator.gatlingTests,
            path: TEST_DIR,
            templates: [{
                file: 'gatling/user-files/simulations/_EntityGatlingTest.scala',
                options: { interpolate: INTERPOLATE_REGEX },
                renameTo: generator => `gatling/user-files/simulations/${generator.entityClass}GatlingTest.scala`
            }]
        }
    ]
};


const angularFiles = {
    client: [
        {
            path: ANGULAR_DIR,
            templates: [
                {
                    file: 'module/routing.module.ts',
                    renameTo: generator => `${generator.entityFolderName}/routing.module.ts`
                },
                {
                    file: 'module/module.ts',
                    renameTo: generator => `${generator.entityFolderName}/${generator.entityFileName}.module.ts`
                },
                {
                    file: 'module/service.ts',
                    renameTo: generator => `${generator.entityFolderName}/service.ts`
                },
                {
                    file: 'module/lista/lista.component.ts',
                    renameTo: generator => `${generator.entityFolderName}/lista/lista.component.ts`
                },
                {
                    file: 'module/crud/crud.component.ts',
                    renameTo: generator => `${generator.entityFolderName}/crud/crud.component.ts`
                },
                {
                    file: 'module/crud/crud.component.css',
                    renameTo: generator => `${generator.entityFolderName}/crud/crud.component.css`
                },
                {
                    file: 'module/crud/crud.component.html',
                    method: 'processHtml',
                    template: true,
                    renameTo: generator => `${generator.entityFolderName}/crud/crud.component.html`
                },
                {
                    file: 'module/detalhes/detalhes.component.ts',
                    renameTo: generator => `${generator.entityFolderName}/detalhes/detalhes.component.ts`
                },
                {
                    file: 'module/detalhes/detalhes.component.css',
                    renameTo: generator => `${generator.entityFolderName}/detalhes/detalhes.component.css`
                },
                {
                    file: 'module/detalhes/detalhes.component.html',
                    method: 'processHtml',
                    template: true,
                    renameTo: generator => `${generator.entityFolderName}/detalhes/detalhes.component.html`
                },
            ]
        }
    ]
};

module.exports = {
    writeFiles,
    serverFiles,
    angularFiles
};

function writeFiles() {
    return {
        saveRemoteEntityPath() {
            if (_.isUndefined(this.microservicePath)) {
                return;
            }
            this.copy(`${this.microservicePath}/${this.jhipsterConfigDirectory}/${this.entityNameCapitalized}.json`, this.destinationPath(`${this.jhipsterConfigDirectory}/${this.entityNameCapitalized}.json`));
        },

        writeServerFiles() {
            if (this.skipServer) return;

            // write server side files
            this.writeFilesToDisk(serverFiles, this, false, SERVER_TEMPLATES_DIR);

            if (this.databaseType === 'sql') {
                if (this.fieldsContainOwnerManyToMany || this.fieldsContainOwnerOneToOne || this.fieldsContainManyToOne) {
                    this.addConstraintsChangelogToLiquibase(`${this.changelogDate}_added_entity_constraints_${this.entityClass}`);
                }
                this.addChangelogToLiquibase(`${this.changelogDate}_added_entity_${this.entityClass}`);
                //                this.addChangelogToLiquibase(`${this.changelogDate}_added_entity_${this.entityClass}AUD`);

                if (this.hibernateCache === 'ehcache' || this.hibernateCache === 'infinispan') {
                    this.addEntityToCache(this.entityClass, this.relationships, this.packageName, this.packageFolder, this.hibernateCache);
                }
            }
        },

        writeEnumFiles() {
            this.fields.forEach((field) => {
                if (field.fieldIsEnum === true) {
                    const fieldType = field.fieldType;
                    field.enumInstance = _.lowerFirst(fieldType);
                    const enumInfo = {
                        enumName: fieldType,
                        enumValues: field.fieldValues.split(',').join(', '),
                        enumInstance: field.enumInstance,
                        angularAppName: this.angularAppName,
                        enums: field.fieldValues.replace(/\s/g, '').split(','),
                        packageName: this.packageName
                    };
                    if (!this.skipServer) {
                        this.template(
                            `${SERVER_TEMPLATES_DIR}/${SERVER_MAIN_SRC_DIR}package/domain/enumeration/_Enum.java`,
                            `${SERVER_MAIN_SRC_DIR}${this.packageFolder}/domain/enumeration/${fieldType}.java`,
                            this, {}, enumInfo
                        );
                    }

                    // Copy for each
                    if (!this.skipClient && this.enableTranslation) {
                        const languages = this.languages || this.getAllInstalledLanguages();
                        languages.forEach((language) => {
                            this.copyEnumI18n(language, enumInfo, CLIENT_I18N_TEMPLATES_DIR);
                        });
                    }
                }
            });
        },

        writeClientFiles() {
            if (this.skipClient) return;

            this.writeFilesToDisk(angularFiles, this, false, CLIENT_NG2_TEMPLATES_DIR);
            //this.addEntityToModule(this.entityInstance, this.entityClass, this.entityAngularName, this.entityFolderName, this.entityFileName, this.enableTranslation, this.clientFramework);

        }
    };
}
