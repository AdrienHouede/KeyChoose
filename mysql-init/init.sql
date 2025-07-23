CREATE DATABASE IF NOT EXISTS keychoose
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE keychoose;

CREATE TABLE IF NOT EXISTS ROLE (
  id INT AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(42) NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS UTILISATEUR (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES ROLE(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS ATTRIBUTE (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(10),
  layout VARCHAR(10),
  size INT(3),
  `switch` VARCHAR(50) DEFAULT NULL,
  connectivity VARCHAR(30) DEFAULT NULL,
  rgb TINYINT(1) DEFAULT 0,
  material VARCHAR(20),
  price DECIMAL(10,2)
);

CREATE TABLE IF NOT EXISTS CLAVIER (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image VARCHAR(255),
  nom VARCHAR(255),
  url VARCHAR(255),
  attribute_id INT,
  year VARCHAR(42),
  brand VARCHAR(255),
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (attribute_id) REFERENCES ATTRIBUTE(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS PROFILE (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  attribute_id INT NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES UTILISATEUR(id) ON DELETE CASCADE,
  FOREIGN KEY (attribute_id) REFERENCES ATTRIBUTE(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS POSSEDER (
  user_id INT NOT NULL,
  profile_id INT NOT NULL,
  PRIMARY KEY (user_id, profile_id),
  FOREIGN KEY (user_id) REFERENCES UTILISATEUR(id) ON DELETE CASCADE,
  FOREIGN KEY (profile_id) REFERENCES PROFILE(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS HISTORIQUE (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event VARCHAR(255),
  description TEXT,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS RESET_TOKENS (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(64) NOT NULL UNIQUE,
  expires DATETIME NOT NULL,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES UTILISATEUR(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS LOGS (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(255) NOT NULL,
  details TEXT,
  created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES UTILISATEUR(id) ON DELETE SET NULL
);

INSERT INTO ROLE (id, role) VALUES (1, 'user'), (2, 'admin') ON DUPLICATE KEY UPDATE role = VALUES(role);
INSERT INTO UTILISATEUR (email, password, role_id) VALUES ('admin@example.com', '$2b$12$DzvIUrJtQqz2yUMCyPe32.BUDoLeILbP1IelrIpWFfxgpYeLh5Nee', 2), ('user@example.com',  '$2b$12$YUclBxIb4zAviFqXs/74IOkkOgsJH09jw/21l694rZfedP.hF5TFC', 1) ON DUPLICATE KEY UPDATE password=VALUES(password), role_id=VALUES(role_id);
INSERT INTO ATTRIBUTE (type,layout,size,`switch`,connectivity,rgb,material,price) VALUES
  ('QWERTY','ANSI',80,'Cherry MX Red','Wired',1,'Aluminum',149.99),
  ('QWERTY','ANSI',100,'Gateron Brown','Bluetooth',1,'Aluminum',169.00),
  ('QWERTY','ISO',80,'Kailh Box White','Wireless',0,'Plastic',129.50),
  ('AZERTY','ISO',100,'Cherry MX Blue','Wired',1,'Plastic',139.00),
  ('BEPO','ANSI',80,'Zealios V2','Wired',1,'Aluminum',199.99),
  ('QWERTY','ANSI',100,'Cherry MX Brown','Wired',1,'Plastic',119.95),
  ('AZERTY','ISO',80,'Gateron Yellow','Wireless',0,'Aluminum',159.80),
  ('QWERTY','ISO',100,'Cherry MX Silent Red','Wired',1,'Aluminum',189.00),
  ('AZERTY','ISO',80,'Holy Panda','Bluetooth',1,'Aluminum',179.50),
  ('QWERTY','ANSI',100,'Kailh Speed Silver','Wired',0,'Plastic',109.99),
  ('QWERTY','ANSI',80,'TTC Gold Pink','Wireless',1,'Plastic',135.00),
  ('AZERTY','ISO',100,'NovelKeys Cream','Wired',0,'Plastic',125.00),
  ('QWERTY','ISO',80,'Cherry MX Green','Wired',1,'Aluminum',155.00),
  ('AZERTY','ANSI',100,'Outemu Purple','Bluetooth',0,'Plastic',95.00),
  ('QWERTY','ISO',80,'Halo Clear','Wireless',1,'Aluminum',165.00),
  ('AZERTY','ISO',100,'Cherry MX Black','Wired',0,'Plastic',145.00),
  ('BEPO','ANSI',80,'Akko CS Jelly','Wired',1,'Plastic',120.00),
  ('QWERTY','ANSI',100,'Gateron Ink Black','Wireless',0,'Aluminum',175.00),
  ('AZERTY','ISO',80,'Cherry MX Speed Silver','Wired',1,'Aluminum',160.00),
  ('QWERTY','ISO',100,'Gateron Milky Yellow','Wireless',1,'Plastic',130.00),
  ('QWERTY','ANSI',80,'Cherry MX White','Wired',0,'Aluminum',199.00),
  ('AZERTY','ISO',100,'Kailh Choc Pink','Wired',1,'Plastic',140.00),
  ('BEPO','ANSI',80,'TTC Brown','Bluetooth',0,'Plastic',115.00),
  ('QWERTY','ANSI',100,'Cherry MX Clear','Wired',1,'Aluminum',185.00),
  ('AZERTY','ISO',80,'Holy Panda X','Wireless',1,'Plastic',170.00),
  ('QWERTY','ISO',100,'Gateron Milky Yellow','Wired',0,'Plastic',128.00),
  ('AZERTY','ANSI',80,'Akko CS Burgundy','Wireless',1,'Aluminum',155.00),
  ('QWERTY','ANSI',100,'Gateron Pro Yellow','Wired',0,'Plastic',125.00),
  ('AZERTY','ISO',80,'Cherry MX White RGB','Wireless',1,'Aluminum',210.00),
  ('QWERTY','ISO',100,'Gateron Red','Wired',0,'Aluminum',175.00)
ON DUPLICATE KEY UPDATE price = VALUES(price);
INSERT INTO CLAVIER (image, nom, url, attribute_id, year, brand) VALUES
  ('https://cdn.logitechg.com/product-keyboard-g915-tkl.png',     'Logitech G915 TKL',              'https://www.logitechg.com/915tkl',           1,  '2020', 'Logitech'),
  ('https://cdn.keychron.com/k2-image.png',                     'Keychron K2',                    'https://www.keychron.com/k2',                2,  '2019', 'Keychron'),
  ('https://cdn.vortexgear.com/vortex-race-3.png',               'Vortex Race 3',                  'https://www.vortexgear.com/race3',           3,  '2018', 'Vortex'),
  ('https://cdn.corsair.com/corsair-k70-rgb.png',                'Corsair K70 RGB',                'https://www.corsair.com/k70rgb',             4,  '2021', 'Corsair'),
  ('https://cdn.drop.com/drop-alt.png',                          'Drop + OLKB ALT',                'https://drop.com/alt',                       5,  '2020', 'Drop'),
  ('https://cdn.varmilo.com/varmilo-va87m.png',                  'Varmilo VA87M',                  'https://varmilo.com/va87m',                  6,  '2019', 'Varmilo'),
  ('https://cdn.obinslab.com/anne-pro-2.png',                    'Anne Pro 2',                     'https://annepro.net/ap2',                    7,  '2019', 'ObinsLab'),
  ('https://cdn.logitechg.com/g613-hero.png',                    'Logitech G613',                  'https://www.logitechg.com/g613',             8,  '2018', 'Logitech'),
  ('https://cdn.keychron.com/k6-image.png',                     'Keychron K6',                    'https://www.keychron.com/k6',                9,  '2021', 'Keychron'),
  ('https://cdn.corsair.com/k63-wireless.png',                   'Corsair K63 Wireless',           'https://www.corsair.com/k63',                10, '2018', 'Corsair'),
  ('https://cdn.razer.com/razer-huntsman-mini.png',              'Razer Huntsman Mini',            'https://www.razer.com/huntsman-mini',        11, '2020', 'Razer'),
  ('https://cdn.steelseries.com/steelseries-apex-pro.png',       'SteelSeries Apex Pro',           'https://steelseries.com/apex-pro',           12, '2019', 'SteelSeries'),
  ('https://cdn.hyperx.com/hyperx-alloy-origins.png',            'HyperX Alloy Origins',           'https://hyperx.com/alloy-origins',           13, '2020', 'HyperX'),
  ('https://cdn.duckychannel.com/ducky-one-2-mini.png',          'Ducky One 2 Mini',               'https://duckychannel.com/one2mini',          14, '2018', 'Ducky'),
  ('https://cdn.keychron.com/k4-image.png',                     'Keychron K4',                    'https://www.keychron.com/k4',                15, '2020', 'Keychron'),
  ('https://cdn.varmilo.com/varmilo-va108m.png',                 'Varmilo VA108M',                 'https://varmilo.com/va108m',                 16, '2017', 'Varmilo'),
  ('https://cdn.akko.com/akko-3068.png',                         'Akko 3068',                      'https://akko.com/3068',                      17, '2019', 'Akko'),
  ('https://cdn.obinslab.com/anne-pro-1.png',                    'Anne Pro 1',                     'https://annepro.net/ap1',                    18, '2018', 'ObinsLab'),
  ('https://cdn.hyperx.com/hyperx-fps.png',                     'HyperX Alloy FPS',               'https://hyperx.com/alloy-fps',               19, '2017', 'HyperX'),
  ('https://cdn.varmilo.com/varmilo-va87m-sakura.png',           'Varmilo VA87M Sakura',          'https://varmilo.com/va87m-sakura',           20, '2021', 'Varmilo'),
  ('https://cdn.obinslab.com/obinslab-annepro.png',              'ObinsLab Anne Pro',              'https://obinslab.com/annepro',               21, '2018', 'ObinsLab'),
  ('https://cdn.obinslab.com/anne-pro-2-pro.png',                'Anne Pro 2 Pro',                 'https://annepro.net/ap2pro',                 22, '2022', 'ObinsLab'),
  ('https://cdn.duckychannel.com/ducky-one-2-rgb.png',           'Ducky One 2 RGB',                'https://duckychannel.com/one2rgb',           23, '2021', 'Ducky'),
  ('https://cdn.keychron.com/k8-image.png',                     'Keychron K8',                    'https://www.keychron.com/k8',                24, '2020', 'Keychron'),
  ('https://cdn.logitechg.com/g915.png',                         'Logitech G915',                  'https://www.logitechg.com/g915',             25, '2019', 'Logitech'),
  ('https://cdn.razer.com/razer-blackwidow-v3.png',              'Razer BlackWidow V3',            'https://www.razer.com/blackwidow-v3',        26, '2020', 'Razer'),
  ('https://cdn.steelseries.com/steelseries-apex-7.png',         'SteelSeries Apex 7',             'https://steelseries.com/apex-7',             27, '2019', 'SteelSeries'),
  ('https://cdn.hyperx.com/hyperx-alloy-elite-2.png',            'HyperX Alloy Elite 2',           'https://hyperx.com/alloy-elite-2',           28, '2021', 'HyperX'),
  ('https://cdn.duckychannel.com/ducky-mecha-mini.png',          'Ducky Mecha Mini',               'https://duckychannel.com/mechamini',         29, '2023', 'Ducky'),
  ('https://cdn.akko.com/akko-5108.png',                         'Akko 5108',                      'https://akko.com/5108',                      30, '2022', 'Akko')
ON DUPLICATE KEY UPDATE
  image=VALUES(image),
  nom=VALUES(nom),
  url=VALUES(url),
  year=VALUES(year),
  brand=VALUES(brand);