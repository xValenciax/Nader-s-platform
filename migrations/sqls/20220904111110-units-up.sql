CREATE TABLE units(
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    unit_number_FK SMALLINT REFERENCES available_units(unit_number),
    question TEXT,
    answer VARCHAR(100),
    hint TEXT
);