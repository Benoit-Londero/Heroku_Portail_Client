import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";
import "./ViewAll.css";
import Moment from "moment";

export default function ViewAll() {

     const [alltasks, setAllTasks] = useState([]);
     const [clients, setClients] = useState([]);
     const [idClient, setIdClient] = useState();
     const [filtredtasks, setFiltredtasks] = useState(null);
     
     useEffect (() => {

          fetch('/api/viewall')
               .then(res => res.json())
               .then(json => setAllTasks(json))
               .catch(err => console.info(err))

          fetch('/api/clientviewa')
               .then(res => res.json())
               .then(json => setClients(json))
               .catch(err => console.info(err))
     }, [])

     function filtertask(clients_id){
          let filtredtasks = alltasks.filter(item => item.ID_Client === parseInt(clients_id));
          return filtredtasks;
     }

     function handleTasks(e) {
          let theClient = e.target.value;
          console.log(theClient);
          theClient !== "all" ? setFiltredtasks(filtertask(theClient)) : setFiltredtasks(alltasks);
          theClient === "all" ? setIdClient('') : setIdClient(theClient);
     }

     
     return (
     <div>
     <NavBar />
     <Container id="page_viewall">
          <Row>
               <Col className="resume"><h1>Timesheet</h1></Col>
               <Col></Col>
          </Row>
          <Row>
          <h2>Clients</h2>
               <button  value='all' className="client_list" onClick={handleTasks}>Tous</button>

               {clients && clients.map((item,index) => {
                    return(
                         <button  key={index} value={item.ID} className="client_list" onClick={handleTasks} >{item.Nom} {item.Prenom}</button>
                    ) 
               })}
          </Row>
          <Row className="customer_card_all timesheet">
               <Col>
               
                    <table>
                         <thead>
                              <tr>
                              <td><h2>Données horaires</h2></td>
                              </tr>
                         </thead>
                         <tbody>
                              <tr>
                                   <td>Minutes Totales : {clients.filter(obj => obj.ID === parseInt(idClient)).map(item => item.Minutes_Achetees)}</td>
                                   <td>Minutes Restantes : {clients.filter(obj => obj.ID === parseInt(idClient)).map(item => item.Minutes_Restantes)}</td>
                              </tr>
                         </tbody>
                    </table>
               </Col>
          </Row>
          <Row className="customer_card_all timesheet">
               <Col>
               
                    <table>
                         <thead>
                              <tr>
                              <td><h2>Timesheet</h2></td>
                              </tr>
                         </thead>
                         <tbody>

                         {filtredtasks && filtredtasks.map((item,index) => {
                         var date = Moment(item.Date_Tache_Effectuee).format('DD-MM-YYYY');
                         return (
                              <tr key={index}>
                                   <td><p>{ item.Titre}</p></td>
                                   <td className='fst_col'><p className="tasks">{ item.Informations}</p></td>
                                   <td><p>{date}</p></td>
                                   <td><p>{item.time === '' ? 'en cours' : item.Temps_Min_Tache + ' min'} </p></td>
                                   <td><p className="developer"> {item.Agent}</p></td>
                              </tr>
                              )
                         })}
                         </tbody>
                    </table>
               </Col>
          </Row>
     </Container>
     </div>
      )
 }
