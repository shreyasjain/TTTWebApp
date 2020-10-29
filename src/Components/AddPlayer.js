import React from 'react'
import "../Styles/AddPlayer.scss"
import { Button, Form, Row, Col } from 'react-bootstrap'

function AddPlayer() {
    return (
        <div className="addPlayer">
            <div className="addPlayers_heading">
                <strong>Add Player</strong>
            </div>
            <div className="myProfile_dp">
                <div className="myProfile_pic">
                    <img src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt="profile pic" />
                </div>
                <a href="http://www.google.com">Add image</a>
            </div>
            <div className="addPlayer_form">
                <div className="addPlayer_form_contents">
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="row_align" as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Gender
                            </Form.Label>
                            <Col lg="10">
                                <Form.Control as="select" defaultValue="Choose...">
                                    <option>Choose...</option>
                                    <option>...</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group className="row_align" as={Row} controlId="formHorizontalEmail">
                            <Col lg={1}>
                                <Form.Control type="number" placeholder="age" />
                            </Col>
                            <Form.Label column sm={3}>
                                years old
                            </Form.Label>
                        </Form.Group>
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </div>
            </div>

        </div>
    )
}

export default AddPlayer
