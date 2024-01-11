import { useEffect, useState } from "react";
import classes from "./IssuesView.module.css";

const IssuesView: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);

    fetch('http://34.0.241.201:3000/issues/all')
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

  return (
    <div className={classes.wrapper}>
      <h1>Existing Issues</h1>

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
    </div>
  )
}

export default IssuesView;