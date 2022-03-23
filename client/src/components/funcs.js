export function getTimestamp() {
    return Date.now();
}


export function getDate() {
    return Date();
}


export function genCommentItem(text) {
    return {
        time: getTimestamp(),
        date: getDate(),
        content: text,
    };
}

export function genReport(titl, date, abst) {
    return {
        title: titl,
        abstract: abst,
        uptime: getTimestamp(),
        date: date,
        comment: []
    }
}
