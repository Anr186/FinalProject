# FinalProject
Финальный проект на тему "Система рецензирования статей"

Задание: создать платформу для организации прозрачного рецензирования. Платформа позволяет авторам статей отправлять свои статьи на рецензию перед публикацией. Статьи распределяются между рецензентами, которые пишут рецензию на статью. Чтобы стать автором на платформе необходимо пройти регистрацию.

=================== Проект выполнили: =================== Студенты группы ИП-311: Горбачев Кирилл Терентьев Андрей Власова Катерина Коротков Кирилл

=================== Установка и запуск проекта ===================

Создаём ASP.NET Web API проект (без контроллеров, Minimal API)
dotnet new webapi -minimal -o Backend --no-https cd Backend

Создаём React-приложение (без использования create-react-app)
mkdir Frontend cd Frontend npm init -y npm install react react-dom axios

Установите необходимые NuGet-пакеты: dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL dotnet add package Microsoft.EntityFrameworkCore.Design dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer dotnet add package BCrypt.Net-Next dotnet add package Swashbuckle.AspNetCore

=================== Настройка базы данных ===================

Создать базу данных с именем "FinalProject"
Выполните ( в терминале ): CREATE DATABASE reviewplatform WITH OWNER = postgres ENCODING = 'UTF8' CONNECTION LIMIT = -1;
В файле Backend/appsettings.json укажите свои параметры
4.1) Откройте терминал в папке Backend 
4.2) Выполните: dotnet ef migrations add InitialCreate dotnet ef database update
Проверка таблиц: В pgAdmin проверьте, что создались таблицы: Users Articles Reviews 
!!!!!!!!!!!!!!!!!!!!!!!! Если не работают команды !!!!!!!!!!!!!!!!!!!!!!!!
 Выдает ошибку: Не удалось выполнить, поскольку указанная команда или файл не найдены.
Установите глобальные инструменты EF Core Выполните в командной строке: dotnet tool install --global dotnet-ef
Убедитесь, что пакет EF Core Design установлен в проект В папке Backend выполните: dotnet add package Microsoft.EntityFrameworkCore.Design
Проверьте, что в проекте есть все необходимые пакеты Убедитесь, что у вас установлены: dotnet add package Microsoft.EntityFrameworkCore dotnet add package Microsoft.EntityFrameworkCore.Tools dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
Попробуйте снова выполнить миграции