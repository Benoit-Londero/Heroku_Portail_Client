import * as React from 'react';
import './Account.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from "../NavBar/NavBar";
import { RiAccountCircleFill } from "react-icons/ri";
import { ImMail4 } from "react-icons/im";


export default function NameForm(props) {


     const currentNOM = (localStorage.getItem("currentNOM").replaceAll('"',''));
     const currentPNOM = (localStorage.getItem("currentPNOM").replaceAll('"',''));
     const currentMAIL = (localStorage.getItem("currentMAIL").replaceAll('"',''));

     const identity= {
          nom : currentNOM,
          prenom : currentPNOM,
          mail: currentMAIL
     }

     const contact_agc = [
          {
               nom : 'Quentin de Jarnac',
               mail : 'quentin@ahgency.be'
          },
          {
               nom : 'Fabian Hernandez',
               mail : 'fabian@ahgency.be'
          },
          {
               nom : 'Benoit Londero',
               mail : 'benoit@ahgency.be'
          }
     ]

     return (
          <div id="page_account">
               <NavBar />
               <Container>
                    
                    <Row>
                         <Col><h1 className="resume">Mon compte</h1></Col>
                    </Row>

                    <Row>
                         <Col md={8} className="account_section">
                         <h2>Informations générales</h2>
                         <table className="Profil">
                              <tbody>
                                   <tr><td><RiAccountCircleFill className="account_ppic"/></td></tr>
                                   <tr><td><p className="bold">Nom : {identity.nom}</p></td></tr>
                                   <tr><td><p className="bold">Prénom : {identity.prenom}</p></td></tr>
                                   <tr><td><p className="bold">Mail : {identity.mail}</p></td></tr>
                                   <tr>
                                        <td><label for="pass">Modifier mon mot de passe</label><br/>
                                        <input type="password" id="pass" placeholder="********"></input></td>
                                   </tr>

                                   <tr>
                                        <td><label for="confpass">Confirmer nouveau mot de passe</label><br/>
                                        <input type="password" id="confpass" placeholder="********"></input></td>
                                   </tr>

                                   <tr>
                                        <td><input type="submit" value="Enregistrer"/></td>
                                        <span className="clear"></span>
                                   </tr>
                              </tbody>
                         </table>
                         
                         
                         </Col>

                         <Col md={{span: 3, offset: 1}} className="account_section my_contact">
                         <h2>Mes contacts</h2>
                              <ul>
                                   {contact_agc.map((item,index) => {
                                        return (
                                             <li key={index}>
                                                  <table>
                                                       <tbody>
                                                            <tr>
                                                            <td>{item.nom}<br/><span  className="mail">{item.mail }</span></td>
                                                            <td><a href={"mailto:" + item.mail }><ImMail4 className="btn_mail"/></a></td>
                                                            </tr>
                                                       </tbody>
                                                  </table>
                                             </li>
                                        )
                                   })}
                              </ul>
                         </Col>
                    </Row>

                    <Row className="account_section delete_account">
                         <Col lg={12}>
                         <table >
                              <tbody>
                                   <tr>
                                        <td><label for="deleteacc">Supprimer mon compte (ATTENTION !! Cette action est irréversible)</label></td>
                                        <td><input type="submit" id="deleteacc" value="Supprimer mon compte"/></td>
                                   </tr>                                
                              </tbody>
                         </table>

                         </Col>
                    </Row>
               </Container>        
         </div>
     )
}
