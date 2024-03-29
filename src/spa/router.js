define(['DirectorRouter'], function(DirectorRouter) {

    var store = {
        routes: {},
        routerInstance: null,
    };

    return {

        go: function (uri) {
            uri = _.defaultTo(uri, '');
            location.hash = '#' + uri;
        },

        goBack: function () {
            history.back();
        },

        goHome: function () {
            this.go();
        },

        addRoute: function (route, callback) {
            store.routes[route] = callback;
        },

        init: function () {
            store.routerInstance = DirectorRouter(store.routes);
            store.routerInstance.init();
        },

    };

});