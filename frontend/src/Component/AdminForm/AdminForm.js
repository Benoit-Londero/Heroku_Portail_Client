import React, {useState, useEffect} from 'react';
import NavBar from "../NavBar/NavBar";
import './AdminForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";


export default function AdminForm() {

    const [usersInfos, setUsersInfos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch('/api/getUser')
        .then(res => res.json())
        .then(json => setUsersInfos(json)) 
        .catch(err => console.info(err))  
    }, [])
    
    console.log(usersInfos);

    const handleSubmitTS = evt => {
        evt.preventDefault();
        let TSForm = document.getElementById('timesheetForm');
        let TSFormData = new FormData(TSForm);

        fetch('/api/TSForm', {method: 'POST', body: TSFormData})
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.info(err))
        .then(alert('Données enregistrées'))
    }


  return (      
    
    <div id='adminForm'>
        <NavBar />
        <h1>Créer une nouvelle entrée</h1>
      
        <form id="timesheetForm" onSubmit={handleSubmitTS}>
          <table>
            <tbody>
            <tr><td><label for="title">Titre de la tache <span className="required">*</span></label><br></br><input type="text" placeholder="titre" id="title" name="title" required/></td></tr>
              <tr><td><label for="tache">Tâche réalisée <span className="required">*</span></label><br></br><textarea id="tache" name="tache" placeholder="tâche" required></textarea></td></tr>
              <tr><td><label for="durée_tache">Durée de la tache (en min.)<span className="required">*</span></label><br></br><input type="number" placeholder="25" id="duree_tache" name="duree_tache" required/></td></tr>
              <tr><td><label for="date_tache">Date d'éxecution<span className="required">*</span></label><br></br><input type="date" placeholder="Date" id='date_tache' name="date_tache" required/></td></tr>
              <tr>
                <td><label for="who_do_it">Intervenant<span className="required">*</span></label><br></br>
                  <select id='who_do_it' name="who_do_it" required>
                    <option default disabled> Sélectionnez un consultant </option>
                    <option value="Fabian Hernandez Barco">Fabian Hernandez Barco</option>
                    <option value="Quentin De Jarnac">Quentin De Jarnac</option>
                    <option value="Benoit Londero">Benoit Londero</option>
                  </select>
                </td></tr>
                <tr>
                <td><label for="for_who">Client<span className="required">*</span></label><br></br>
                  <select id='for_who' name="for_who" required>
                    <option default disabled> Sélectionnez un client </option>
                    {usersInfos.map((user, index) => 
                        <option key={index} value={user.ID}>{user.Login}</option>
                    )}
                  </select>
                </td>
              </tr>
              <tr><td><input type="submit" value="Enregistrer"/></td></tr>
            </tbody>
          </table>
        </form>
    </div>
    
)}
