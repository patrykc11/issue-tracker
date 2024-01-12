import React, { useState, ChangeEvent, FormEvent } from 'react';
import classes from "./IssueForm.module.css";
import { useNavigate } from 'react-router-dom';

export interface IssueFormData {
  title: string;
  description: string;
  priority: string;
  deadline: string;
}



const IssueForm: React.FC= () => {
  const [formData, setFormData] = useState<IssueFormData>({
    title: '',
    description: '',
    priority: 'low',
    deadline: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const mapFormData = (formData: IssueFormData) => {
    console.log(formData.deadline);

    const data = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      deadline: convertStringToDate(formData.deadline)
    }

    return data;
  }

  const onSubmit = (formData: IssueFormData) => {
    const data = mapFormData(formData);

    setLoading(true);

    fetch('http://34.116.174.69/issues/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if(!response.ok) {
        throw new Error('Something went wrong!');
      }
      return response.json()
    })
    .then(() => {
      setFormData({
        title: '',
        description: '',
        priority: 'low',
        deadline: '',
      });

      navigate('/issues')
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    })
  }

  const convertStringToDate = (dateString: string): Date | null => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

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
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default IssueForm;
