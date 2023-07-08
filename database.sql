
CREATE TABLE "position" (
    "position_id" serial primary key,
    "title" TEXT NOT NULL
);

CREATE TABLE "address" (
    "address_id" serial primary key,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL
);


CREATE TABLE "users" (
    "user_id" serial primary key,
    "user_password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "surName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "databirth" TEXT NOT NULL,
    "dataRegirter" TEXT NOT NULL,
    "address_id" integer not null,
    "position_id" integer not null,
    "username" TEXT NOT NULL,
    "user_img" TEXT,
    "create_time" timestamp default current_timestamp not null,
    foreign key ("address_id") references "address"("address_id"),
    foreign key ("position_id") references "position"("position_id")
);

CREATE TABLE "teacher" (
    "teacher_id" serial primary key,
    "user_id" integer not null,
    "status" TEXT NOT NULL,
    foreign key ("user_id") references "users"("user_id")
);

CREATE TABLE "student" (
    "student_id" serial primary key,
    "user_id" integer not null,
    "status" TEXT NOT NULL,
    foreign key ("user_id") references "users"("user_id")
);

CREATE TABLE "category" (
    "category_id" serial primary key,
    "Name" TEXT NOT NULL
);

CREATE TABLE "course" (
    "course_id" serial primary key,
    "Name" TEXT NOT NULL,
    "category_id" integer not null,
    "Title" TEXT NOT NULL,
    "Price" TEXT NOT NULL,
    "Image" TEXT NOT NULL,
    "Time" TEXT NOT NULL,
    "Lesson_lenght" TEXT NOT NULL,
    "create_time" timestamp default current_timestamp not null,
    foreign key ("category_id") references "category"("category_id")
);

CREATE TABLE "lesson" (
    "lesson_id" serial primary key,
    "Theme" TEXT NOT NULL,
    "course_id" integer not null,
    foreign key ("course_id") references "course"("course_id")
);

CREATE TABLE "video" (
    "video_id" serial primary key,
    "lesson_id" integer not null,
    "video" TEXT NOT NULL,
foreign key ("lesson_id") references "lesson"("lesson_id")
);

CREATE TABLE "homework" (
    "homework_id" serial primary key,
    "video_id" integer not null,
    "lesson_id" integer not null,
foreign key ("lesson_id") references "lesson"("lesson_id"),
foreign key ("video_id") references "video"("video_id")
);

CREATE TABLE "test" (
    "test_id" serial primary key,
    "Theme" TEXT NOT NULL,
    "course_id" integer not null,
foreign key ("course_id") references "course"("course_id")
);

CREATE TABLE "question" (
  "question_id"  serial primary key,
  "question" TEXT NOT NULL,
  "Answer"TEXT NOT NULL,
  "Ball" TEXT NOT NULL,
  "test_id" integer not null,
foreign key ("test_id") references "test"("test_id")
);

CREATE TABLE "chose_course" (
  "chose_course_id" serial primary key,
  "course_id" integer not null,
  "teacher_id"integer not null,
  "student_id" integer not null,
    "status" TEXT NOT NULL,
foreign key ("course_id") references "course"("course_id"),
foreign key ("teacher_id") references "teacher"("teacher_id"),
foreign key ("student_id") references "student"("student_id")
);
CREATE TABLE "chose_lesson" (
  "chose_lesson_id" serial primary key,
  "lesson_id" integer not null,
  "Theme" TEXT NOT NULL,
  "course_id" integer not null,
  "status" TEXT NOT NULL,
  foreign key ("lesson_id") references "lesson"("lesson_id"),
  foreign key ("course_id") references "course"("course_id")
);


CREATE TABLE "video_chose" (
  "video_chose_id"  serial primary key,
  "video_id" integer not null,
  "lesson_id" integer not null,
  "chose_lesson_id" integer not null,
  "status" TEXT NOT NULL,
    foreign key ("chose_lesson_id") references "chose_lesson"("chose_lesson_id"),
    foreign key ("lesson_id") references "lesson"("lesson_id"),
    foreign key ("video_id") references "video"("video_id")
);

CREATE TABLE "homework_chose" (
  "homework_chose_id" serial primary key,
  "video_chose_id" integer not null,
  "video_id" integer not null,
  "homework_id" integer not null,
  "status" TEXT NOT NULL,
      foreign key ("video_chose_id") references "chose_lesson"("chose_lesson_id"),
    foreign key ("homework_id") references "homework"("homework_id"),
    foreign key ("video_id") references "video"("video_id")
);