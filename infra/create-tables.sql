create table activity
(
    id bigserial not null
        constraint activity_pk
            primary key,
    actualstart timestamp not null,
    actualend timestamp not null,
    pjo_tipodeatividade bigint not null,
    subject text,
    pjo_empreendimentoid bigint,
    pjo_blocoid bigint,
    pjo_unidadeid bigint,
    created_at timestamp,
    updated_at timestamp
);

alter table activity owner to services;

create unique index activity_id_uindex
    on activity (id);
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

alter table occurrence owner to services;

create unique index occurrence_id_uindex
    on occurrence (id);
