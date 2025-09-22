export default function Header(){
    return (
        <aside id="sidebar" className="sidebar">
        <div className="sidebar-header">
            <div className="logo">
                <a href="/" className="logo-link">
                    <span className="logo-icon">📁</span>
                    <span className="logo-text">FTP Manager</span>
                </a>
            </div>
            <button className="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle sidebar menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
        
        <nav className="sidebar-nav">
            <ul className="nav-list">
                <li className="nav-item active">
                    <a href="#" className="nav-link">
                        <span className="nav-icon">📄</span>
                        <span className="nav-text">Arquivos</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <span className="nav-icon">🎓</span>
                        <span className="nav-text">Treinamentos</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <span className="nav-icon">📚</span>
                        <span className="nav-text">Documentação</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <span className="nav-icon">❓</span>
                        <span className="nav-text">Help</span>
                    </a>
                </li>
            </ul>
        </nav>
        
        <div className="sidebar-footer">
            <div className="user-profile" id="user-profile">
                <div className="user-avatar">
                    <span>👤</span>
                </div>
                <div className="user-info">
                    <span className="user-name">Usuário</span>
                    <span className="user-role">Admin</span>
                </div>
                <div className="dropdown-arrow">
                    <span>▼</span>
                </div>
            </div>
            <div className="user-dropdown" id="user-dropdown">
                <ul className="dropdown-menu">
                    <li className="dropdown-item">
                        <a href="#" className="dropdown-link" id="logout-btn">
                            <span className="dropdown-icon">🚪</span>
                            <span className="dropdown-text">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
    )
}