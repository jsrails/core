/**
 * Работа с пространствами имен
 *
 * Можно объявлять, получать пространства.
 * Пространства имен нужны для иерархичного расположения кода.
 * Есть бандл, это самодостаточный модуль, который содержит в себе все неоходимое для своей работы.
 * В бандле могут распологаться хэлперы, сервисы, хранилища, виджеты, драйвера...
 * В плоском списке содержать разные типы классов неудобно,
 * но можно легко выстроить иерархию, например:
 * - user
 *     - service
 *         - authService
 *         - registrationService
 *         - personService
 *     - helper
 *         - loginHelper
 *         - tokenHelper
 *     - store
 *         - identityStore
 *         - personStore
 *     - widget
 *         - avatarWidget
 * - notify
 *     - service
 *         - notifyService
 *     - driver
 *         - sms
 *             - smscDriver
 *             - a1Driver
 *             - beelineDriver
 *         - notify
 *             - pushDriver
 *             - socketDriver
 *             - firebaseDriver
 *
 * `user` и `notify` - это бандлы.
 *
 * notify.driver.sms.beelineDriver - это полное имя класса драйвера для отправки СМС через Beeline
 * 
 * Аналог "use" из PHP:
 *     var ArrayHelper = bundle.helper.array;
 *
 * Получить любой класс можно так:
 *     namespace.get('bundle.helper.url').setUrl('?post=123');
 * Для прозрачности кода, лучше обращаться к классам явно:
 *     bundle.helper.url.setUrl('?post=123');
 * Составные части:
 *     bundle.helper.url - полное имя класса
 *     bundle.helper - пространство имен
 *     setUrl - метод класса
 */

(function() {

    var registry = {
        isDomLoaded: false,
        classList: {},
        onDomLoaded: function (func) {

            var callback = function () {
                var classDefinition = func();
                if(_.isObject(classDefinition) && _.isFunction(classDefinition._onLoad)) {
                    classDefinition._onLoad();
                }
            };

            if(this.isDomLoaded) {
                callback();
            } else {
                document.addEventListener('DOMContentLoaded', callback);
            }
        },
        onWindowLoad: function() {
            registry.isDomLoaded = true;
            //console.log(registry.classList);
        },
        use: function (className) {
            var func = _.get(registry.classList, className);
            if(_.isFunction(func)) {
                func = func();
                _.set(registry.classList, className, func);
            }
            return func;
        },
        define: function (funcOrClassName, func) {
            if(_.isFunction(funcOrClassName)) {
                registry.onDomLoaded(funcOrClassName);
            } else if(_.isString(funcOrClassName) && _.isFunction(func)) {
                registry.onDomLoaded(function() {
                    //var args = [];
                    //var classDefinition = func.apply({}, args);
                    var classDefinition = func();
                    //classList[funcOrClassName] = classDefinition;
                    _.set(window, funcOrClassName, classDefinition);
                    _.set(registry.classList, funcOrClassName, classDefinition);
                });

            }

            //registry.classList[funcOrClassName] = func;
        },
    };

    window.addEventListener('load', registry.onWindowLoad);
    window.use = registry.use;
    window.space = registry.define;

})();


