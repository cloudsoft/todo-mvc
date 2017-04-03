CREATE DATABASE todo;
USE todo;
GRANT USAGE ON *.* TO 'brooklyn'@'%'
IDENTIFIED BY 'br00k11n';
GRANT USAGE ON *.* TO 'brooklyn'@'localhost'
IDENTIFIED BY 'br00k11n';
GRANT ALL PRIVILEGES ON todo.* TO 'brooklyn'@'%';
FLUSH PRIVILEGES;
CREATE TABLE todo_list (
  id        INT         NOT NULL AUTO_INCREMENT,
  title     VARCHAR(30) NOT NULL,
  status    VARCHAR(30) NOT NULL,
  completed BOOLEAN     NOT NULL DEFAULT 0,
  PRIMARY KEY (ID)
);


INSERT INTO todo_list VALUES (default, 'Isaac Asimov', '', 0);
