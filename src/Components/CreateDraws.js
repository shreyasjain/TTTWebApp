import React from 'react'
import "../Styles/CreateDraws.scss"
import { Row, Col, Form } from 'react-bootstrap'
import CreateDrawCard from './CreateDrawCard'
import "../Styles/CreateDraws.scss"

function CreateDraws() {
    return (
        <div className="create_draws">
            <div className="create_draws_heading">
                <strong>Create Draws</strong>
            </div>
            <div className="create_draws_top_elements">
                <Form.Group className="row_align" as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                        Match type:
                            </Form.Label>
                    <Col lg="10">
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Form.Group controlId="formBasicSearch">
                    <Form.Control type="email" placeholder="Search" />
                </Form.Group>
            </div>
            <div className="create_draws_cards">
                    <CreateDrawCard/>
                    <CreateDrawCard/>
                    <CreateDrawCard/>
            </div>
        </div>
    )
}

export default CreateDraws 
