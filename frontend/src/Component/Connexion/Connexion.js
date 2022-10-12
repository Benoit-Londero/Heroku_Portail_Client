import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Connexion.css';
import { useLocalStorage } from '../../useLocalStorage';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import {HiArrowNarrowLeft} from 'react-icons/hi';

export default function Connexion(props) {

    const navigate = useNavigate();
    const handleSubmit = props.handleSubmit;
    const erreur = props.erreur;
    const login = props.login;


    useEffect(() => {
        if (login === true )
        {
            navigate('/Home')
        }
    }, [login])
    

  return (
    <div id="page_connexion">
        
        <Container>
            <Row className="connexion_form">
                <Col lg={12}>
                    <h1>AHGENCY CREATIVE STUDIO</h1>
                {erreur === true ? <Alert variant="danger">Email ou mot de passe érroné</Alert> : null }
                <form id="logForm" onSubmit={handleSubmit}>
                    <label>Login<br/>
                        <input type="text" name="email" placeholder="Votre email" required/>
                    </label><br/>
                    <label>Mot de passe<br/>
                        <input type="password" name="pwd" placeholder="Votre mot de passe" required/>
                    </label><br/>
                    <input type="submit" name="Connexion" value="se connecter" />
                </form>

                <Link to ='/Inscription'> Créer un compte</Link>
                
                </Col>
            </Row>
            <Row className="link">
                <Col>
                <a href="https://www.ahgency.be" rel="noreferrer" target="_blank"><HiArrowNarrowLeft/> Retourner sur le site</a>
                </Col>
            </Row>
        </Container>
        
    </div>
  )
}
