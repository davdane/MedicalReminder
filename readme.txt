1-Download https://drive.google.com/file/d/19ulhuWA_yd2Ff3Asp3VJQGGnEobuLVo0/view?usp=sharing and unzip the file project.rar

2-Unzip file provaAPI.rar (API/provaAPI.rar)  in ../xampp/htdocs

3-Create DB "medical_reminder_test" and execute :

CREATE TABLE `user` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `email` varchar(128) NOT NULL,
 `password` varchar(255) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4

CREATE TABLE `profiles` (
 `id_profiles` int(11) NOT NULL AUTO_INCREMENT,
 `id_user` int(11) NOT NULL,
 `nome` varchar(64) NOT NULL,
 `cognome` varchar(64) NOT NULL,
 `altezza` double(10,2) NOT NULL,
 `peso` double(10,2) NOT NULL,
 `age` date NOT NULL,
 PRIMARY KEY (`id_profiles`),
 KEY `user_profiles` (`id_user`),
 CONSTRAINT `user_profiles` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4

CREATE TABLE `appointments` (
 `id_profiles` int(11) NOT NULL,
 `id_appoint` int(11) NOT NULL AUTO_INCREMENT,
 `titolo` text NOT NULL,
 `descrizione` text NOT NULL,
 `luogo` text NOT NULL,
 `date` datetime NOT NULL,
 PRIMARY KEY (`id_appoint`),
 KEY `profiles_appointments` (`id_profiles`),
 CONSTRAINT `profiles_appointments` FOREIGN KEY (`id_profiles`) REFERENCES `profiles` (`id_profiles`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4


4-Compile in the folder where you extracted project.rar with the command "ionic serve"
