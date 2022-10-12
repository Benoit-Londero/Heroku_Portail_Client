import React, {useState, useEffect} from "react";
import './App.css';
import Connexion from './Component/Connexion/Connexion.js'
import Deconnexion from './Component/Deconnexion/Deconnexion.js'

import Boutique from './Component/Credits/Credits.js'
import NameForm from './Component/Account/Account.js'
import Home from './Component/Home/Home.js'
import Facture from './Component/Facture/Facture.js'
import Inscription from './Component/Inscription/Inscription.js'
import AdminForm from './Component/AdminForm/AdminForm.js'
import AdminHeure from './Component/AdminHeures/AdminHeure.js'
import ViewAll from './Component/ViewAll/ViewAll.js'

import useLocalStorage from "./useLocalStorage";

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {

  const [erreur, setErreur] = useState(false);
  const [login, setLogin] = useState(false);
  
  const [currentIDU, setCurrentIDU] = useLocalStorage("currentIDU","");
  const [currentUSR, setCurrentUSR] = useLocalStorage("currentUSR","");
  const [currentNOM, setCurrentNOM] = useLocalStorage("currentNOM","");
  const [currentPNOM, setCurrentPNOM] = useLocalStorage("currentPNOM","");
  const [currentMAIL, setCurrentMAIL] = useLocalStorage("currentMAIL","");
  const [currentHeureTOT, setCurrentHeureTOT] = useLocalStorage("currentHeureTOT","");
  const [currentHeureREST, setCurrentHeureREST] = useLocalStorage("currentHeureREST","");
  const [currentRole, setCurrentRole] = useLocalStorage("currentRole","");
  const [currentToken, setCurrentToken] = useLocalStorage("currentToken","");


  const handleSubmit = e => {
    e.preventDefault(); //on empêche le refresh de la page, nécessaire pour garder les infos déjà présente lors d'un submit érronés
    let logForm = document.getElementById('logForm'); //on récupère l'élement <form> et ces différents <input>
    let myform = new FormData(logForm); //que l'on intègre à un formData

    fetch('/api/form', { method: 'POST', body: myform })

    .then(res => res.json())
    .then(json => {if(json.length === 1) {
      setCurrentIDU(json[0].ID);
      setCurrentUSR(json[0].Login); 
      setCurrentNOM(json[0].Nom);
      setCurrentPNOM(json[0].Prenom);
      setCurrentMAIL(json[0].Email);
      setCurrentHeureTOT(json[0].Minutes_Achetees); 
      setCurrentHeureREST(json[0].Minutes_Restantes);
      setCurrentRole(json[0].Role);
      //setCurrentToken(json[1].token);
      setErreur(false);
      setLogin(true);

    }
    else {
        setErreur(true)
    }})
    .catch(err => console.info(err))
  }

  
  const resetLogin = () => {
    setLogin(false);
    setCurrentIDU('');
    setCurrentUSR(''); 
    setCurrentNOM(''); 
    setCurrentPNOM('');
    setCurrentMAIL('');
    setCurrentHeureREST(''); 
    setCurrentHeureREST('');
    setCurrentRole('');
    setErreur(false);
  }

  return (
    <div className="App">
      <header className="App-header">            
        <Router>
            <Routes>
              <Route exact path="/" element={<Connexion handleSubmit={handleSubmit} erreur={erreur} login={login}/>}></Route>
              <Route path="/Home" element={< Home />}></Route>
              <Route path="/AdminForm" element={< AdminForm />}></Route>
              <Route path="/AdminHeure" element={< AdminHeure />}></Route>
              <Route path="/ViewAll" element={< ViewAll />}></Route>
              <Route path='/Account' element={< NameForm />}></Route>
              <Route path='/Credits' element={< Boutique />}></Route>
              <Route path='/Factures' element={< Facture />}></Route>
              <Route path='/Inscription' element={< Inscription />}></Route>
              <Route path='/Logout' element={< Deconnexion resetLogin={resetLogin}/>}></Route>
            </Routes>
        </Router>
      </header>
    </div>
  );
  
}

export default App;


