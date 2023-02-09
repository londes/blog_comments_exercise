-- Add your SQL queries here.
-- See SQL documentation: https://docs.airplane.dev/creating-tasks/sql
update comments set approved = true, moderated = true where id = :comment_id;