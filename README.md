Select2 Stylus
=======

Все мы используем select2. Наверно лучший плагин для замены стандартному select.

К сожелению он очень не удобно стилизуется под нужды проекта. Мне это в конечном счете надоело и я сделал мини-проект для быстрой стилизации. На нее теперь уходит 3 минуты. 

Итак, что это:
--------------

* CSS Select2 разбит на части
* Вынесены все основные моменты стилизации в отдельный файл
* Убрана подержка спрайтов и добавлены изображения в base64

Пока не сделано:
----------------

* Поддержка rtl
* Градиенты для IE8 (filter:)
* Спрайты
* Подержка Retina

Планы: 
------
* Перевод единиц в REM c отдельным файлом для IE8
* Отдельный css для data:uri
* Генерация спрайтов
* Inline-svg
* Поддержка Retina
* Поддержка тем
* Тема для bootstrap
* Разделение настроек основные и полные.
* Тюнинг в соотвествие с принципами Stylus =) 

Usage
-----

1. Копируем папку assets/ui/select2/select2-stylus к себе в проект, делаем импорт core.styl, работаем.

2. Для отладки и генерации css.

    * Устанавливаем npm install
    * Запускаем gulp (тестовый сайт)
    * Работаем с переменными в assets/ui/select2/select2-stylus/setting.styl
    * Получаем результат в build

Copyright and license
---------------------

Select2
https://github.com/ivaynberg/select2

Copyright 2012 Igor Vaynberg

This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
General Public License version 2 (the "GPL License"). You may choose either license to govern your
use of this software only upon the condition that you accept all of the terms of either the Apache
License or the GPL License.

You may obtain a copy of the Apache License and the GPL License in the LICENSE file, or at:

http://www.apache.org/licenses/LICENSE-2.0
http://www.gnu.org/licenses/gpl-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the Apache License
or the GPL License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
either express or implied. See the Apache License and the GPL License for the specific language governing
permissions and limitations under the Apache License and the GPL License.