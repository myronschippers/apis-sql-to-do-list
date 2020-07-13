-- createdb weekend-to-do-list

CREATE TABLE "tasks" (
	"id" serial primary key,
	"description" varchar(100) not null,
	"complete" boolean not null
);

INSERT INTO "tasks" ("description", "complete") 
VALUES ('pick up milk', FALSE),
('get gas', TRUE);