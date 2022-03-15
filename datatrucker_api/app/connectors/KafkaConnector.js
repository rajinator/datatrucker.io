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

const fp = require('fastify-plugin');
const {Kafka} = require('kafkajs');

module.exports = fp((f, opts, done) => {
      async function handler(creds) {
            if (f.CredHandler.has(`${creds.tenant}-${creds.credentialname}`)) {
                  f.log.trace("Using cached connections")
                  return f.CredHandler.get(`${creds.tenant}-${creds.credentialname}`);
            }
            try {
                  const brokerlist = creds.hostname.split(',');

                  const client = new Kafka({
                        clientId: 'datatrucker',
                        brokers: brokerlist
                  });
                  f.log.trace("kafka client defined")
                  f.CredHandler.set(`${creds.tenant}-${creds.credentialname}`, client);
                  return client;
            } catch (e) {
                  f.log.error(e);
                  f.CredHandler.del(`${creds.tenant}-${creds.credentialname}`);
                  return 0;
            }
      }

      f.decorate('KafkaConnector', handler);
      done();
});
