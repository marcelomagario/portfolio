import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink 
                        to="/" 
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/portfolio" 
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                    >
                        Portfolio
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/blog" 
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                    >
                        Blog
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/contact" 
                        className={({ isActive }) => isActive ? 'active-link' : ''}
                    >
                        Contact
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;