DROP DATABASE IF EXISTS fishify_development;

CREATE DATABASE fishify_development;

-- USE userDB;

-- CREATE TABLE images(
--     id INT NOT NULL AUTO_INCREMENT,
--     url VARCHAR (50) NOT NULL
-- );

-- CREATE TABLE user(
--     id INT NOT NULL AUTO_INCREMENT,
--     name VARCHAR (30) NOT NULL,
--     password VARCHAR (30) NOT NULL
-- );

CREATE TABLE catch(
    id INT NOT NULL AUTO_INCREMENT primary key NOT,
    location VARCHAR (30) NOT NULL,
    weight VARCHAR (30) NOT NULL,
    length INTEGER (30) NOT NULL,
    kind_of_bait VARCHAR (30) NOT NULL,
    time INTEGER (30) NOT NULL,
    date INTEGER (30) NOT NULL,
    type_of_fish VARCHAR (30) NOT NULL,
    weather_temp INTEGER (30) NOT NULL,
    weather_condition VARCHAR (30) NOT NULL
);

INSERT INTO catch (location, weight, length, kind_of_bait, time, date, type_of_fish, weather_temp, weather_condition)
VALUES("Lake Superior", "10lbs", 20, "live", 830, 02052020, "bass", 82, "sunny" );

INSERT INTO catch (location, weight, length, kind_of_bait, time, date, type_of_fish, weather_temp, weather_condition)
VALUES("Lake Tomah", "15lbs", 14, "live", 1152, 02122020, "654", 75, "sunny" );

INSERT INTO catch (location, weight, length, kind_of_bait, time, date, type_of_fish, weather_temp, weather_condition)
VALUES("Lake 654", "8lbs", 5, "live", 1530, 06052020, "ghjghj", 60, "sunny" );

INSERT INTO catch (location, weight, length, kind_of_bait, time, date, type_of_fish, weather_temp, weather_condition)
VALUES("Lake dkdfh", "11lbs", 6, "live", 1806, 09052020, "bafghjfjss", 93, "sunny" );






