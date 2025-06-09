import { FaUserCircle, FaCommentDots, FaEnvelope, FaQuestionCircle } from 'react-icons/fa';
import { MdOutlineSearch, MdPeopleAlt } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <FaUserCircle className="sidebar-profile-icon" />
        <span className="sidebar-username">Tanvir</span>
      </div>

      <div className="tag-search-card">
        <MdOutlineSearch className="tag-icon" />
        <input type="text" placeholder="Search tags..." className="tag-search-input" />
      </div>

      <div className="sidebar-links">
        <div onClick={() => navigate('/alumni')} className="sidebar-link">
          <MdPeopleAlt className="link-icon" />
          <span>Alumni Page</span>
        </div>
        <div onClick={() => navigate('/complain')} className="sidebar-link">
          <FaCommentDots className="link-icon" />
          <span>Complain Box</span>
        </div>
        <div onClick={() => navigate('/messages')} className="sidebar-link">
          <FaEnvelope className="link-icon" />
          <span>Messages</span>
        </div>
        <div onClick={() => navigate('/help')} className="sidebar-link">
          <FaQuestionCircle className="link-icon" />
          <span>Help</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
