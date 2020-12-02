import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'
import "../Styles/Matches.scss"
import MatchesCard from './MatchesCard'

function Matches() {
    return (
        <div className="matches">
            <div className="matches_heading">
                <strong>Matches</strong>
            </div>
            <div className="matches_elements">
                <Form.Group className="row_align" as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="4">
                        View Matches For:
                            </Form.Label>
                    <Col lg="8">
                        <Form.Control as="select" defaultValue="Choose..." title="Choose">
                            <option>Singles</option>
                            <option>Doubles</option>
                            <option>Mixed</option>
                        </Form.Control>
                    </Col>
                </Form.Group>
            </div>
            <div className="matches_cards">
                <MatchesCard/>
                <MatchesCard/>
            </div>
        </div>
    )
}

export default Matches
