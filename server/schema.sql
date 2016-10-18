CREATE DATABASE rex;

USE rex;

CREATE TABLE users (
  `id`       INT(11)     NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(32) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  PRIMARY KEY (id)
);

/* which mysql
   brew install mysql
   mysql.server stop
   mysql.server start
   mysqladmin -u root password
   mysqladmin -u root -p
   mysql -u root -p
   Execute with mysql -u root < server/schema.sql
*/

