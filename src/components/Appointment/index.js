import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";




export default function Appointment(props) {
  const { id, time, interview, interviewers, bookInterview, cancelInterview } =
    props;
  const EMPTY = "EMPTY",  SHOW = "SHOW",  CREATE = "CREATE" ,SAVING ="SAVING";
  const DELETING = "DELETING", CONFIRM = "CONFIRM", EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";  
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    if (name && interviewer) {
      const interview = {
        student: name,
        interviewer,
      };
      transition(SAVING);
      bookInterview(id, interview)
        .then(() => transition(SHOW))
        .catch((error) => transition(ERROR_SAVE, true));
    };
  }  

  const confirmation = () => {
    transition(CONFIRM);
  };

  const edit = () => {
    transition(EDIT);
  };

  const cancel = () => {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview && interview.student}
          interviewer={interview && interview.interviewer.id}
          interviewers={interviewers && interviewers}
          onCancel={() => {
            transition(SHOW);
          }}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === CONFIRM && 
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={cancel}
        />
      }
      {mode === DELETING && <Status message="Deleting" />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={confirmation}
          onEdit={edit}
        />
      )}
      {mode === ERROR_SAVE && 
        <Error message="Could not save appoinment" onClose={back} />
      }
      {mode === ERROR_DELETE && 
        <Error
          message="Could not cancel the appoinment"
          onClose={() => {
            transition(SHOW);
          }}
        />
      }
    </article>
  );
}