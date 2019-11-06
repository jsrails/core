module.exports = {
    baseUrl: ".",
    paths: {
        jrails: 'node_modules/jrails/src',
        DirectorRouter: 'node_modules/director/build/director.min',
        lodash: 'node_modules/lodash/lodash.min',
        jquery: 'node_modules/jquery/dist/jquery.min',
        text: 'node_modules/text/text',
        twitterBootstrap: 'node_modules/bootstrap/dist/js/bootstrap.min',
        //redux: 'node_modules/redux/dist/redux.min',
        vue: 'node_modules/vue/dist/vue.min',
        //toastr: 'node_modules/toastr/build/toastr.min',
        toastr: 'node_modules/jrails/src/notify/toastrMock',
        jqueryUi: 'node_modules/jquery-ui/jquery-ui.min',
    },
    shim: {
        'DirectorRouter': {
            exports: 'Router'
        },
        'lodash': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        },
        "jqueryUi": {
            exports: "$",
            deps: ['jquery']
        },
        "twitterBootstrap": {
            deps: ["jquery"]
        },
        'toastr': {
            exports: 'toastr',
            deps: ["jquery"]
        },
        'vue': {
            exports: 'Vue'
        },
    }
};
