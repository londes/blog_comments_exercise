-- Add your SQL queries here.
-- See SQL documentation: https://docs.airplane.dev/creating-tasks/sql
update comments set moderated = true where id = :comment_id
