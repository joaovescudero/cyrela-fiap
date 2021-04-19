#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
    CREATE USER services;
    CREATE DATABASE cyrela;
    GRANT ALL PRIVILEGES ON DATABASE cyrela TO services;
    ALTER USER services WITH PASSWORD 'password';
EOSQL

psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
  create table activity
(
	id bigserial not null,
	actualstart timestamp not null,
	actualend timestamp not null,
	pjo_tipodeatividade timestamp not null,
	subject text,
	pjo_empreendimentoid bigint,
	pjo_blocoid bigint,
	pjo_unidadeid bigint,
	created_at timestamp,
	updated_at timestamp
);

alter table activity owner to postgres;

create unique index activity_id_uindex
	on activity (id);
EOSQL

psql -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
  create table occurrence
(
	id bigserial not null
		constraint occurrence_pk
			primary key,
	ticketnumber text,
	pjo_clientedaunidade bigint,
	pjo_empreendimentoid bigint,
	pjo_bloco text,
	pjo_unidade bigint,
	pjo_bandeira text,
	description text,
	updated_at timestamp,
	created_at timestamp
);

alter table occurrence owner to postgres;

create unique index occurrence_id_uindex
	on occurrence (id);
EOSQL
