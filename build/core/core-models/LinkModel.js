"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LinkModel = /** @class */ (function () {
    function LinkModel(link, session) {
        this.session = session;
        this.id = link.id;
        this.sourcePortId = link.sourcePort;
        this.targetPortId = link.targetPort;
        this.sourceId = link.source;
        this.targetId = link.target;
        this.sourceLabel = link.sourceLabel;
        this.targetLabel = link.targetLabel;
        this.networkId = link.networkId;
        this.projectId = link.projectId;
    }
    LinkModel.prototype.getLinkedModels = function () {
        var source = this.session._diagram.selectDeviceById(this.sourceId);
        var target = this.session._diagram.selectDeviceById(this.targetId);
        var sourcePort = source.getPort(this.sourcePortId);
        var targetPort = target.getPort(this.targetPortId);
        return { source: source, target: target, sourcePort: sourcePort, targetPort: targetPort };
    };
    LinkModel.prototype.getLinkModels = function () {
        return this.getLinkedModels();
    };
    LinkModel.prototype.unlink = function () {
        var _a = this.getLinkedModels(), sourcePort = _a.sourcePort, targetPort = _a.targetPort;
        sourcePort.unlink();
        targetPort.unlink();
    };
    LinkModel.prototype.startLink = function () {
        var _a = this.getLinkedModels(), sourcePort = _a.sourcePort, targetPort = _a.targetPort;
        sourcePort.link = this;
        targetPort.link = this;
        sourcePort.startLink(targetPort);
        targetPort.startLink(sourcePort);
    };
    LinkModel.prototype.makeLink = function () {
        var _a = this.getLinkedModels(), sourcePort = _a.sourcePort, targetPort = _a.targetPort;
        sourcePort.link = this;
        targetPort.link = this;
        sourcePort.makeLink(targetPort);
        targetPort.makeLink(sourcePort);
    };
    LinkModel.prototype.prepareToUnlink = function () {
        var _a = this.getLinkedModels(), sourcePort = _a.sourcePort, targetPort = _a.targetPort;
        sourcePort.prepareToUnlink();
        targetPort.prepareToUnlink();
    };
    LinkModel.prototype.selectLink = function (port) {
        return this.sourcePortId == port.id || this.targetPortId == port.id;
    };
    LinkModel.prototype.getLinkData = function () {
        return {
            id: this.id,
            sourcePort: this.sourcePortId,
            targetPort: this.targetPortId,
            source: this.sourceId,
            target: this.targetId,
            sourceLabel: this.sourceLabel,
            targetLabel: this.targetLabel,
            networkId: this.networkId,
            projectId: this.projectId
        };
    };
    return LinkModel;
}());
exports.default = LinkModel;
