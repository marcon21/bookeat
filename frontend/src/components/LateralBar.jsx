export default function LateralBar() {
    return (
            <>
                <div className="l-navbar" id="nav-bar">
                    <nav className="nav">
                        <div>   
                            <a href="#" className="nav_logo"> 
                                <i className='bx bx-user nav_logo-icon'></i> <span className="nav_logo-name">UserName</span> 
                            </a>
                            <div className="nav_list">
                                <a href="#" className="nav_link active"> 
                                    <i className='bx bx-heptagon nav_icon'></i> <span className="nav_name">Antipasti</span> 
                                </a> 
                                <a href="#" className="nav_link"> 
                                    <i className='bx bx-dice-1 nav_icon'></i> <span className="nav_name">Primi</span> 
                                </a> 
                                <a href="#" className="nav_link"> 
                                    <i className='bx bx-dice-2 nav_icon'></i> <span className="nav_name">Secondi</span> 
                                </a> 
                                <a href="#" className="nav_link"> 
                                    <i className='bx bx-dice-3 nav_icon'></i> <span className="nav_name">Pizza</span> 
                                </a> 
                                <a href="#" className="nav_link"> 
                                    <i className='bx bx-tencent-qq nav_icon'></i> <span className="nav_name">Dolci</span> 
                                </a> 
                                <a href="#" className="nav_link"> 
                                    <i className='bx bx-cup-straw nav_icon'></i> <span className="nav_name">Bevande</span> 
                                </a> 
                            </div>
                        </div>

                        //aggiungere logo bookeat

                        <a href="#" className="nav_link"> 
                            <i className='bx bx-log-out nav_icon'></i> <span className="nav_name">SignOut</span> 
                        </a>
                        <a href="#" className="nav_link"> 
                            <i className='bx bx-gear-fill nav_icon'></i> <span className="nav_name">Settings</span> 
                        </a>
                    </nav>
                </div>
            </>
        )
    }       