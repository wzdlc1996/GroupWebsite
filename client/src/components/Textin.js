import React from "react";
import { apiMap } from "./api";

import 'bootstrap/dist/css/bootstrap.css'


function getTimestamp() {
    return Date.now();
}


function getDate() {
    return Date();
}


function genCommentItem(text) {
    return {
        time: getTimestamp(),
        date: getDate(),
        content: text,
    };
}


class Textin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(genCommentItem(this.state.value));
        fetch(apiMap.appendCommentToLatestReport, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(genCommentItem(this.state.value)),
        })
        .then(resp => resp.json())
        .then(data => window.location.reload())
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-group">
                    <span className="input-group-text">Comment: </span>
                    <textarea className="form-control"  aria-label="Comment:" type="text" value={this.state.value} onChange={this.handleChange} />
                    <input className="form-control" type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}

export default Textin