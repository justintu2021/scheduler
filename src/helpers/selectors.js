export function getAppointmentsForDay(state, day) {

  const filterDay = state.days.filter(d => d.name === day)
  const apptsForDay = (filterDay.length) ? filterDay[0].appointments : [];
  const arrApptObjs = apptsForDay.map(id => state.appointments[id]);
  
  return arrApptObjs;
}


// returns interview Obj {student:Str, interviewer: {...}} that updates id with corresponding interviewer obj
export function getInterview(state, interview) {
  if (!interview) return null;

  const id = interview.interviewer;
  interview.interviewer = { ...state.interviewers[id] }
  return interview;
}

// returns array of interviewer objects for day (to be sent to Form component)
export const getInterviewersForDay = (state,day) => {
  const filteredDay = state.days.find(d => d["name"] === day);
  
  if(!filteredDay) {
    return [];
  }
  const interviewerArray = filteredDay['interviewers'];
  const interviewersOnDay = interviewerArray.map(person => state.interviewers[person] )
  return interviewersOnDay;
 }


