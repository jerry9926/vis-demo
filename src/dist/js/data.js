/**
 * Created by zhijie.huang on 2017/3/16.
 */


var API_TREE_DATA = {
    data: {
        nodes: [
            {
                id: 'a1',
                name: '机房',
                status: 0,
                nodeList: [
                    {
                        id: 1,
                        name: '深圳机房\n10',
                        status: 0
                    },
                    {
                        id: 2,
                        name: '香港屯门\n10',
                        status: 0
                    },
                    {
                        id: 3,
                        name: '北京\n4',
                        status: 2
                    },
                    {
                        id: 4,
                        name: '法兰克福\n5',
                        status: 1
                    }
                ]
            },
            {
                id: 'a2',
                name: 'ucl',
                status: 0,
                nodeList: [
                    {
                        id: 5,
                        name: 'ucl-1\n4',
                        status: 0
                    },
                    {
                        id: 6,
                        name: 'ucl-2\n4',
                        status: 0
                    },
                    {
                        id: 7,
                        name: 'ucl-3\n6',
                        status: 0
                    },
                    {
                        id: 8,
                        name: 'ucl-4\n1',
                        status: 0
                    }
                ]
            },
            {
                id: 9,
                name: 'bss\n2',
                status: 0
            },
            {
                id: 10,
                name: 'mySQL',
                status: 0
            },
            {
                id: 'a3',
                name: 'css',
                status: 0,
                nodeList: [
                    {
                        id: 11,
                        name: 'css-1\n1',
                        status: 0
                    },
                    {
                        id: 12,
                        name: 'css-2\n3',
                        status: 1
                    },
                    {
                        id: 13,
                        name: 'css-3\n2',
                        status: 0
                    }
                ]
            },
            {
                id: 'a4',
                name: 'crm',
                status: 0,
                nodeList: [
                    {
                        id: 14,
                        name: 'crm-1\n1',
                        status: 1
                    },
                    {
                        id: 15,
                        name: 'crm-2\n2',
                        status: 0
                    },
                    {
                        id: 16,
                        name: 'crm-3\n3',
                        status: 0
                    }
                ]
            },
            {
                id: 17,
                name: 'mongodb',
                status: 0
            }
        ]
    }
};

var API_POLOGY_DATA = {
    data: {
        nodes: [
            {
                id: 1,
                name: '深圳机房\n10',
                status: 0
            },
            {
                id: 2,
                name: '香港屯门\n10',
                status: 0
            },
            {
                id: 3,
                name: '北京\n4',
                status: 2
            },
            {
                id: 4,
                name: '法兰克福\n5',
                status: 1
            },
            {
                id: 5,
                name: 'ucl-1\n4',
                status: 0
            },
            {
                id: 6,
                name: 'ucl-2\n4',
                status: 0
            },
            {
                id: 7,
                name: 'ucl-3\n6',
                status: 0
            },
            {
                id: 8,
                name: 'ucl-4\n1',
                status: 0
            },
            {
                id: 9,
                name: 'bss\n2',
                status: 0
            },
            {
                id: 10,
                name: 'mySQL',
                status: 0
            },
            {
                id: 11,
                name: 'css-1\n1',
                status: 0
            },
            {
                id: 12,
                name: 'css-2\n3',
                status: 1
            },
            {
                id: 13,
                name: 'css-3\n2',
                status: 0
            },
            {
                id: 14,
                name: 'crm-1\n1',
                status: 1
            },
            {
                id: 15,
                name: 'crm-2\n2',
                status: 0
            },
            {
                id: 16,
                name: 'crm-3\n3',
                status: 0
            },
            {
                id: 17,
                name: 'mongodb',
                status: 0
            }
        ],
        edges: [
            {from: 1, to: 5},
            {from: 2, to: 5},
            {from: 3, to: 5},
            {from: 4, to: 5},
            {from: 5, to: 9},
            {from: 9, to: 6},
            {from: 9, to: 7},
            {from: 9, to: 8},
            {from: 8, to: 10},
            {from: 12, to: 11},
            {from: 13, to: 11},
            {from: 11, to: 9},
            {from: 14, to: 16},
            {from: 15, to: 16},
            {from: 14, to: 9},
            {from: 16, to: 17}
        ]
    }
};