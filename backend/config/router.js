const express = require("express");
const router = express.Router();
const multer  = require('multer');
const upload = multer();
const {con} = require('../db.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

router.get('/api/getUser', async (req, res, next) => {
    let sqlQuery = "SELECT ID, Login FROM users";

    con.query(sqlQuery, function(err,result){
        if(err) throw err;
        res.json(result);
    })
});

router.get('/api/viewall', async (req, res, next) =>{
    let sql = "SELECT * FROM timesheet";

    con.query(sql,function(err,result){
        if (err) throw err;
        res.json(result);
    })
});

router.get('/api/clientviewa', async (req, res, next) =>{
    let sql = "SELECT * FROM users WHERE Role = 'customer'";

    con.query(sql,function(err,result){
        if (err) throw err;
        res.json(result);
    })
});


router.post('/api/timesheet', upload.none(), (req,res) => {
    let sql = "SELECT * FROM timesheet WHERE ID_Client = ?";
    let currentUser = req.body.currentIDUser;

    con.query(sql,[currentUser],function(err,result){
        if (err) throw err;

        console.log(result);
        res.json(result);
    })
});

router.post('/api/form', upload.none(), (req, res, next) => {
    let mail = req.body.email;
    let pwd = req.body.pwd;
    
    let sql = "SELECT * FROM users WHERE Email = ? and Password = ?";
    let reqCheckID = "SELECT ID FROM users WHERE Email = ?";
    let reqPwd = "SELECT Password FROM users WHERE Email = ?";

    console.log(req.body);

    con.query(reqCheckID, [mail], function (err, result) {
        if (err) throw err;
        if (result.length === 1)
        {
            con.query(reqPwd, [mail], function (err, resultat){
                if (err) throw err;
                let passRes = resultat[0].Password;
                bcrypt.compare(pwd, passRes, (err, resp) => {
                    if (err) throw err;
                    if (!resp) {
                        console.log('nul');
                        res.status(401).json({ message: 'mauvais mot de passe' });
                    }
                    else {
                        //let TKEN = jwt.sign({userID: result[0].ID},'JETETIENSTUMETIENSPARLABARBICHETTELEPREMIERDENOUSDEUXQUIRRIAAURAUNETAPETTE', { expiresIn: '24h'});
                        con.query(sql, [mail, passRes],function (err, rlt) {
                            if (err) throw err;
                            //rlt.push({token: TKEN})
                            console.log(rlt);
                            res.status(200).json(rlt);
                        });
                    }
                })
            })
        }
        else {
            res.status(401).json({message: 'mauvais mail'});
            console.log(res.statusCode);
        }
    })
    
});

router.post('/api/inscription', upload.none(), (req, res, next) => {
    let insc = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        pass: bcrypt.hashSync(req.body.pass,10,function(err,hash){}), // On hash le password avant de l'injecter dans la db
        mail: req.body.email,
        login: req.body.nom + req.body.prenom // Création du Login avec le nom & prenom
    }

    let sql = "INSERT INTO users(Login,Nom,Prenom,Password,Email) VALUES (?,?,?,?,?)";

    //Insert dans la DB
    con.query(sql, [insc.login,insc.nom,insc.prenom,insc.pass,insc.mail], function (err,result){
        if (err) throw err;
        res.json(result);
    })
});

router.post('/api/TSForm', upload.none(), (req, res, next) => {
    let time = req.body.duree_tache;
    let developpeur = req.body.who_do_it;
    let date = req.body.date_tache;
    let tache = req.body.tache;
    let client = req.body.for_who;
    let titre = req.body.title;

    let querySQL = "INSERT INTO timesheet(ID_Client,Agent,Temps_Min_Tache,Informations,Date_Tache_Effectuee,Titre) VALUES (?,?,?,?,?,?)";

    let querySQL2 = "UPDATE users SET Minutes_Restantes = Minutes_Restantes - ? WHERE ID = ?";

    con.query(querySQL, [client,developpeur,time,tache,date,titre], function (err,result){
        if (err) throw err;
        res.json(result);
    })

    con.query(querySQL2, [time, client], function (err, resultat) {
        if (err) throw err;
        return resultat;
    })
});

router.post('/api/HeureFORM', upload.none(), (req, res, next) => {
    let duree = req.body.heure_achete * 60;
    let client = req.body.for_who;
    let date_achat = req.body.date_Achat;

    let qSQL = "UPDATE users SET Minutes_Restantes = Minutes_Restantes + ?, Minutes_Achetees = Minutes_Achetees + ? WHERE ID = ?";

    let qSQL2 = "INSERT INTO achat(ID_Client,Nbre_Heures,Date) VALUES (?,?,?)";

    con.query(qSQL, [duree,duree,client], function (err,results){
        if (err) throw err;
        res.json(results);
    })

    con.query(qSQL2, [client,duree,date_achat], function (err,ress){
        if (err) throw err;
        return ress;
    })
});

module.exports = router;