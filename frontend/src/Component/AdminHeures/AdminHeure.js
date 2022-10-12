import React, {useState, useEffect} from 'react';
import NavBar from "../NavBar/NavBar";
import './AdminHeure.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminHeure() {

    const [usersInfos, setUsersInfos] = useState([]);

    useEffect(() => {
        fetch('/api/getUser')
        .then(res => res.json())
        .then(json => setUsersInfos(json)) 
        .catch(err => console.info(err))  
    }, [])
    
    console.log(usersInfos);

    const handleSubmitHeure = evt => {
        evt.preventDefault();
        let HForm = document.getElementById('HeureForm');
        let HFormData = new FormData(HForm);

        fetch('/api/HeureFORM', {method: 'POST', body: HFormData})
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.info(err))
        .then(alert('Données enregistrées'))
    }


  return (      
    
    <div id='adminForm'>
        <NavBar />
        <h1>Créer une nouvelle entrée</h1>
      
        <form id="HeureForm" onSubmit={handleSubmitHeure}>
          <table>
            <tbody>
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
              <tr><td><label for="heure_achete">Nombre d'heures achetées<span className="required">*</span></label><br></br><input type="number" placeholder="heure_achete" id='heure_achete' name="heure_achete" required/></td></tr>
              <tr><td><label for="date_Achat">Date d'achat<span className="required">*</span></label><br></br><input type="date" placeholder="Date" id='date_Achat' name="date_Achat" required/></td></tr>
              <tr><td><input type="submit" value="Ajouter"/></td></tr>
            </tbody>
          </table>
        </form>
    </div>
    
)}
