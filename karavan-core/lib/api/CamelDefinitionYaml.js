"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamelDefinitionYaml = void 0;
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
var yaml = require("js-yaml");
var IntegrationDefinition_1 = require("../model/IntegrationDefinition");
var CamelDefinition_1 = require("../model/CamelDefinition");
var CamelUtil_1 = require("./CamelUtil");
var CamelDefinitionYamlStep_1 = require("./CamelDefinitionYamlStep");
var CamelDefinitionYaml = /** @class */ (function () {
    function CamelDefinitionYaml() {
    }
    var _a;
    _a = CamelDefinitionYaml;
    CamelDefinitionYaml.integrationToYaml = function (integration) {
        var clone = CamelUtil_1.CamelUtil.cloneIntegration(integration);
        var flows = integration.spec.flows;
        clone.spec.flows = flows === null || flows === void 0 ? void 0 : flows.map(function (f) { return CamelDefinitionYaml.cleanupElement(f); }).filter(function (x) { return Object.keys(x).length !== 0; });
        if (integration.type === 'crd') {
            delete clone.type;
            var i = JSON.parse(JSON.stringify(clone, function (key, value) { return _a.replacer(key, value); }, 3)); // fix undefined in string attributes
            var text = CamelDefinitionYaml.yamlDump(i);
            return text;
        }
        else {
            var f = JSON.parse(JSON.stringify(clone.spec.flows, function (key, value) { return _a.replacer(key, value); }, 3));
            var text = CamelDefinitionYaml.yamlDump(f);
            return text;
        }
    };
    CamelDefinitionYaml.cleanupElement = function (element, inArray, inSteps) {
        var result = {};
        var object = Object.assign({}, element);
        if (inArray) {
            object.inArray = inArray;
            object.inSteps = (inSteps === true);
        }
        if (object.dslName.endsWith('Expression')) {
            delete object.language;
            delete object.expressionName;
        }
        else if (object.dslName.endsWith('DataFormat')) {
            delete object.dataFormatName;
        }
        else if (object.dslName === 'NamedBeanDefinition') {
            if (object.properties && Object.keys(object.properties).length === 0)
                delete object.properties;
        }
        delete object.uuid;
        delete object.show;
        Object.keys(object)
            .forEach(function (key) {
            if (object[key] instanceof IntegrationDefinition_1.CamelElement || (typeof object[key] === 'object' && object[key].dslName)) {
                result[key] = CamelDefinitionYaml.cleanupElement(object[key]);
            }
            else if (Array.isArray(object[key])) {
                if (object[key].length > 0)
                    result[key] = CamelDefinitionYaml.cleanupElements(object[key], key === 'steps');
            }
            else if (key === 'parameters' && typeof (object[key]) === 'object') {
                var obj_1 = object[key];
                var parameters = Object.keys(obj_1 || {}).reduce(function (x, k) {
                    // Check for null or undefined or empty
                    if (obj_1[k] !== null && obj_1[k] !== undefined && obj_1[k].toString().trim().length > 0) {
                        x[k] = obj_1[k];
                    }
                    return x;
                }, {});
                if (Object.keys(parameters).length > 0)
                    result[key] = parameters;
            }
            else {
                if (object[key] !== undefined && object[key].toString().trim().length > 0)
                    result[key] = object[key];
            }
        });
        return result;
    };
    CamelDefinitionYaml.cleanupElements = function (elements, inSteps) {
        var result = [];
        elements.forEach(function (element) {
            if (typeof (element) === 'object') {
                var newElement = CamelDefinitionYaml.cleanupElement(element, true, inSteps);
                result.push(newElement);
            }
            else {
                result.push(element);
            }
        });
        return result;
    };
    CamelDefinitionYaml.yamlDump = function (integration) {
        return yaml.dump(integration, {
            noRefs: false,
            noArrayIndent: false,
            sortKeys: function (a, b) {
                if (a === 'steps')
                    return 1;
                else if (b === 'steps')
                    return -1;
                else
                    return 0;
            }
        });
    };
    CamelDefinitionYaml.replacer = function (key, value) {
        if (typeof value === 'object' && (value.hasOwnProperty('stepName') || value.hasOwnProperty('inArray') || value.hasOwnProperty('inSteps'))) {
            var stepNameField = value.hasOwnProperty('stepName') ? 'stepName' : 'step-name';
            var stepName = value[stepNameField];
            var dslName = value.dslName;
            var newValue = JSON.parse(JSON.stringify(value));
            delete newValue.dslName;
            delete newValue[stepNameField];
            if ((value.inArray && !value.inSteps)
                || dslName === 'ExpressionSubElementDefinition'
                || dslName === 'ExpressionDefinition'
                || (dslName === null || dslName === void 0 ? void 0 : dslName.endsWith('Expression'))
                || stepName === 'otherwise'
                || stepName === 'doFinally'
                || stepName === 'resilience4jConfiguration'
                || stepName === 'faultToleranceConfiguration'
                || stepName === 'errorHandler'
                || stepName === 'onException'
                || stepName === 'deadLetterChannel'
                || stepName === 'defaultErrorHandler'
                || stepName === 'jtaTransactionErrorHandler'
                || stepName === 'noErrorHandler'
                || stepName === 'springTransactionErrorHandler'
                || stepName === 'redeliveryPolicy'
                || key === 'from') {
                delete newValue.inArray;
                delete newValue.inSteps;
                return newValue;
            }
            else {
                delete newValue.inArray;
                delete newValue.inSteps;
                var xValue = {};
                xValue[stepName] = newValue;
                return xValue;
            }
        }
        else {
            value === null || value === void 0 ? true : delete value.dslName;
            return value;
        }
    };
    CamelDefinitionYaml.yamlToIntegration = function (filename, text) {
        var _b, _c, _d, _e;
        var integration = IntegrationDefinition_1.Integration.createNew(filename);
        var fromYaml = yaml.load(text);
        var camelized = CamelUtil_1.CamelUtil.camelizeObject(fromYaml);
        if ((camelized === null || camelized === void 0 ? void 0 : camelized.apiVersion) && camelized.apiVersion.startsWith('camel.apache.org') && camelized.kind && camelized.kind === 'Integration') {
            integration.type = 'crd';
            if ((_b = camelized === null || camelized === void 0 ? void 0 : camelized.metadata) === null || _b === void 0 ? void 0 : _b.name)
                integration.metadata.name = (_c = camelized === null || camelized === void 0 ? void 0 : camelized.metadata) === null || _c === void 0 ? void 0 : _c.name;
            var int = new IntegrationDefinition_1.Integration(__assign({}, camelized));
            (_d = integration.spec.flows) === null || _d === void 0 ? void 0 : _d.push.apply(_d, _a.flowsToCamelElements(int.spec.flows || []));
        }
        else if (Array.isArray(camelized)) {
            integration.type = 'plain';
            var flows = camelized;
            (_e = integration.spec.flows) === null || _e === void 0 ? void 0 : _e.push.apply(_e, _a.flowsToCamelElements(flows));
        }
        return integration;
    };
    CamelDefinitionYaml.yamlIsIntegration = function (text) {
        var fromYaml = yaml.load(text);
        var camelized = CamelUtil_1.CamelUtil.camelizeObject(fromYaml);
        if ((camelized === null || camelized === void 0 ? void 0 : camelized.apiVersion) && camelized.apiVersion.startsWith('camel.apache.org') && camelized.kind && camelized.kind === 'Integration') {
            return true;
        }
        else if (Array.isArray(camelized)) {
            return true;
        }
        else {
            return false;
        }
    };
    CamelDefinitionYaml.flowsToCamelElements = function (flows) {
        var result = [];
        flows.filter(function (e) { return e.hasOwnProperty('restConfiguration'); })
            .forEach(function (f) { return result.push(CamelDefinitionYamlStep_1.CamelDefinitionYamlStep.readRestConfigurationDefinition(f.restConfiguration)); });
        flows.filter(function (e) { return e.hasOwnProperty('rest'); })
            .forEach(function (f) { return result.push(CamelDefinitionYamlStep_1.CamelDefinitionYamlStep.readRestDefinition(f.rest)); });
        flows.filter(function (e) { return e.hasOwnProperty('route'); })
            .forEach(function (f) { return result.push(CamelDefinitionYamlStep_1.CamelDefinitionYamlStep.readRouteDefinition(f.route)); });
        flows.filter(function (e) { return e.hasOwnProperty('from'); })
            .forEach(function (f) { return result.push(CamelDefinitionYamlStep_1.CamelDefinitionYamlStep.readRouteDefinition(new CamelDefinition_1.RouteDefinition({ from: f.from }))); });
        flows.filter(function (e) { return e.hasOwnProperty('beans'); })
            .forEach(function (b) { return result.push(CamelDefinitionYaml.readBeanDefinition(b)); });
        flows.filter(function (e) { return e.hasOwnProperty('routeConfiguration'); })
            .forEach(function (e) { return result.push(CamelDefinitionYamlStep_1.CamelDefinitionYamlStep.readRouteConfigurationDefinition(e.routeConfiguration)); });
        flows.filter(function (e) { return e.hasOwnProperty('errorHandler'); })
            .forEach(function (f) { return result.push(CamelDefinitionYamlStep_1.CamelDefinitionYamlStep.readRouteConfigurationDefinition(new CamelDefinition_1.RouteConfigurationDefinition({ errorHandler: f.errorHandler }))); });
        flows.filter(function (e) { return e.hasOwnProperty('onException'); })
            .forEach(function (f) { return result.push(CamelDefinitionYamlStep_1.CamelDefinitionYamlStep.readRouteConfigurationDefinition(new CamelDefinition_1.RouteConfigurationDefinition({ onException: f.onException }))); });
        return result;
    };
    CamelDefinitionYaml.readBeanDefinition = function (beans) {
        var result = new IntegrationDefinition_1.Beans();
        beans.beans.forEach(function (b) {
            var props = {};
            if (b && b.properties) {
                // convert map style to properties if requires
                Object.keys(b.properties).forEach(function (key) {
                    var value = b.properties[key];
                    CamelDefinitionYaml.flatMapProperty(key, value, new Map())
                        .forEach(function (v, k) { return props[k] = v; });
                });
            }
            b.properties = props;
            result.beans.push(new CamelDefinition_1.NamedBeanDefinition(b));
        });
        return result;
    };
    // convert map style to properties if requires
    CamelDefinitionYaml.flatMapProperty = function (key, value, properties) {
        if (value === undefined) {
        }
        else if (typeof value === 'object') {
            Object.keys(value).forEach(function (k) {
                var key2 = key + "." + k;
                var value2 = value[k];
                CamelDefinitionYaml.flatMapProperty(key2, value2, new Map())
                    .forEach(function (value1, key1) { return properties.set(key1, value1); });
            });
        }
        else {
            properties.set(key, value);
        }
        return properties;
    };
    // add generated Integration YAML into existing Integration YAML
    CamelDefinitionYaml.addYamlToIntegrationYaml = function (filename, camelYaml, restYaml, addREST, addRoutes) {
        var _b, _c, _d, _e, _f;
        var existing = camelYaml != undefined ? CamelDefinitionYaml.yamlToIntegration(filename, camelYaml) : IntegrationDefinition_1.Integration.createNew(filename);
        var generated = CamelDefinitionYaml.yamlToIntegration(filename, restYaml);
        var flows = ((_b = existing.spec.flows) === null || _b === void 0 ? void 0 : _b.filter(function (f) { return !['RouteDefinition', 'RestDefinition'].includes(f.dslName); })) || [];
        var restE = ((_c = existing.spec.flows) === null || _c === void 0 ? void 0 : _c.filter(function (f) { return f.dslName === 'RestDefinition'; })) || [];
        var restG = ((_d = generated.spec.flows) === null || _d === void 0 ? void 0 : _d.filter(function (f) { return f.dslName === 'RestDefinition'; })) || [];
        if (addREST) {
            flows.push.apply(flows, restG);
        }
        else {
            flows.push.apply(flows, restE);
        }
        var routeE = ((_e = existing.spec.flows) === null || _e === void 0 ? void 0 : _e.filter(function (f) { return f.dslName === 'RouteDefinition'; })) || [];
        var routeG = ((_f = generated.spec.flows) === null || _f === void 0 ? void 0 : _f.filter(function (f) { return f.dslName === 'RouteDefinition'; })) || [];
        if (addRoutes) {
            flows.push.apply(flows, routeG);
        }
        else {
            flows.push.apply(flows, routeE);
        }
        existing.spec.flows = flows;
        return CamelDefinitionYaml.integrationToYaml(existing);
    };
    return CamelDefinitionYaml;
}());
exports.CamelDefinitionYaml = CamelDefinitionYaml;
