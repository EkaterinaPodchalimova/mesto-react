import headerLogo from '../images/logo_white.svg';

function  Header() {
    return(
        <header className="header">
            <img className="logo" src={headerLogo} alt="логотип Место" />
        </header>
    )
}

export default Header;