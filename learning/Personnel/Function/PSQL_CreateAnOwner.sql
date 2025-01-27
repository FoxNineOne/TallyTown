--SELECT LOWER(SUBSTRING(REPLACE(gen_random_uuid()::text, '-', ''), 1, 16)) as ID;
DO $$
DECLARE
    incomingUserId character varying;   -- Declare incomingUserId
    incomingPersonId character varying; -- Declare incomingPersonId
    incomingUserName character varying; -- Declare incomingUserName
    incomingForename character varying; -- Declare incomingForename
    incomingSurname character varying; -- Declare incomingSurname
    incomingDOB date; -- Declare DateOfBirth
    incomingRole character varying; -- Declare Role
    incomingRoleId character varying; -- Declare RoleId
BEGIN
    -- Set the variables
    incomingUserId := LOWER(SUBSTRING(REPLACE(gen_random_uuid()::text, '-', ''), 1, 16));  
    incomingPersonId := LOWER(SUBSTRING(REPLACE(gen_random_uuid()::text, '-', ''), 1, 16));
    incomingUserName := 'Tommy.Vercetti@OceanViewHotel.vc';
    incomingForename := 'Tommy';
    incomingSurname := 'Vercetti';
    incomingDOB := '1960-01-03'; -- Use the DATE type for date values
    incomingRole := 'owner';
    
    -- Set incomingRoleId by selecting from the LK_Roles table
SELECT "RoleId" INTO incomingRoleId
    FROM public."LK_Roles"
    WHERE LOWER("RoleName") = incomingRole;

    -- Check if the username already exists
    IF NOT EXISTS (SELECT 1 FROM public."Users" WHERE "Username" = incomingUserName) THEN
        -- Insert the new record into Users table
        INSERT INTO public."Users" ("UserId", "PersonId", "Username", "Active", "RoleId")
        VALUES (incomingUserId, incomingPersonId, incomingUserName, TRUE, incomingRoleId);
    
        -- Insert the new record into Personnel table
        INSERT INTO public."Personnel" ("PersonId", "ContactEmail", "Forename", "Surname", "DateOfBirth")
        VALUES (incomingPersonId, incomingUserName, incomingForename, incomingSurname, incomingDOB);
        
        -- Output a success message
        RAISE NOTICE 'User inserted with User ID: %, Person ID: %, Username: %', incomingUserId, incomingPersonId, incomingUserName;
    ELSE
        -- Output a message that the username already exists
        RAISE NOTICE 'Username "%" already exists.', incomingUserName;
    END IF;

END $$;
