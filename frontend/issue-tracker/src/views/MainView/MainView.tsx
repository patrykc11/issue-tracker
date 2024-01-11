import { useState } from "react";
import IssueForm, { IssueFormData } from "../../components/IssueForm/IssueForm";
import classes from "./MainView.module.css";

const MainView: React.FC = () => {
  return (
    <div className={classes.wrapper}>
      <h1>Add new issue</h1>
      <IssueForm />
    </div>
  )
}

export default MainView;