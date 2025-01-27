CREATE OR REPLACE FUNCTION fn_insert_personnel(
    givenName VARCHAR,
    familyName VARCHAR,
    emailAddress VARCHAR,
    dateOfBirth DATE DEFAULT NULL  -- Optional parameter
) RETURNS VOID AS $$
DECLARE
    existing_count INT;
    personId TEXT;
BEGIN
    -- Use an alias for the Personnel table
    SELECT COUNT(*) INTO existing_count
    FROM Personnel AS P
    WHERE P.emailAddress = emailAddress;
    
    IF existing_count > 0 THEN
        RAISE EXCEPTION 'Error 01 - email exists';
    END IF;

    -- Generate a 20-character ID (UUID example)
    personId := LOWER(SUBSTRING(REPLACE(uuid_generate_v4()::text, '-', '') FROM 1 FOR 20));

    -- Insert the new record into the Personnel table
    INSERT INTO Personnel (person_id, GivenName, FamilyName, DateOfBirth, EmailAddress)
    VALUES (personId, givenName, familyName, dateOfBirth, emailAddress);
END $$ LANGUAGE plpgsql;
