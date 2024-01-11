import IssueForm, { IssueFormData } from "../../components/IssueForm/IssueForm";
import classes from "./MainView.module.css";

const MainView: React.FC = () => {

  const onSubmit = (formData: IssueFormData) => {
    // request here
    console.log('form data: ', formData);
  }

  return (
    <div className={classes.wrapper}>
      <h1>Add new issue</h1>
      <IssueForm onSubmit={onSubmit}/>
    </div>
  )
}

export default MainView;