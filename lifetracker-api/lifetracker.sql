\echo 'Delete and recreate users db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE users;
CREATE DATABASE users;
\connect users

\i lifetracker-schema.sql

\echo 'Delete and recreate nutrition db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE nutrition;
CREATE DATABASE nutrition;
\connect nutrition

\i lifetracker-schema.sql