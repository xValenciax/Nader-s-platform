ALTER TABLE questions
    ADD CONSTRAINT fk_unit_id FOREIGN KEY (unit_id) REFERENCES units (id);