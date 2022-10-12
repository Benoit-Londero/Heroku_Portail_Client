/*
* Fichier de connexion à la DB, à inclure dans les fichiers qui recevront des query SQL;
* Contient actuellement les infos pour la cloudDb OVH - av37044-003
*/

const mysql = require("mysql");
const fs = require('fs');

// const con =mysql.createConnection(
//      {host:"av37044-003.eu.clouddb.ovh.net",
//      user: "PortalCon",
//      password:"qrdhWpF14Lftcd", //mdp ovh clouddb qrdhWpF14Lftcd
//      port:35618,
//      database: "PNodeJS"
// });

const con =mysql.createConnection(
     {
     host:"mysqcustomerportal.mysql.database.azure.com", 
     user:"ahgadmin", 
     password:"408pWoWHRQGtDTxu6697OrrCrhLle6", 
     database:"agc_portal_2", //custportaldb
     port:3306,
     ssl: {
          ca:fs.readFileSync("DigiCertGlobalRootCA.crt.pem")
     }
});

module.exports = {
     con
}