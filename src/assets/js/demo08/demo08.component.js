/**
 * Created by zhijie.huang on 2017/3/14.
 */

angular.module('demo08App').component('appView', {
    templateUrl: 'assets/js/demo08/demo08.template.html',
    controller: function AppViewController($timeout, $scope) {
        var NODE_COUNT = 5;
        var EDIT_TYPE = ['NEW', 'EDIT'];

        $scope.modalTitle = '';
        $scope.network = null;
        $scope.editCallback = null;
        $scope.editNode = null;
        $scope.networkDataString = '';
        $scope.editType = EDIT_TYPE[0];

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
            var data = myDataHelper.exportNetwork($scope.network.body.data);
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
            return getScaleFreeNetwork(NODE_COUNT);
        };

        $scope.draw = function(data) {
            var container = document.getElementById('myNetwork');
            var networkOptions = {
                nodes: {
                    borderWidth: 2,
                    color: {
                        border: '#1a95c8'
                    }
                },
                edges: {
                    width: 1,
                    color: {
                        color: '#848484'
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

            $scope.network = new vis.Network(container, data, networkOptions);

            if (myDataHelper) {
                myDataHelper.setNetwork($scope.network);
            } else {
                myDataHelper = new DataHelper($scope.network);
            }
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