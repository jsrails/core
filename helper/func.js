space('bundle.helper.func', function() {

    var callAtIntervalHelper = {

        _lastTime: {},
        _timeoutId: {},

        refreshTimeout: function(name) {
            this._lastTime[name] = bundle.helper.value.nowTimestamp();
        },

        issetTimeout: function(name) {
            return ! _.isEmpty(this._lastTime[name]);
        },

        refreshCall: function(name, func, interval) {
            clearTimeout(this._timeoutId[name]);
            this._timeoutId[name] = setTimeout(func,interval);
        },

    };

    /**
     * Работа с функциями
     */
    return {

        /**
         * Вызвать метод не чаще, чем указано в интервале.
         *
         * Если интервал указан 1000, то метод будет вызван не чаще,
         * чем 1 раз в 1 секунду.
         * Если метод вызван 2 раза за секунду, то выполнится последний метод,
         * предыдущие методы удалятся
         *
         * @param name имя
         * @param func вызываемая функция
         * @param interval интервал в милисекундах
         * @returns {*}
         */
        callAtInterval: function(name, func, interval) {
            if(! callAtIntervalHelper.issetTimeout(name)) {
                callAtIntervalHelper.refreshCall(name, func, interval);
                callAtIntervalHelper.refreshTimeout(name);
                return false;
            }
            callAtIntervalHelper.refreshTimeout(name);
        },
    };

});