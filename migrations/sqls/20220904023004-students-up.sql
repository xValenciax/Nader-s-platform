CREATE TABLE students(
    stud_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    password VARCHAR(60)
);