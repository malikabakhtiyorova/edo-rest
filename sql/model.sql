create extension "uuid-ossp";
create extension "pgcrypto";
create type gender as enum('m', 'f');
create type role as enum('s', 'm', 'c', 'e');
-- s = superuser
-- m = manager
-- c = council
-- e = executor
-- USERS
create table users (
  user_id serial not null primary key,
  server_id int not null,
  user_username varchar(40) not null,
  user_password varchar(60) not null,
  user_gender gender not null,
  user_created_at timestamptz default current_timestamp
);
create unique index users_uniq_idx on users (lower(user_username));
-- BRANCHES
create table branches (
  branch_id serial not null primary key,
  branch_name varchar(64) not null,
  branch_is_main boolean default false
);
-- DEPARTMENTS
create table departments (
  department_id serial not null primary key,
  department_name varchar(128) not null,
  branch_id int not null references branches(branch_id)
);
-- STAFF
create table staff (
  staff_id serial not null primary key,
  staff_role role not null,
  server_id int not null references users(server_id),
  department_id int not null references departments(department_id)
);
-- CORREPONDENTS
create table correspondents (
  correspondent_id serial not null primary key,
  correspondent_name varchar(64) not null,
  correspondent_date date
);
create unique index correspondent_uniq_id on correspondents(lower(correspondent_name));
-- DOCUMENTS
create table documents (
  document_id serial not null primary key,
  document_created_at timestamptz default current_timestamp,
  server_id int not null references users (server_id),
  correspondent_id int not null references correspondents(correspondent_id)
);
-- FILES
create table files (
  file_id serial not null primary key,
  file_name varchar(36) not null,
  file_extension varchar(6) not null,
  document_id int not null references documents(document_id)
);
-- CIRCLE
create table circle (
  cirlce_id serial not null primary key,
  cirlce_accept timestamptz default null,
  circle_created_at timestamptz default current_timestamp,
  document_id int not null references documents (document_id),
  receiver_id int not null references users (server_id),
  sender_id int not null references users (server_id)
);