import { useState } from 'react' // ⬅️ Add this at the top if not already there
import { useNavigate } from 'react-router-dom'
import { FaHome, FaBell, FaUserCircle } from 'react-icons/fa'
import { MdEventNote, MdOutlineDashboard } from 'react-icons/md'
import './Navbar.css'

const Navbar = () => {
    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);


    return (
        <nav className="navbar">
            <div className="navbar-left">
                <div className="logo" onClick={() => navigate('/')}>🌟 SUST</div>
                <input type="text" className="search-bar" placeholder="Search..." />
            </div>

            <div className="navbar-center">
                <FaHome className="icon" onClick={() => navigate('/')} />
                <MdOutlineDashboard className="icon" onClick={() => navigate('/event')} />
                <MdEventNote className="icon" onClick={() => navigate('/notice')} />
            </div>

            <div className="navbar-right">
                <div className="notification-container" onClick={() => setNotificationOpen(prev => !prev)}>
                    <FaBell className="icon" />
                    {notificationOpen && (
                        <div className="notification-dropdown">
                            <div className="notification-item">
                                <strong>New Event</strong>
                                <p>Hackathon starts this Friday</p>
                            </div>
                            <div className="notification-item">
                                <strong>Notice Board</strong>
                                <p>Class routine updated for CSE</p>
                            </div>
                            <div className="notification-item">
                                <strong>Meeting</strong>
                                <p>Join the departmental meeting at 4PM</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="profile-container" onClick={() => setDropdownOpen(prev => !prev)}>
                    <FaUserCircle className="profile-icon" />
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <div className="dropdown-item" onClick={() => navigate('/profile')}>Profile</div>
                            <div className="dropdown-item" onClick={() => navigate('/settings')}>Settings</div>
                            <div className="dropdown-item" onClick={() => alert('Logging out...')}>Logout</div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
