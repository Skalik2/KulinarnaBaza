--CREATE USER kulinarna WITH PASSWORD 'admin';
CREATE DATABASE kulinarnabaza;
GRANT ALL PRIVILEGES ON DATABASE kulinarnabaza TO kulinarna;
ALTER DATABASE kulinarnabaza OWNER TO kulinarna;
