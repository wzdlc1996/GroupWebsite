import React from 'react';
import { apiMap } from './api'
import { genReport } from './funcs';


import 'bootstrap/dist/css/bootstrap.css'
import { Col, Form, Row } from 'react-bootstrap';


class TitleForm extends React.Component {
    constructor(props) {
        super(props);
        this.handlChange = props.value;
        this.name = props.name;

    }

    render() {
        return (
            <Form.Group as={Row} className="mb-3" controlId="title">
                <Form.Label column sm="2">Title:</Form.Label>
                <Col sm="10">
                    <Form.Control sm="10" as="input" defaultValue="" onChange={this.handlChange} name={this.name}></Form.Control>
                </Col>
            </Form.Group>
        );
    }
}


class UsrForm extends React.Component {
    constructor(props) {
        super(props);
        this.handlChange = props.value;
        this.name = props.name;

    }

    render() {
        return (
            <Form.Group as={Row} className="mb-3" controlId="title">
                <Form.Label column sm="2">Student ID:</Form.Label>
                <Col sm="10">
                    <Form.Control sm="10" as="input" defaultValue="" onChange={this.handlChange} name={this.name}></Form.Control>
                </Col>
            </Form.Group>
        );
    }
}


class AbstForm extends React.Component {
    constructor(props) {
        super(props);
        this.handlChange = props.value;
        this.name = props.name
    }

    render() { 
        return (
            <Form.Group as={Row} className="mb-3" controlId="title">
                <Form.Label column sm="2">Abstract:</Form.Label>
                <Col sm="10">
                    <Form.Control sm="10" as="textarea" onChange={this.handlChange} rows={6} name={this.name}></Form.Control>
                </Col>
            </Form.Group>
        );
    }
}


class SlidesForm extends React.Component {
    constructor(props) {
        super(props);
        this.handlChange = props.value;
        this.name = props.name;
    }

    render() { 
        return (
            <Form.Group as={Row} className="mb-3" controlId="title">
                <Form.Label column sm="2">Upload Slides:</Form.Label>
                <Col sm="10">
                    <Form.Control sm="10" type="file" onChange={this.handlChange} rows={6} name={this.name}></Form.Control>
                </Col>
            </Form.Group>
        );
    }
}


class DateSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handlChange = props.value;
        this.name = props.name;
    }
    render() { 
        return (
            <Form.Group as={Row} className="mb-3" controlId="title">
                <Form.Label column sm="2">Date:</Form.Label>
                <Col sm="10">
                    <Form.Control sm="10" type="date" onChange={this.handlChange} name={this.name}></Form.Control>
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
        slds: null,
    }

    constructor(props) {
        super(props);
        this.state = {
            titl: "",
            date: "",
            abst: "",
            usid: "",
            slds: null,
        };

        this.unifiedHandler = this.unifiedHandler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    unifiedHandler(event) {
        const target = event.target;
        let value;
        switch (target.type) {
            case "checkbox":
                value = target.checked;
                break;
            case "file":
                value = target.files[0];
                break;
            default:
                value = target.value;
                break;
        }
        const name = target.name;
        this.setState({
            [name]: value
        });
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

        if (!isUsrCorrect.res) {
            alert("You are not allowed to add report");
            return;
        }

        const rep = genReport(this.state.titl, this.state.date, this.state.abst);
        const uptime = rep.uptime;

        let frm = new FormData();
        frm.append("file", this.state.slds);
        frm.append("data", JSON.stringify(rep));
        
        fetch(apiMap.appendReport, {
            method: "POST",
            //headers: {"Content-Type": "multipart/form-data"},
            body: frm,
        })
        .then(resp => resp.json())
        .then(data => window.location.reload())
    }

    render() { 
        return (
            <Form onSubmit={this.handleSubmit}>
                <TitleForm value={this.unifiedHandler} name="titl" />
                <UsrForm value={this.unifiedHandler} name="usid" />
                <AbstForm value={this.unifiedHandler} name="abst" />
                <DateSelector value={this.unifiedHandler} name="date" />
                <SlidesForm value={this.unifiedHandler} name="slds" />
                <input className="form-control" type="submit" value="Submit" />
            </Form>
        );
    }
}
 
export default ReportUpload;