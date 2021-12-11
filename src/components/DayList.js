import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {

  const listOfDay = props.days.map((element) => {
      return <DayListItem key={element.id}
        name={element.name} 
        spots={element.spots} 
        selected={element.name === props.value}
        setDay={props.onChange} />
  })
  return(
    <section className="Day List">
        <h1>Day List</h1>
        <ul>{listOfDay}</ul>
      </section>
  )
}

export default DayList;
