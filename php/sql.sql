CREATE TABLE Users(
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    PRIMARY KEY(username)
    );

CREATE TABLE cur_user(
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    PRIMARY KEY(username),
    FOREIGN KEY (username)
    REFERENCES Users(username)
    ON DELETE CASCADE
    );
