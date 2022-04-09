import React from "react";
import { apiMap } from "./api";


function CommentItem(props) {
    let commentItem = props.commentItem;
    return (
        <div className="card">
            <div className="card-header">
                {commentItem.date}
            </div>
            <div className="card-body">
                <p className="card-text">{commentItem.content}</p>
            </div>
        </div>
    )
}


function CommentList(props) {
    if (props.commentList.length === 0) {
        return <div></div>
    };
    return (
        <div>
            {  
                props.commentList.map((item) => <CommentItem key={item.time} commentItem={item}/>)
            }
        </div>

    )
}



class Board extends React.Component{
    constructor(props) {
        super(props);
        this.state = {report: {
            title: "",
            abstract: "",
            uptime: 0,
            date: "",
            comment: []
        }};
    }

    componentDidMount() {
        fetch(apiMap.queryLatestReport)
            .then(resp => resp.json())
            .then(data => {
                this.setState({report: data}); 
            });
    }

    render(){
        let report = this.state.report;
        return (
            <div>
            <h1 className="display-1 text-center">{report.title}</h1>
            <p className="display-4 text-end">At {report.date}</p>
            <p className="display-p">
                {report.abstract}
            </p>
            <CommentList commentList={report.comment}/>
            
            </div>
        );
    }
}

export default Board