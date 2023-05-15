"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateApi = void 0;
var Templates = new Map();
var JavaCode = new Map();
exports.TemplateApi = {
    saveTemplates: function (templates, clean) {
        if (clean === void 0) { clean = false; }
        if (clean)
            Templates.clear();
        templates.forEach(function (value, key) { return Templates.set(key, value); });
    },
    saveTemplate: function (name, code) {
        Templates.set(name, code);
    },
    getTemplate: function (name) {
        return Templates.get(name);
    },
    generateCode: function (name, beanName) {
        var _a;
        return (_a = Templates.get(name)) === null || _a === void 0 ? void 0 : _a.replaceAll("NAME", beanName);
    },
    saveJavaCodes: function (javaCode, clean) {
        if (clean === void 0) { clean = false; }
        if (clean)
            JavaCode.clear();
        javaCode.forEach(function (value, key) { return JavaCode.set(key, value); });
    },
    saveJavaCode: function (name, code) {
        JavaCode.set(name, code);
    },
    getJavaCode: function (name) {
        return JavaCode.get(name);
    },
};
