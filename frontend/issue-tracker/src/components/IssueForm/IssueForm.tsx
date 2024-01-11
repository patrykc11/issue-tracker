import React, { useState, ChangeEvent, FormEvent } from 'react';
import classes from "./IssueForm.module.css";

interface IssueFormProps {
  onSubmit: (formData: IssueFormData) => void;
}

export interface IssueFormData {
  title: string;
  description: string;
  priority: string;
  deadline: string;
}

const IssueForm: React.FC<IssueFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<IssueFormData>({
    title: '',
    description: '',
    priority: 'low',
    deadline: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <label className={classes.label}>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} className={classes.input} />
      </label>
      <br />
      <label className={classes.label}>
        Description:
        <textarea name="description" value={formData.description} onChange={handleInputChange} className={classes.input} />
      </label>
      <br />
      <label className={classes.label}>
        Priority:
        <select name="priority" value={formData.priority} onChange={handleSelectChange} className={classes.input}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <br />
      <label className={classes.label}>
        Deadline:
        <input type="datetime-local" name="deadline" value={formData.deadline} onChange={handleInputChange} className={classes.input} />
      </label>
      <br />
      <button type="submit" className={classes.button}>Submit</button>
    </form>
  );
};

export default IssueForm;
