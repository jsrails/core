({
    //name: "jrails/index",
    out: "../../../src/assets/script/vendor.js",
    baseUrl: "../../..",
    writeBuildTxt: true,
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
    include: [
        'node_modules/requirejs/require',
        'DirectorRouter',
        'lodash',
        'jquery',
        'twitterBootstrap',
        'vue',
        'text',
        'jqueryUi',
        'jrails/spa/router',
        'jrails/helper/php',
        'jrails/event/eventService',
        'jrails/helper/class',
        'jrails/helper/localStorage',
        'jrails/domain/baseLocalStorage',
        'jrails/kernel/container',
        'jrails/rest/client',
        'jrails/notify/notifyTypeEnum',
        'jrails/notify/notifyService',
        'jrails/notify/driver/toastrDriver',
        'jrails/bootstrap/modal/modalService',
        'jrails/vue/vm',
        'jrails/spa/layer',
        'jrails/spa/query',
        'jrails/spa/controllerFactory',
    ],
    //cssIn: "path/to/main.css",
    //out: "path/to/css-optimized.css",
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
});
