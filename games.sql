create table games(
   id integer not null auto_increment primary key,
   name varchar(40),
   players integer,
   studio varchar(30)
);

create table date (
   id  integer,
   year integer,
   month integer,
   day integer
);

insert into games
values ( 1, 'World of Warcraft', 1, ' Blizzard');
insert into games
value ( 2, 'Ghosts of Tsushima', 1, ' Sucker Punch');
insert into games
value( 3, 'It Takes Two', 2, ' Hazelight');

insert into date values ( 4, 2004, 11, 23);
insert into date values ( 5, 2020, 6, 17);
insert into date values ( 6, 2021, 3, 26);


