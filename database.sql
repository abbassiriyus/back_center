CREATE TABLE "course" (
    "courseid" SERIAL PRIMARY KEY,
    "course_title" TEXT NOT NULL,
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
    "category_title" TEXT NOT NULL,
    "category_img" TEXT NOT NULL,
    "syscreatedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
    );

CREATE TABLE "teacter" (
    "teacterid" SERIAL PRIMARY KEY,
    "teacter_firs" TEXT NOT NULL,
    "teacter_price" TEXT NOT NULL,
    "teacter_img" TEXT NOT NULL,
    "teacter_all" TEXT NOT NULL,
    "cartegoryid" integer NOT NULL,
    "teacter_time" TEXT NOT NULL,
    "teacter_teacherid" integer NOT NULL,
    "syscreatedatutc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT current_timestamp
    ); 