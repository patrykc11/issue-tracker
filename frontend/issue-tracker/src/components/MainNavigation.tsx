import { Link, NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

const MainNavigation: React.FC = () => {
  return (
    <header className={classes.wrapper}>
      <Link to="/"><div className={classes.logo}><h1>Issue Tracker</h1></div></Link>
      <nav className={classes.mainNav}>
        <ul>
          <li>
            <NavLink to="/">
              <button className={classes.button}>Strona Główna</button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/onas">
              <button className={classes.button}>O nas</button>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;