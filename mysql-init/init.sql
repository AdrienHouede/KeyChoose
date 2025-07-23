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
  ('https://m.media-amazon.com/images/I/61TcLwytBfL._AC_SX569_.jpg',     'Logitech G915 TKL',              'https://www.logitechg.com/915tkl',           1,  '2020', 'Logitech'),
  ('https://www.ubuy.fr/productimg/?image=aHR0cHM6Ly9tLm1lZGlhLWFtYXpvbi5jb20vaW1hZ2VzL0kvNjFkWGI1WDFtWUwuX0FDX1NMMTUwMF8uanBn.jpg',                     'Keychron K2',                    'https://www.keychron.com/k2',                2,  '2019', 'Keychron'),
  ('https://m.media-amazon.com/images/I/61H+zOpF4LL._AC_SX425_.jpg',               'Vortex Race 3',                  'https://www.vortexgear.com/race3',           3,  '2018', 'Vortex'),
  ('https://m.media-amazon.com/images/I/71Cy-uweiJL._AC_SX425_.jpg',                'Corsair K70 RGB',                'https://www.corsair.com/k70rgb',             4,  '2021', 'Corsair'),
  ('https://massdrop-s3.imgix.net/product-images/drop-the-lord-of-the-rings-dwarvish-keyboard/FP/bJ2dTm54TaGAGlg2qgM5_4745-copy-pdp.jpg?auto=format&fm=jpg&fit=crop&w=360&h=360&bg=f0f0f0&fill=solid&fill-color=f0f0f0&dpr=2&q=35',                          'Drop + OLKB ALT',                'https://drop.com/alt',                       5,  '2020', 'Drop'),
  ('https://m.media-amazon.com/images/I/61Sz-kKb60L._AC_SX425_.jpg',                  'Varmilo VA87M',                  'https://varmilo.com/va87m',                  6,  '2019', 'Varmilo'),
  ('https://m.media-amazon.com/images/I/51sTmIpzYiL.__AC_SX300_SY300_QL70_ML2_.jpg',                    'Anne Pro 2',                     'https://annepro.net/ap2',                    7,  '2019', 'ObinsLab'),
  ('https://m.media-amazon.com/images/I/51ONOnT6lAL.__AC_SX300_SY300_QL70_ML2_.jpg',                    'Logitech G613',                  'https://www.logitechg.com/g613',             8,  '2018', 'Logitech'),
  ('https://m.media-amazon.com/images/I/61aOfIGCgHL.__AC_SX300_SY300_QL70_ML2_.jpg',                     'Keychron K6',                    'https://www.keychron.com/k6',                9,  '2021', 'Keychron'),
  ('https://m.media-amazon.com/images/I/71jzVaVcsBL.__AC_SY300_SX300_QL70_ML2_.jpg',                   'Corsair K63 Wireless',           'https://www.corsair.com/k63',                10, '2018', 'Corsair'),
  ('https://m.media-amazon.com/images/I/71RunXyA77L.__AC_SX300_SY300_QL70_ML2_.jpg',              'Razer Huntsman Mini',            'https://www.razer.com/huntsman-mini',        11, '2020', 'Razer'),
  ('https://m.media-amazon.com/images/I/719h65mTOEL._AC_SX425_.jpg',       'SteelSeries Apex Pro',           'https://steelseries.com/apex-pro',           12, '2019', 'SteelSeries'),
  ('https://m.media-amazon.com/images/I/71LzZ2hY21L._AC_SX425_.jpg',            'HyperX Alloy Origins',           'https://hyperx.com/alloy-origins',           13, '2020', 'HyperX'),
  ('https://m.media-amazon.com/images/I/51Rfi+VEDaL._AC_SY300_SX300_QL70_ML2_.jpg',          'Ducky One 2 Mini',               'https://duckychannel.com/one2mini',          14, '2018', 'Ducky'),
  ('https://m.media-amazon.com/images/I/71FZG5f1kbL._AC_SX425_.jpg',                     'Keychron K4',                    'https://www.keychron.com/k4',                15, '2020', 'Keychron'),
  ('https://m.media-amazon.com/images/I/61vjI8vQalL.__AC_SX300_SY300_QL70_ML2_.jpg',                 'Varmilo VA108M',                 'https://varmilo.com/va108m',                 16, '2017', 'Varmilo'),
  ('https://m.media-amazon.com/images/I/61EtsD0mfLL.__AC_SX300_SY300_QL70_ML2_.jpg',                         'Akko 3068',                      'https://akko.com/3068',                      17, '2019', 'Akko'),
  ('https://m.media-amazon.com/images/I/61Xeguf47rL.__AC_SX300_SY300_QL70_ML2_.jpg',                    'Anne Pro 1',                     'https://annepro.net/ap1',                    18, '2018', 'ObinsLab'),
  ('https://m.media-amazon.com/images/I/71LzZ2hY21L.__AC_SY300_SX300_QL70_ML2_.jpg',                     'HyperX Alloy FPS',               'https://hyperx.com/alloy-fps',               19, '2017', 'HyperX'),
  ('https://m.media-amazon.com/images/I/61I+DYtJiwL._AC_SY300_SX300_QL70_ML2_.jpg',           'Varmilo VA87M Sakura',          'https://varmilo.com/va87m-sakura',           20, '2021', 'Varmilo'),
  ('https://m.media-amazon.com/images/I/6177RzwdOSL._AC_SX425_.jpg',              'ObinsLab Anne Pro',              'https://obinslab.com/annepro',               21, '2018', 'ObinsLab'),
  ('https://m.media-amazon.com/images/I/51RmdH7RgiL._AC_SX425_.jpg',                'Anne Pro 2 Pro',                 'https://annepro.net/ap2pro',                 22, '2022', 'ObinsLab'),
  ('https://m.media-amazon.com/images/I/61C786UVv+L._AC_SY300_SX300_QL70_ML2_.jpg',           'Ducky One 2 RGB',                'https://duckychannel.com/one2rgb',           23, '2021', 'Ducky'),
  ('https://m.media-amazon.com/images/I/61q73DBX4uL.__AC_SX300_SY300_QL70_ML2_.jpg',                     'Keychron K8',                    'https://www.keychron.com/k8',                24, '2020', 'Keychron'),
  ('https://m.media-amazon.com/images/I/61hhnkbtSNL.__AC_SX300_SY300_QL70_ML2_.jpg',                         'Logitech G915',                  'https://www.logitechg.com/g915',             25, '2019', 'Logitech'),
  ('https://m.media-amazon.com/images/I/71LO6RbJ7UL.__AC_SX300_SY300_QL70_ML2_.jpg',              'Razer BlackWidow V3',            'https://www.razer.com/blackwidow-v3',        26, '2020', 'Razer'),
  ('https://m.media-amazon.com/images/I/61nBW1Uwq6L._AC_SX425_.jpg',         'SteelSeries Apex 7',             'https://steelseries.com/apex-7',             27, '2019', 'SteelSeries'),
  ('https://m.media-amazon.com/images/I/51WC0r9Ea9L.__AC_SX300_SY300_QL70_ML2_.jpg',            'HyperX Alloy Elite 2',           'https://hyperx.com/alloy-elite-2',           28, '2021', 'HyperX'),
  ('https://m.media-amazon.com/images/I/71mL0uwLU-L._AC_SX679_.jpg',          'Ducky Mecha Mini',               'https://duckychannel.com/mechamini',         29, '2023', 'Ducky'),
  ('https://m.media-amazon.com/images/I/615oblbx2+L._AC_SY300_SX300_QL70_ML2_.jpg-5108.png',                         'Akko 5108',                      'https://akko.com/5108',                      30, '2022', 'Akko')
ON DUPLICATE KEY UPDATE
  image=VALUES(image),
  nom=VALUES(nom),
  url=VALUES(url),
  year=VALUES(year),
  brand=VALUES(brand);