
   CREATE TABLE "course" (
    "course_id" SERIAL PRIMARY KEY,
    "course_title_ru" TEXT NOT NULL,
    "course_title_uz" TEXT NOT NULL,
    "course_price" TEXT NOT NULL,
    "course_img" TEXT NOT NULL,
    "course_all" TEXT NOT NULL,
    "cartegory_id" integer NOT NULL,
    "course_time" TEXT NOT NULL,
    "course_teacherid" integer NOT NULL,
    "create_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
    foreign key ("cartegory_id") references "category"("category_id")
    );

 CREATE TABLE "category" (
    "category_id" SERIAL PRIMARY KEY,
    "category_title_uz" TEXT NOT NULL,
    "category_title_ru" TEXT NOT NULL,
    "category_img" TEXT NOT NULL,
    "create_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
    );



CREATE TABLE "users" (
    "user_id" SERIAL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_img" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "create_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT 
    current_timestamp); 

 CREATE TABLE "group" (
    "group_id" SERIAL PRIMARY KEY,
    "group_name"TEXT NOT NULL,
    "course_id" integer NOT NULL,
    "create_time" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp,
        foreign key ("course_id") references "course"("course_id")
    );

CREATE TABLE "group_links" (
    "group_links_id"SERIAL PRIMARY KEY,
    "group_id" integer NOT NULL,
    "user_id" integer NOT NULL,
            foreign key ("group_id") references "group"("group_id"),
            foreign key ("user_id") references "users"("user_id")
    );
CREATE TABLE "scheldue_day" (
    "scheldue_day_id"SERIAL PRIMARY KEY,
    "group_id" integer NOT NULL,
    "user_id" integer NOT NULL,
    "data"date not null,
    "start_time"TEXT NOT NULL,
    "finish_time"TEXT NOT NULL,
            foreign key ("group_id") references "group"("group_id"),
            foreign key ("user_id") references "users"("user_id")
    );