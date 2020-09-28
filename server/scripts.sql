CREATE DATABASE my_erp;

\c my_erp;

--todo
CREATE TABLE erp_user(
  userid BIGSERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(32) NOT NULL,
  last_name VARCHAR(32) NOT NULL,
  role_type VARCHAR(32) NOT NULL,
  email VARCHAR(32) NOT NULL,
  password VARCHAR(255) NOT NULL,
  unique(email)
);

CREATE TABLE tokens(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  access_token VARCHAR(500) NOT NULL,
  userid BIGSERIAL NOT NULL,
  FOREIGN KEY(userid) REFERENCES erp_user(userid)
);

CREATE TABLE tasks(
  id BIGSERIAL PRIMARY KEY NOT NULL,
  task_name VARCHAR(50) NOT NULL,
  task_due_date VARCHAR(32) NOT NULL,
  task_description VARCHAR(500) NOT NULL,
  task_priority VARCHAR(32) NOT NULL,
  task_progress VARCHAR(32) NOT NULL,
  password VARCHAR(255) NOT NULL
  --unique(task_name)
);