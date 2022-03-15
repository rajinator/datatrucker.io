/*
* Copyright 2021 Datatrucker.io Inc , Ontario , Canada
* 
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
* 
*     http://www.apache.org/licenses/LICENSE-2.0
* 
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/ 


const schemaUsername = {type: 'string', minimum: 4, pattern: '^[A-Za-z0-9]+$'}
const schemaPassword ={
                              type: 'string',
                              pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})(?!.*[; ])',
                              minimum: 8
                      }
const schemaTenant = {type: 'string', pattern: '^[A-Za-z0-9]+$', minimum: 4}


const login = {
      body: {
            type: 'object',
            required: ['username', 'password', 'tenant'],
            properties: {
                  username: schemaUsername,
                  password: schemaPassword,
                  tenant: schemaTenant
            },
            errorMessage: 'Invalid format, refer to documentation /support for login format'
      },
      response: {
            200: {
                  type: 'object',
                  properties: {
                        status: {type: 'boolean'},
                        username: {type: 'string'},
                        token: {type: 'string'}
                  }
            },
            400: {
                  type: 'object',
                  properties: {
                        status: {type: 'boolean'}
                  }
            }
      }
};

exports.login = login;
