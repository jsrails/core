space('bundle.domain.baseLocalStorage', function() {

    var localStorageHelper = bundle.helper.localStorage;

    /**
     * Базовый класс для хранилища состояния в Local Storage
     */
    return {

        storageKey: null,

        get: function (defaultValue) {
            return localStorageHelper.get(this.storageKey, defaultValue);
        },

        set: function (data) {
            localStorageHelper.set(this.storageKey, data);
        },

        remove: function () {
            localStorageHelper.remove(this.storageKey);
        },

    };

});