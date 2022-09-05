CREATE TABLE units(
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    unit_name VARCHAR(100) NOT NULL,
    unit_type SMALLINT NOT NULL,
    release_status BOOLEAN NOT NULL
);