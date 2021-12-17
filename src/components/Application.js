import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";  
import { getAppointmentsForDay, getInterview, getInterviewersForDay} from "helpers/selectors";



export default function Application(props) {
  
    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {},
    });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const bookInterview = (id, interview) => {
    //PUT request for appointment
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview },
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };

        const days = updateSpots(state, appointments);
        setState((prev) => ({ ...prev, appointments, days }));
      });
  };

  const cancelInterview = (id) => {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      const days = updateSpots(state, appointments);
      setState((prev) => ({ ...prev, appointments, days }));
    });
  };

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });  
  
  
    const setDay = (day) => setState({ ...state, day });
  
    useEffect(() => {
      const daysPromise = axios.get("/api/days");
      const appointmentPromise = axios.get("/api/appointments");
      const interviewersPromise = axios.get("/api/interviewers");
      Promise.all([daysPromise, appointmentPromise, interviewersPromise]).then(
        (response) => {
          let days = response[0].data;
          let appointments = response[1].data;
          let interviewers = response[2].data;
          setState((prev) => ({ ...prev, days, appointments, interviewers }));
        }
      );
    }, []);
  
    const updateSpots = (state, appointments) => {
      const days = state.days.map((d) => {
        if (d["name"] === state.day) {
          const appointmentsOfTheDay = d["appointments"].map(id => appointments[id]);
          let updatedSpots = appointmentsOfTheDay.filter((appointment) => appointment["interview"] === null).length;
          return {...d, spots : updatedSpots}
        }
        return d;
      })
      return days;
    };
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
