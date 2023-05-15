"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CamelDisplayUtil = void 0;
var CamelUtil_1 = require("./CamelUtil");
var CamelDefinitionApi_1 = require("./CamelDefinitionApi");
var CamelDefinitionApiExt_1 = require("./CamelDefinitionApiExt");
var CamelDisplayUtil = /** @class */ (function () {
    function CamelDisplayUtil() {
    }
    var _a;
    _a = CamelDisplayUtil;
    CamelDisplayUtil.isStepDefinitionExpanded = function (integration, stepUuid, selectedUuid) {
        var expandedUuids = [];
        if (selectedUuid) {
            expandedUuids.push.apply(expandedUuids, _a.getParentStepDefinitions(integration, selectedUuid));
        }
        return expandedUuids.includes(stepUuid);
    };
    CamelDisplayUtil.getParentStepDefinitions = function (integration, uuid) {
        var _b, _c;
        var result = [];
        var meta = CamelDefinitionApiExt_1.CamelDefinitionApiExt.findElementMetaInIntegration(integration, uuid);
        var i = 0;
        if (meta) {
            while (((_b = meta.step) === null || _b === void 0 ? void 0 : _b.dslName) !== 'FromDefinition' && i < 100) {
                i++;
                if (((_c = meta.step) === null || _c === void 0 ? void 0 : _c.dslName) === 'StepDefinition')
                    result.push(meta.step.uuid);
                if (meta.parentUuid)
                    meta = CamelDefinitionApiExt_1.CamelDefinitionApiExt.findElementMetaInIntegration(integration, meta.parentUuid);
                else
                    break;
            }
        }
        return result;
    };
    CamelDisplayUtil.setIntegrationVisibility = function (integration, selectedUuid) {
        var _b, _c;
        var clone = CamelUtil_1.CamelUtil.cloneIntegration(integration);
        var expandedUuids = [];
        if (selectedUuid) {
            expandedUuids.push.apply(expandedUuids, _a.getParentStepDefinitions(integration, selectedUuid));
        }
        var flows = [];
        (_b = clone.spec.flows) === null || _b === void 0 ? void 0 : _b.filter(function (flow) { return flow.dslName !== 'RouteDefinition'; }).forEach(function (bean) { return flows.push(bean); });
        var routes = (_c = clone.spec.flows) === null || _c === void 0 ? void 0 : _c.filter(function (flow) { return flow.dslName === 'RouteDefinition'; }).map(function (f) { return CamelDisplayUtil.setElementVisibility(f, true, expandedUuids); }).filter(function (x) { return Object.keys(x).length !== 0; });
        flows.push.apply(flows, routes);
        clone.spec.flows = flows;
        return clone;
    };
    CamelDisplayUtil.setElementVisibility = function (step, showChildren, expandedUuids) {
        var result = CamelDefinitionApi_1.CamelDefinitionApi.createStep(step.dslName, step);
        result.show = showChildren;
        if (result.dslName === 'StepDefinition' && !expandedUuids.includes(result.uuid)) {
            showChildren = false;
        }
        else if (result.dslName === 'StepDefinition' && expandedUuids.includes(result.uuid)) {
            showChildren = true;
        }
        var ce = CamelDefinitionApiExt_1.CamelDefinitionApiExt.getElementChildrenDefinition(step.dslName);
        ce.forEach(function (e) {
            var cel = CamelDefinitionApiExt_1.CamelDefinitionApiExt.getElementChildren(step, e);
            if (e.multiple) {
                result[e.name] = _a.setElementsVisibility(result[e.name], showChildren, expandedUuids);
            }
            else {
                var prop = result[e.name];
                if (prop && prop.hasOwnProperty("uuid")) {
                    result[e.name] = _a.setElementVisibility(cel[0], showChildren, expandedUuids);
                }
            }
        });
        return result;
    };
    CamelDisplayUtil.setElementsVisibility = function (steps, showChildren, expandedUuids) {
        var result = [];
        if (steps !== undefined) {
            steps.forEach(function (step) {
                step = _a.setElementVisibility(step, showChildren, expandedUuids);
                result.push(step);
            });
        }
        return result;
    };
    return CamelDisplayUtil;
}());
exports.CamelDisplayUtil = CamelDisplayUtil;
