DROP TABLE profiles;
CREATE TABLE profiles(
  id serial,
  name text,
  environment text
);

DROP TABLE light;
CREATE TABLE light(
  id serial,
  level text,
  amount int
);

DROP TABLE voltage;
CREATE TABLE voltage(
  id serial,
  level text,
  amount int
);


INSERT INTO profiles(name, environment)
VALUES
('Deek','Home'),
('Dave','Public'),
('Nathan','Office');

INSERT INTO light(level, amount)
VALUES
('High', 98),
('Medium', 56),
('Low', 14);

INSERT INTO voltage(level, amount)
VALUES
('High', 87),
('Medium', 62),
('Low', 18);

