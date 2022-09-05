CREATE TABLE questions(
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    question TEXT,
    answer VARCHAR(100),
    hint TEXT,
    unit_id BIGINT
);