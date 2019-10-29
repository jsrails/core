# Создание страницы

Создаем файл страницы `index.html`:

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <title>Моя первая страница</title>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta charset="UTF-8">

    <!--Внешние зависимости-->
    <script src="node_modules/lodash/lodash.min.js"></script>

    <!--Ядро рельсов-->
    <script src="node_modules/jrails/kernel/namespace.js"></script>
    <script src="node_modules/jrails/kernel/container.js"></script>
    <script src="node_modules/jrails/kernel/bootstrap.js"></script>
    <script src="node_modules/jrails/kernel/func.js"></script>
    <script src="node_modules/jrails/helper/ajax.js"></script>
    <script src="node_modules/jrails/helper/array.js"></script>
    <script src="node_modules/jrails/helper/class.js"></script>
    <script src="node_modules/jrails/helper/func.js"></script>
    <script src="node_modules/jrails/helper/jquery.js"></script>
    <script src="node_modules/jrails/helper/php.js"></script>
    <script src="node_modules/jrails/helper/url.js"></script>
    <script src="node_modules/jrails/helper/value.js"></script>
    <script src="node_modules/jrails/event/eventService.js"></script>

    <!--Приложение-->
    <script src="src/app/bootstrap.js"></script>
    <script src="src/app/run.js"></script>

</head>
<body></body>
</html>
```

Создаем загрузчик приложения:

```javascript
/** src/app/bootstrap.js */

space('app.bootstrap', function() {

    /**
     * Ядро приложения
     *
     * Запускается 1 раз при запуске приложения
     */
    return {

        /**
         * Запуск ядра приложения
         * @param params
         */
        run: function (params) {
            // импортируем наш первый модуль
            var exampleModule = use('example.exampleModule');
            // запускаем его
            exampleModule.run();
        }
    };

});
```

Создаем точку входа:

```javascript
/** src/app/run.js */

space(function() {

    /** Запуск приложения */
    var appBootstrap = use('app.bootstrap');
    appBootstrap.run();

});
```

Создаем модуль:

```javascript
/** src/example/exampleModule.js */

space('example.exampleModule', function() {

    /**
     * Модуль для примера
     */
    return {
        run: function () {
            var element = document.createElement('div');
            element.innerHTML = 'Hello World!!!';
            var head = document.getElementsByTagName('body')[0];
            head.appendChild(element);
        }
    };

});
```

Откройте страницу, если увдели надпись "Hello World!!!", значит все получилось,
если нет надписи, то смотрите консоль для выяснения причины.

Примитивное приложение готово!
