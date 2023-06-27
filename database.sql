CREATE TABLE "course" (
    "courseid" SERIAL PRIMARY KEY,
    "course_title_ru" TEXT NOT NULL,
    "course_title_uz" TEXT NOT NULL,
    "course_price" TEXT NOT NULL,
    "course_img" TEXT NOT NULL,
    "course_all" TEXT NOT NULL,
    "cartegoryid" integer NOT NULL,
    "course_time" TEXT NOT NULL,
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

CREATE TABLE "teacter" (
    "teacterid" SERIAL PRIMARY KEY,
    "teacter_firs_ru" TEXT NOT NULL,
    "teacter_firs_uz" TEXT NOT NULL,
    "teacter_price" TEXT NOT NULL,
    "teacter_img" TEXT NOT NULL,
    "teacter_all" TEXT NOT NULL,
    "cartegoryid" integer NOT NULL,
    "teacter_time" TEXT NOT NULL,
    "teacter_teacherid" integer NOT NULL,
    "syscreatedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
    ); 