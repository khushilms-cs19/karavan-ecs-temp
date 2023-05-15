"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = exports.ProjectProperty = void 0;
/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var uuid_1 = require("uuid");
var ProjectProperty = /** @class */ (function () {
    function ProjectProperty(init) {
        this.id = '';
        this.key = '';
        Object.assign(this, init);
    }
    ProjectProperty.createNew = function (key, value) {
        return new ProjectProperty({ id: (0, uuid_1.v4)(), key: key, value: value });
    };
    return ProjectProperty;
}());
exports.ProjectProperty = ProjectProperty;
var ProjectModel = /** @class */ (function () {
    function ProjectModel(init) {
        this.properties = [];
        Object.assign(this, init);
    }
    ProjectModel.createNew = function (init) {
        return new ProjectModel(init ? init : {});
    };
    return ProjectModel;
}());
exports.ProjectModel = ProjectModel;
