CREATE TABLE profiles(
  id serial,
  name character varying(50),
  permission character varying(50)
);

CREATE TABLE light(
  id serial,
  level character varying(50),
  amount int
);

CREATE TABLE voltage(
  id serial,
  level character varying(50),
  amount int
);

INSERT INTO profiles(name, permission)
VALUES
('Deek', 'Full'),
('Dave', 'Partial'),
('Nathan', 'Full');

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