import * as React from 'react'
import NavBar from "../NavBar/NavBar.js";
import './Facture.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaFileDownload } from "react-icons/fa";

export default function Facture() {

     // Variables dev factures liées au profil 
const facts = [
     {reference : 'FA01229082022', date: '29.08.2022', url:'http://ahgency.be'},
     {reference : 'FA01329315622', date: '02.09.2022', url:'http://ahgency.be'},
     {reference : 'FA01498526522', date: '06.09.2022', url:'http://ahgency.be'}
]

     return (
          <div id="page_facture">
               <NavBar />
               <h1 className="resume">Factures</h1>

               <Container>
               <Row>
               <Col className="facture_section">
                    <h2>Mes dernières factures</h2>
                    <table>
                         <thead>
                              <tr>
                                   <th>Référence</th>
                                   <th>Date</th>
                                   <th className="last-child">Action</th>
                              </tr>
                         </thead>
                         <tbody>

                         {
                              facts.map((item,index) => {
                                   return (
                                        <tr key={index}>
                                             <td><p className="ref">{ item.reference}</p></td>
                                             <td><p>{ item.date}</p></td>
                                             <td className="last-child"><a href={item.url} className="PDF_ddl"><FaFileDownload /></a></td>
                                        </tr>
                                   )})
                         }

                         </tbody>
                    </table>
               </Col>
          </Row>
     </Container>

         </div>

     )
}
