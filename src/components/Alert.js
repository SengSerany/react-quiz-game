import React from "react";

export default function Alert({alertOn}) {
    
    return (
        <div className= {alertOn ? "alert" : "alert unshow"}>You must select one answer on each question :o..</div>
    )
}