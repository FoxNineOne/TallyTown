/*
	Insert a new roles into LK_Roles
*/

DO $$
DECLARE
    newRoleId character varying; -- Declare a variable to hold the generated RoleId
BEGIN
    -- Generate a new RoleId value
    newRoleId := LOWER(SUBSTRING(REPLACE(gen_random_uuid()::text, '-', ''), 1, 16));
    
    -- Insert into the LK_Roles table
    INSERT INTO public."LK_Roles" ("RoleId", "RoleName", "Active")
    VALUES (newRoleId, 'Owner', TRUE);
    
    -- Optionally, output a success message
    RAISE NOTICE 'Inserted RoleId: %, RoleName: "Owner", Active: TRUE', newRoleId;
END $$;

/*
Doesn't contain a check to see if things exist.

Not sure where else to add this, but main component is OWNER or SHOPPER
These should/could be PrimaryRole, but SubRole can be different things "Manager, Team Leader" "Level 2 Shopper" , "Level 1 Shopper" etc
*/
