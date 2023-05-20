import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import Avatar from 'react-avatar';
interface Props {
  setShowMenuModal: (showMenuModal: boolean) => void;
  showMenuModal: boolean;
}

interface State {
  showAccountModal: boolean;
}

class Navbar extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      showAccountModal: false
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {

    const handleClickOutside = (event: any) => {
      if (!event.target.closest('account-modal')) {
        this.setState({ showAccountModal: false });
      }
    }
    if (this.state.showAccountModal) {
      document.addEventListener('click', handleClickOutside, true);
    }
    else {
      document.removeEventListener('click', handleClickOutside, true);
    }

  }

  handleAccountClick = () => {
    // Show dropdown or modal with account info
    
    this.setState({ showAccountModal: !this.state.showAccountModal });
  };

  handleMenuClick = () => {
    this.props.setShowMenuModal(!this.props.showMenuModal);
  };

  handleLogoutClick = () => {
    // Logout
  };

  randomColorHexCode = () => {

    const base = '0123456789ABCDEF';
    let finalCode = '#';
    for (let i = 0; i < 6; i++)
      finalCode += base[Math.floor(Math.random() * base.length)];
    window.sessionStorage.setItem('avatarColor', finalCode);
    return finalCode;
  }

  render() {
    return (
      <div className="navbar">
        <div className='navbar-heading'>
          <div className='navbar-menu' onClick={this.handleMenuClick}>
            <FontAwesomeIcon icon={faBars} fontSize={20} />
          </div>
          <div className='heading-name'>
            <span>Apache Karavan</span>
          </div>
          <div className='heading-div'>
            <span>|</span>
          </div>
          <div className='heading-desc'>
            <span>Your Integration Toolkit</span>
          </div>
        </div>
        <div className='navbar-utils'>
          <div className="my-account-tab">
            <Avatar
              name='Ritvik Mahajan'
              size='40'
              round={true}
              color={window.sessionStorage.getItem('avatarColor') || this.randomColorHexCode()}
              onClick={this.handleAccountClick}
            />
            <span>My Account</span>
          </div>
          {
            this.state.showAccountModal &&
            <div className='account-modal'>
              <div className='black-bg'>
                <Avatar
                  className='avatar'
                  name='Ritvik Mahajan'
                  size='70'
                  round={true}
                  color={window.sessionStorage.getItem('avatarColor') || this.randomColorHexCode()}
                  style={{ transform: 'translate(0, 40%)' }}
                />
                <FontAwesomeIcon className='close-icon' icon={faClose} fontSize={20} color='white' onClick={this.handleAccountClick} />
              </div>
              <div className='account-details'>
                <h1>Ritvik Mahajan</h1>
                <p>Ritvik_Mahajan@mckinsey.com</p>
              </div>
              <div className='account-options'>
                <div className='account-option'>
                  <FontAwesomeIcon icon={faSignOut} fontSize={20} color='white' style={{ cursor: 'pointer' }} onClick={this.handleLogoutClick} />
                  <span>Logout</span>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default Navbar;
