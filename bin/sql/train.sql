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
('Nathan','Ofiice');

INSERT INTO light(level, amount)
VALUES
('high', 98),
('medium', 56),
('low', 14);

INSERT INTO voltage(level, amount)
VALUES
('high', 87),
('medium', 62),
('low', 18);