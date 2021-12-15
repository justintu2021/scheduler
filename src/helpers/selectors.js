export function getAppointmentsForDay(state, day) {

  const filterDay = state.days.filter(d => d.name === day)
  const apptsForDay = (filterDay.length) ? filterDay[0].appointments : [];
  const arrApptObjs = apptsForDay.map(id => state.appointments[id]);
  return arrApptObjs;
}

  