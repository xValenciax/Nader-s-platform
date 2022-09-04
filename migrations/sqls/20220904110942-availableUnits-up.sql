CREATE TABLE available_units(
    unit_number SMALLINT PRIMARY KEY,
    unit_type SMALLINT NOT NULL,
    release_status BOOLEAN NOT NULL
);