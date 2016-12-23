# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table question (
  id                            bigserial not null,
  statement                     varchar(255),
  options                       json,
  correct_option_index          integer,
  constraint pk_question primary key (id)
);

create table question_set (
  id                            bigserial not null,
  name                          varchar(255),
  constraint pk_question_set primary key (id)
);

create table question_set_question (
  question_set_id               bigint not null,
  question_id                   bigint not null,
  constraint pk_question_set_question primary key (question_set_id,question_id)
);

alter table question_set_question add constraint fk_question_set_question_question_set foreign key (question_set_id) references question_set (id) on delete restrict on update restrict;
create index ix_question_set_question_question_set on question_set_question (question_set_id);

alter table question_set_question add constraint fk_question_set_question_question foreign key (question_id) references question (id) on delete restrict on update restrict;
create index ix_question_set_question_question on question_set_question (question_id);


# --- !Downs

alter table if exists question_set_question drop constraint if exists fk_question_set_question_question_set;
drop index if exists ix_question_set_question_question_set;

alter table if exists question_set_question drop constraint if exists fk_question_set_question_question;
drop index if exists ix_question_set_question_question;

drop table if exists question cascade;

drop table if exists question_set cascade;

drop table if exists question_set_question cascade;

