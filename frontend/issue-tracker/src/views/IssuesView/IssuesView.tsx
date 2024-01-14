import { useEffect, useState } from "react";
import classes from "./IssuesView.module.css";

const IssuesView: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [selectedStatus, setSelectedStatus] = useState<string>('open');

  useEffect(() => {
    setLoading(true);

    fetch('http://34.116.174.69/issues/all')
    .then(response => {
      if(!response.ok) {
        throw new Error('Something went wrong!');
      }
      return response.json()
    })
    .then(data => {
      setResults(data);
      setLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    })
  }, [])

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);

    fetch(`http://34.116.174.69/issues/all/${newStatus}`)
      .then((response) => {
        if(!response.ok) {
          throw new Error('Something went wrong!');
        }
        return response.json()
      })
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };


  return (
    <div className={classes.wrapper}>
      <h1>Existing Issues</h1>

      <div>
        <label>Status:</label>
        <select value={selectedStatus} onChange={handleStatusChange}>
          <option value="open">Open</option>
          <option value="close">Close</option>
        </select>
      </div>

      {results.length > 0 && results.map((result) => {
        return (
          <div className={classes.result} key={result.id}>
            <p className={classes.title}>{result.title}</p>
            <p className={classes.subtitle}>{result.description}</p>
            <p>priority: {result.priority}</p>
            <p>status: {result.status}</p>
            <p>deadline: {result.deadline && new Date(result.deadline).toLocaleDateString()}</p>
          </div>
        )
      })}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  )
}

export default IssuesView;