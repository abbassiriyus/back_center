CREATE TABLE "course" (
    "courseid" SERIAL PRIMARY KEY,
    "course_title_ru" TEXT NOT NULL,
    "course_title_uz" TEXT NOT NULL,
    "course_price" TEXT NOT NULL,
    "course_img" TEXT NOT NULL,
    "course_all" TEXT NOT NULL,
    "cartegoryid" integer NOT NULL,
    "course_time" TEXT NOT NULL,
    "prosent" TEXT NOT NULL,
    "course_teacherid" integer NOT NULL,
    "syscreatedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
    );
   
 CREATE TABLE "category" (
    "categoryid" SERIAL PRIMARY KEY,
    "category_title_uz" TEXT NOT NULL,
    "category_title_ru" TEXT NOT NULL,
    "category_img" TEXT NOT NULL,
    "syscreatedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
    );

CREATE TABLE "teacher" (
    "teacherid" SERIAL PRIMARY KEY,
    "teacher_fullname_ru" TEXT NOT NULL,
    "teacher_fullname_uz" TEXT NOT NULL,
    "prosent" TEXT NOT NULL,
    "teacher_img" TEXT NOT NULL,
    "teacher_all" TEXT NOT NULL,
    "teacher_time" TEXT NOT NULL,
    "syscreatedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
    ); 

CREATE TABLE "users" (
    "userid" SERIAL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "user_img" TEXT NOT NULL,
    "user_all" TEXT NOT NULL,
    "user_time" TEXT NOT NULL,
    "syscreatedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
); 
