define(function() {



    /**
     *
     */
    var spaModule = {

        request: null,

        loadTemplate: function (request, callback) {
            var templateUrl = spaHelper.getTemplateUrl(request);
            $.ajax({
                url: templateUrl,
                success: function (data) {

                    callback();
                    if (spaHelper.isTemplate(data)) {
                        bundle.spa.layer.add(data, request);
                    }
                }
            });
        },

        loadDepends: function (request, controller) {
            if(_.isEmpty(controller.depends)) {
                controller.onLoadDepends(request);
                return;
            }
            var cbCount = 0;
            var cb = function () {
                cbCount++;
                if(cbCount === controller.depends.length) {
                    //d(cbCount);
                    controller.onLoadDepends(request);
                    controller.run(request);
                }
            };
            for(var k in controller.depends) {
                var dependClass = controller.depends[k];
                bundle.kernel.loader.requireClass(dependClass, cb);
            }
        },

        run: function (requestSource) {
            var request = _.clone(requestSource);
            this.request = request;
            spaHelper.prepareRequest(request);
            var callback = function () {
                var className = window.spaHelper.getClassName(request, 'controller');
                bundle.spa.layer.show(request);
                var cb = function () {
                    var controller = use(className);
                    if( ! _.isEmpty(controller)) {
                        if(_.isEmpty(controller.isInit)) {
                            controller.isInit = true;
                            spaModule.loadDepends(request, controller);
                        }
                    }
                    spaHelper.registerEventHandlers(request);
                };
                bundle.kernel.loader.requireClass(className, cb);
            };
            this.doRequest(request, callback);
        },

        doRequest: function (request, callback) {
            var isExists = bundle.spa.layer.has(request);
            if (isExists) {
                callback();
            } else {

                this.loadTemplate(request, callback);
            }
        },

    };

    /**
     *
     */
    return {

        wrapperId: 'app',
        wrapperInstance: null,

        getWrapperElement: function () {
            if( ! _.isObject(this.wrapperInstance)) {
                this.wrapperInstance = $('#' + this.wrapperId);
            }
            return this.wrapperInstance;
        },

        getElementId: function (id) {
            if(id) {
                return this.wrapperId + '-' + id;
            } else {
                return this.wrapperId;
            }
        },

        getModuleLayer: function (request) {
            var moduleElementId = this.getElementId(request.controller + '-' + request.action);
            return this.getWrapperElement().find('#' + moduleElementId);
        },

        has: function (request) {
            var layerWrapper = this.getModuleLayer(request);
            return layerWrapper.length;
        },

        show: function (request) {
            this.hideAll();
            var layerWrapper = this.getModuleLayer(request);
            layerWrapper.show();
        },

        add: function (data, request) {
            var moduleElementId = this.getElementId(request.controller + '-' + request.action);
            var layerHtml =
                '<div class="page-layer" id="' + moduleElementId + '">' +
                data +
                '</div>';
            this.getWrapperElement().append(layerHtml);
        },

        add222: function (data, moduleElementId) {
            var layerHtml =
                '<div class="page-layer" id="' + moduleElementId + '" style="display: none">' +
                data +
                '</div>';
            this.getWrapperElement().append(layerHtml);
        },

        hideAll: function () {
            this.getWrapperElement().find('.page-layer').hide();
        },

    };

});

/**/

/*space('bundle.spa.helper', function() {});*/

/*space('bundle.spa.module', function() {



});*/


/*$("a").each(function(index, element) {
            $(element).click(function (event) {
                var el = $(event.target);
                var uri = el.attr('href');
                uri = _.trim(uri, '#/');
                uri = '/#' + uri;
                console.log(uri);
                bundle.helper.url.setUrl(uri);
                return false;
            });
        });*/