/**
 * Created by zhijie.huang on 2017/3/15.
 */

function DataHelper(network) {
    this.network = network;
}

DataHelper.prototype.objectToArray = function(obj) {
    return Object.keys(obj).map(function (key) { return obj[key]; });
};

DataHelper.prototype.setNetwork = function(network) {
    this.network = network;
};

DataHelper.prototype.addContextualInformation = function(elem, index, array) {
    this.addId(elem, index);
    this.addLabel(elem);
    this.addGroup(elem);
    this.addConnections(elem, index);
};

DataHelper.prototype.addId = function(elem, index) {
    elem.id = index;
};

DataHelper.prototype.addGroup = function (elem) {
    var item = this.network.body.data.nodes.get(elem.id);
    // console.info('addGroup', item.group);
    if (item.group) {
        elem.group = item.group;
    }
}

DataHelper.prototype.addLabel = function(elem) {
    var item = this.network.body.data.nodes.get(elem.id);

    // console.info('addLabel', item);
    elem.label = item.label;
};

DataHelper.prototype.addConnections = function(elem, index) {
    // need to replace this with a tree of the network, then get child direct children of the element
    elem.connections = this.network.getConnectedNodes(index);
};

DataHelper.prototype.exportNetwork = function(networkData) {
    var nodes = networkData.nodes._data;
    var edges = networkData.edges._data;

    return {
        nodes: nodes,
        edges: edges
    };
};
DataHelper.prototype.importNetwork = function(networkDataString) {
    var inputData = JSON.parse(networkDataString);

    console.info('importNetwork inputData', JSON.parse(JSON.stringify(inputData)));

    var data = {
        nodes: this.getNodeData(inputData),
        edges: this.getEdgeDataByNodes(inputData)
    };

    return data;
};


DataHelper.prototype.exportNetworkByNodes = function(network) {
    this.network = network;
    var nodes = this.network.getPositions();
    var that = this;
    for (var key in nodes) {
        that.addContextualInformation(nodes[key], key);
    }

    return nodes;
};

DataHelper.prototype.importNetworkByNodes = function(nodesString) {
    var inputData = JSON.parse(nodesString);

    console.info('importNetwork inputData', JSON.parse(JSON.stringify(inputData)));

    var data = {
        nodes: this.getNodeData(inputData),
        edges: this.getEdgeDataByNodes(inputData)
    };

    return data;
};

DataHelper.prototype.getNodeData = function(data) {
    var networkNodes = [];

    for (var key in data) {
        var elem = data[key];
        var node = {
            id: elem.id,
            label: elem.label,
            x: elem.x,
            y: elem.y
        };
        if (elem.group) {
            node.group = elem.group;
        }
        networkNodes.push(node);
    }

    // data.forEach(function(elem, index, array) {
    //     networkNodes.push({id: elem.id, label: elem.id, x: elem.x, y: elem.y});
    // });

    return new vis.DataSet(networkNodes);
    // return networkNodes;
};

DataHelper.prototype.getEdgeDataByNodes = function(data) {
    var networkEdges = [];

    for (var index in data) {
        var node = data[index];

        console.info('node = ', node.id, node.connections);

        // add the connection
        node.connections.forEach(function(connId, cIndex, conns) {
            networkEdges.push({from: node.id, to: connId});

            var elementConnections = data[connId].connections;

            // remove the connection from the other node to prevent duplicate connections
            var duplicateIndex = elementConnections.findIndex(function(connection) {
                return connection.toString() === node.id.toString();
            });

            if (duplicateIndex !== -1) {
                elementConnections.splice(duplicateIndex, 1);
            }
        });
    }

    console.info('networkEdges', networkEdges);

    return new vis.DataSet(networkEdges);
};