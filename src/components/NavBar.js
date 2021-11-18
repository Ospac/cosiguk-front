import styles from './Navbar.module.css'
import {NavBarData} from './NavBarData.js'
import {Link} from "react-router-dom";
import { IconContext } from 'react-icons';


//useState로 버튼 활성화 상태 관리하기

function NavBar (){
    return(
        <div className={styles.navContainer}>
            <div className={styles.logoTitle}>
                <Link to ={"/"}>
                    <span className={styles.logoText}>코로나19 현황</span>
                </Link>
            </div>
            <nav className={styles.navbar}>
                <ul className={styles.navMenuItems}>
                    {NavBarData.map((item, index)=>{
                    return(
                        <li key={index} className={styles.navText}>
                            <Link to = {item.path}>
                                <span className={styles.navIcon}>{item.icon}</span>
                                <span className={styles.navTitle}>{item.title}</span>
                            </Link>
                        </li>
                    )})}
                </ul>
            </nav>
        </div>
    )
}
export default NavBar;
