/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/

import Handler from './handler';
import assert from '../../../../lib/assert';

export default class NetworkFirst extends Handler {
  async handle({event} = {}) {
    assert.isInstance({event}, FetchEvent);

    let response;
    try {
      response = await this.requestWrapper.fetchAndCache({
        request: event.request,
      });
      if (response) {
        return response;
      }
    } catch (error) {
      // no-op
    }

    return await this.requestWrapper.match({request: event.request});
  }
}
