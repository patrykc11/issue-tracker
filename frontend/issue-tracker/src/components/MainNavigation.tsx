import { Link, NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

const MainNavigation: React.FC = () => {
  return (
    <header className={classes.wrapper}>
      <Link to="/"><div className={classes.logo}><h1 className={classes.title}>Issue Tracker</h1></div></Link>
      <nav className={classes.mainNav}>
        <ul>
          <li>
            <NavLink to="/">
              <button className={classes.button}>Main Page</button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/issues">
              <button className={classes.button}>Issues</button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;