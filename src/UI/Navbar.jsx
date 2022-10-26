import classes from "./Navbar.module.css";
import Keep from "../assets/svg/Keep.svg";
import { useScrollbarPosition } from "../hooks/use-scrollbar-position";

const Navbar = () => {
  const { scrollY } = useScrollbarPosition();

  return (
    <nav className={`${classes.navbar} ${scrollY !== 0 && classes.shadow}`}>
      <div className={classes.section}>
        <a href="#">
          <img className={classes.icon} src={Keep} />
          <span className={classes["project-name"]}>React Keep</span>
        </a>
      </div>
      <div className={classes.section}>[search_bar]</div>
      <div className={classes.section}>[user_image]</div>
    </nav>
  );
};

export default Navbar;
