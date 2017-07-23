/**
 * Created by zhijie.huang on 2017/3/14.
 */

angular.module('demo09App').component('appView', {
    templateUrl: 'dist/js/demo09/demo09.template.html',
    controller: function AppViewController($timeout, $scope) {
        var EDIT_TYPE = ['NEW', 'EDIT'];

        $scope.modalTitle = '';
        $scope.network = null;
        $scope.editCallback = null;
        $scope.editNode = null;
        $scope.networkDataString = '';
        $scope.networkData = null;
        $scope.editType = EDIT_TYPE[0];
        $scope.treeNodes = API_TREE_DATA.data.nodes;

        var myDataHelper = null;

        $scope.$watch('network', function(data) {
           // console.log('in $watch network', data);
           if (data) {
               $scope.e_export();
           }
        });

        $scope.e_reload = function() {
            $scope.e_destroy();
            $scope.draw();
        };

        $scope.e_save = function() {
            if ($scope.editCallback) {
                $scope.editCallback($scope.editNode);
                $timeout(function() {
                    $scope.e_export();
                }, 0);
            }
            $('#myModal').modal('hide');
        };

        $scope.e_cancel = function() {
            if ($scope.editCallback) {
                $scope.editCallback(null);
            }
            $('#myModal').modal('hide');
        };

        $scope.e_destroy = function() {
            console.info($scope.network);

            if ($scope.network !== null) {
                $scope.network.destroy();
                $scope.network = null;
            }
        };

        $scope.e_export = function () {
            // var data = myDataHelper.exportNetwork($scope.network);
            var data = myDataHelper.exportNetwork($scope.networkData);

            $scope.networkDataString = JSON.stringify(data, null, 4);

            $scope.resizeDataView();
        };

        $scope.e_import = function() {
            if ($scope.networkDataString.length == 0) {
                alert('还没有导出数据');
                return
            }
            var data = myDataHelper.importNetwork($scope.networkDataString);
            console.info('e_import, data,', data);
            $scope.draw(data);
        };

        $scope.createData = function () {
            // return getScaleFreeNetwork(NODE_COUNT);
            return $scope.getNetworkData();
        };

        $scope.draw = function(data) {
            var container = document.getElementById('myNetwork');

            // networkOptions
            var networkOptions = {
                nodes: {
                    shape: 'box',
                    shapeProperties: {
                        borderRadius: 0
                    },
                    color: {
                        background: '#82ff82'
                    }
                },
                edges: {
                    physics: true,
                    smooth: {
                        type: 'continuous',
                        roundness: 0.35
                    }
                },
                groups: {
                    g1: {
                        color: {
                            background: '#ffdc53'
                        }
                    },
                    g2: {
                        color: {
                            background: '#ff635e'
                        }
                    }
                },
                configure: {
                    enabled: false
                },
                layout:{
                    hierarchical: {
                        enabled: true,
                        direction: 'LR',
                        direction: 'LR',
                        sortMethod: 'directed'
                    }
                },
                manipulation: {
                    addNode: function (data, callback) {
                        console.info(data, $scope);
                        console.info($scope);

                        $scope.editType = EDIT_TYPE[0];

                        $scope.modalTitle = '增加节点';
                        if ($scope.editNode == null) {
                            $scope.editNode = {};
                        }
                        $scope.editNode.id = data.id;
                        $scope.editNode.label = data.label;
                        $scope.editCallback = callback;
                        // $scope.$digest();
                        $scope.$apply();

                        $('#myModal').modal();
                    },
                    editNode: function (data, callback) {

                        $scope.editType = EDIT_TYPE[1];
                        $scope.modalTitle = '修改节点';
                        if ($scope.editNode == null) {
                            $scope.editNode = {};
                        }
                        $scope.editNode.id = data.id;
                        $scope.editNode.label = data.label;
                        $scope.editCallback = callback;
                        // $scope.$digest();
                        $scope.$apply();

                        $('#myModal').modal();
                    },
                    addEdge: function (data, callback) {
                        if (data.from == data.to) {
                            var r = confirm("你希望这个节点连接自己吗?");
                            if (r == true) {
                                callback(data);
                            }
                        }
                        else {
                            callback(data);
                        }
                    }
                }
            };

            if (!data) {
                data = $scope.createData();
            }

            $scope.networkData = data;

            $scope.network = new vis.Network(container, data, networkOptions);

            // 事件
            $scope.network.on("click", function (params) {
                if (params.nodes.length === 0) {
                    return;
                }
                var node = $scope.network.body.data.nodes.get(params.nodes[0]);
                if (node) {
                    alert('点击了：' + JSON.stringify(node));
                }
            });

            if (myDataHelper) {
                myDataHelper.setNetwork($scope.network);
            } else {
                myDataHelper = new DataHelper($scope.network);
            }
        };

        $scope.getNetworkData = function() {
            // options init
            var options = {};

            // nodes init
            var nodes = new vis.DataSet(options);

            for (var i = 0; i < API_POLOGY_DATA.data.nodes.length; i ++) {
                var nodeItem = API_POLOGY_DATA.data.nodes[i];
                var nodeData = {
                    id: nodeItem.id,
                    label: nodeItem.name
                };

                switch (nodeItem.status) {
                    case 1: {
                        nodeData.group = 'g1';
                        break;
                    }
                    case 2: {
                        nodeData.group = 'g2';
                        break;
                    }
                    default: {

                    }
                }

                nodes.add([nodeData]);
            }

            // edges init
            var edges = new vis.DataSet(options);

            for (var i = 0; i < API_POLOGY_DATA.data.edges.length; i ++) {
                var edgeItem = API_POLOGY_DATA.data.edges[i];
                edges.add([
                    {id: i, from: edgeItem.from, to: edgeItem.to}
                ]);
            }

            return {
                nodes: nodes,
                edges: edges
            };
        };

        $scope.resizeDataView = function() {
            // exportArea.style.height = (1 + exportArea.scrollHeight) + "px";
            var elem = document.getElementById('dataView');
            $timeout(function() {
                $scope.dataViewStyle = {
                    height: (5 + elem.scrollHeight) + "px"
                };
            }, 0);
        };

        $scope.draw();
    }
});