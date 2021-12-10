import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

const InterviewerList = (props)=> {

  const listOfInterviewer = props.interviewers.map((ele) => {
    return <InterviewerListItem key={ele.id}
      name={ele.name} 
      avatar={ele.avatar}
      selected={props.interviewer === ele.id}
      setInterviewer={props.setInterviewer}                                                                                  
      />})
     

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listOfInterviewer}</ul>
    </section>
  )
}

export default InterviewerList;