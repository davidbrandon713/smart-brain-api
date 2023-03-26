BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined, age, pet) values ('David', 'David@gmail.com', 0, '2023-01-04 20:36:49.01', 22, 'Dog');
INSERT into login (hash, email) values ('$2a$10$QXImPubIs0mdO/y4LtRVkesdkovjuXx/B0rwnjiWLUrKA00Sj.OMO', 'David@gmail.com');

COMMIT;