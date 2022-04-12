import React from "react";
import { Collapse, Card, CardGroup } from "react-bootstrap"

import { apiMap } from "./api";

function MiniAbsItem(props) {
    const [open, setOpen] = React.useState(false);
    let absitem = props.absItem;
    return (
            <Card>
                <Card.Header
                    onClick={() => setOpen(!open)}
                    aria-controls={"carbodyof" + absitem.date}
                >{absitem.date} <span className="miniAbsTitle">{absitem.title}</span></Card.Header>
                <Collapse in={open}>
                <Card.Body id={"carbodyof" + absitem.date}>
                    <Card.Text className="display-p">
                        {absitem.abstract}
                    </Card.Text>
                    <a href={apiMap.querySlidesByUptime(absitem.uptime)}>
                        See Slides
                    </a>
                </Card.Body>
                </Collapse>
            </Card>
    )
    
}


class PastRepList extends React.Component {
    state = {reps: []}

    constructor(props) {
        super(props);
        this.state = {reps: []};
    }

    componentDidMount() {
        fetch(apiMap.queryPastReports)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            this.setState({reps: data});
        });
    }

    render() {
        let dt = this.state.reps;
        if (dt.length == 0){
            return <div></div>
        }
        return (
            <ul>
                {dt.map((e) => <MiniAbsItem absItem={e} key={e.uptime}/>)}
            </ul>
        );
        // return <div></div>
    }
}
 
export default PastRepList;