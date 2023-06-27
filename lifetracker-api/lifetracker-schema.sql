CREATE TABLE users (
    id Varchar(100) NOT NULL,
    username Varchar(100) NOT NULL,
    password Varchar(100) NOT NULL,
    first_name Varchar(100) NOT NULL,
    last_name Varchar(100) NOT NULL,
    email Varchar(100) NOT NULL,
    created_at Varchar(100) NOT NULL,
    updated_at Varchar(100) NOT NULL
);

CREATE TABLE nutrition (
    id Varchar(100) NOT NULL,
    name Varchar(100) NOT NULL,
    category Varchar(100) NOT NULL,
    calories Varchar(100) NOT NULL,
    image_url Varchar(100) NOT NULL,
    user_id Varchar(100) NOT NULL,
    created_at Varchar(100) NOT NULL
);