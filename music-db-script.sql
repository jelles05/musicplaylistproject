DROP TABLE IF EXISTS track;
DROP TABLE IF EXISTS playlist;
CREATE TABLE playlist ( id SERIAL PRIMARY KEY, title VARCHAR(100) NOT NULL, creation_date TIMESTAMPTZ DEFAULT Now());
CREATE TABLE track (id SERIAL PRIMARY KEY, playlist_id INTEGER REFERENCES playlist (id), title VARCHAR(200) NOT NULL, uri VARCHAR(100) NOT NULL, master_id INTEGER NOT NULL);

INSERT INTO playlist (title) VALUES ('Default');
INSERT INTO playlist (title) VALUES ('Acoustique');
INSERT INTO playlist (title) VALUES ('Classique');
INSERT INTO playlist (title) VALUES ('Country');
INSERT INTO playlist (title) VALUES ('Metal');
INSERT INTO playlist (title) VALUES ('Pop/Dance');
INSERT INTO playlist (title) VALUES ('Rock');

INSERT INTO track (playlist_id, title, uri, master_id) VALUES (4, 'Taylor Swift - Tim McGraw', 'https://www.youtube.com/watch?v=GkD20ajVxnY', 138812);
INSERT INTO track (playlist_id, title, uri, master_id) VALUES (4, 'Taylor Swift - Picture To Burn', 'https://www.youtube.com/watch?v=yCMqcFAigRg', 138812);
INSERT INTO track (playlist_id, title, uri, master_id) VALUES (7, 'Bodyrockers - I Like The Way', 'https://www.youtube.com/watch?v=jO90ullM3FQ', 106046);
INSERT INTO track (playlist_id, title, uri, master_id) VALUES (1, 'Britney Spears - Overprotected', 'https://www.youtube.com/watch?v=PZYSiWHW8V0', 27460);
INSERT INTO track (playlist_id, title, uri, master_id) VALUES (1, 'Ariana Grande - goodnight n go (Audio)', 'https://www.youtube.com/watch?v=sXJ2hajo6rw', 1408887);
INSERT INTO track (playlist_id, title, uri, master_id) VALUES (6, 'Katy Perry - Hot N Cold (Official)', 'https://www.youtube.com/watch?v=kTHNpusq654', 271611);