import React from 'react';
import { apiMap } from './api'
import { genReport } from './funcs';


import 'bootstrap/dist/css/bootstrap.css'
import { Col, Form, Row } from 'react-bootstrap';


class TitleForm extends React.Component {
    constructor(props) {
        super(props);
        this.handlChange = props.value;

    }

    render() {
        return (
            <Form.Group as={Row} className="mb-3" controlId="title">
                <Form.Label column sm="2">Title:</Form.Label>
                <Col sm="10">
                    <Form.Control sm="10" as="input" defaultValue="" onChange={this.handlChange}></Form.Control>
                </Col>
            </Form.Group>
        );
    }
}


class UsrForm extends React.Component {
    constructor(props) {
        super(props);
        this.handlChange = props.value;

    }

    render() {
        return (
            <Form.Group as={Row} className="mb-3" controlId="title">
                <Form.Label column sm="2">Student ID:</Form.Label>
                <Col sm="10">
                    <Form.Control sm="10" as="input" defaultValue="" onChange={this.handlChange}></Form.Control>
                </Col>
            </Form.Group>
        );
    }
}


class AbstForm extends React.Component {
    constructor(props) {
        super(props);
        this.handlChange = props.value;
    }

    render() { 
        return (
            <Form.Group as={Row} className="mb-3" controlId="title">
                <Form.Label column sm="2">Abstract:</Form.Label>
                <Col sm="10">
                    <Form.Control sm="10" as="textarea" onChange={this.handlChange} rows={6}></Form.Control>
                </Col>
            </Form.Group>
        );
    }
}


class DateSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handlChange = props.value;
    }
    render() { 
        return (
            <Form.Group as={Row} className="mb-3" controlId="title">
                <Form.Label column sm="2">Date:</Form.Label>
                <Col sm="10">
                    <Form.Control sm="10" type="date" onChange={this.handlChange}></Form.Control>
                </Col>
            </Form.Group>
        );
    }
}


class ReportUpload extends React.Component {
    state = {
        titl: "",
        date: "",
        abst: "",
        usid: "",
    }

    constructor(props) {
        super(props);
        this.state = {
            titl: "",
            date: "",
            abst: "",
            usid: "",
        };

        this.handleTitle = this.handleTitle.bind(this);
        this.handleUsrId = this.handleUsrId.bind(this);
        this.handleAbstract = this.handleAbstract.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitle(event) {
        this.setState({titl: event.target.value});
    }

    handleUsrId(event) {
        this.setState({usid: event.target.value});
    }

    handleDate(event) {
        this.setState({date: event.target.value});
    }

    handleAbstract(event) {
        this.setState({abst: event.target.value});
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log(genReport(this.state.titl, this.state.date, this.state.abst));
        console.log({id: this.state.usid,})
        const isUsrCorrect = await fetch(apiMap.queryUserCorrect, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: this.state.usid}),
        }).then(resp => resp.json());
        console.log(isUsrCorrect);

        if(isUsrCorrect.res) {
            fetch(apiMap.appendReport, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(genReport(this.state.titl, this.state.date, this.state.abst)),
            })
            .then(resp => resp.json())
            .then(data => window.location.reload())
        } else {
            alert("You are not allowed to add report")
        }
    }

    render() { 
        return (
            <Form onSubmit={this.handleSubmit}>
                <TitleForm value={this.handleTitle} />
                <UsrForm value={this.handleUsrId} />
                <AbstForm value={this.handleAbstract} />
                <DateSelector value={this.handleDate} />
                <input className="form-control" type="submit" value="Submit" />
            </Form>
        );
    }
}
 
export default ReportUpload;