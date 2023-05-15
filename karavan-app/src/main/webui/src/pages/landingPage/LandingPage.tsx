/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import intergrationImg from '../../resources/integration-img.png'
import integrationImg2 from '../../resources/integration-img2.png'
import {KIcon} from './ThreeDIcon';
import deploymentImg from '../../resources/project-launch.png'
import scaleImg from '../../resources/scale.png'
import approachImg from '../../resources/decision-making.png'
import monitorImg from '../../resources/system.png'
import genaiImg from '../../resources/genai.png'
import boxImg from '../../resources/box.png'
import deployImg from '../../resources/deployment.png'
import logicGPTImg from '../../resources/logicGPT.png'
import routesImg from '../../resources/routes.png'
import quarkusImg from '../../resources/quarkus.png'
import springBootImg from '../../resources/spring-boot.png'
import routeBGImg from '../../resources/routeBG.svg'
import bgModuleImg from '../../resources/bg-module1.svg'
import Icon from '../../Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './LandingPage.css';

interface Props {}

interface State {}

export class LandingPage extends Component<Props, State> {
  render() {
    const developers = [ 'Durga P Menon', 'Khushil Sindwad', 'Madhumilind Toraskar', 'Mehak Noor Singh Kang', 
                        'Samrat Das', 'Samim Hossain Mondal', 'Sanket Shivam', 'Shashwath S K', 'Shivam Mahajan'];

    const uses = ['Built-in support for service discovery, load balancing, fault tolerance, and routing, eliminating the need for developers to manage the underlying infrastructure complexities',
                        'Highly scalable and reliable, with features such as automatic load balancing and failover, intelligent routing, and support for distributed caching',
                        'Unified approach to application deployment and management, allowing developers to easily deploy and manage their applications across different environments',
                        'Comprehensive monitoring and observability features that help developers gain insight into their applications\' performance, health, and status'];
    
    const usesImg = [deploymentImg, scaleImg, approachImg, monitorImg];

    return (
      <div className='landing-page'>
        <div className="lp-navbar">
          <div className="lp-navbar-brand">
            <div className='logo-app'>{Icon()}</div>
            <a>apache </a>
            <b>karavan</b>
          </div>
          <div className="lp-navbar-menu">
            <a>About us</a>
          </div>
        </div>
        <div className="lp-pre-content" style={{ background: `url(${bgModuleImg})`, backgroundSize: 'contain' , backgroundPosition:'center top'}}>
        <div className="lp-content">
          <div className='lp-content-left'>
            <div className='lp-content-img-1'>
              <img src={`${intergrationImg}`} alt="Apache Software Foundation" />
            </div>
            <div className='lp-content-img-2'>
              <div>
                <div className='lp-making'>
                  <a>Making</a>
                </div>
                <div className='lp-integration'>
                  <a>Integration</a>
                </div>
                <div className='lp-easy'>
                  <a>Easy !</a>
                </div>
              </div>
              <img src={`${integrationImg2}`} alt="Apache Software Foundation" />
            </div>
          </div>
          <div className='lp-content-right'>
            <div className='lp-content-title'>
            <div className='lp-content-brand'>
              <a>Apache Karavan</a>
            </div>
            <div>
              <KIcon />
            </div>
            </div>
            <div className='lp-btns'>
            <Link to='/projects'>
              <div className='get-started-btn'>
                <button> 
                  Go To Dashboard &nbsp;
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
             </Link>
              <div className='tutorial-btn'>
                <button> Tutorial </button>
              </div>
            </div>
            <div className='lp-content-description'>
              <a style={{background:'blur'}}>
                Presenting an integration toolkit designed to simplify the development and 
                deployment of distributed systems and microservices.
              </a>
            </div>
          </div>
        </div>
        </div>
        <div className='lp-details'>
          <div className='lp-use-for'>
            <a>Use it for :</a>
          </div>
          <div className='lp-use-for-description'>
          {
            uses.map((use, index) => {
              return (
                <div className='lp-card'>
                  <div className='lp-card-img'>
                    <img src={`${usesImg[index]}`} alt="Apache Software Foundation" />
                  </div>
                  <div className='lp-card-text'>
                    <a>{use}</a>
                  </div>
                </div>
              )
            })
          }
        </div> 
      </div>
        <div>
          <div className='lp-genai'>
            <div className='lp-genai-text-box'>
              <div className='lp-genai-text'>
                <div className='lp-genai-text-1'>  
                  <b>"Easy Business Logic</b>
                </div>
                <div className='lp-genai-text-2'>
                  <b>With GenAI</b>
                </div>
              </div>
              <div className='lp-genai-text-3'>
                <b>
                Easy Business Logic is a no-code workflow automation platform offered by GenAI integrated in our platform
                which allows businesses to streamline their operations, automate repetitive tasks, and 
                improve efficiency without requiring any coding skills. It offers customizable templates, and 
                pre-built connectors, making it easy for businesses to design complex workflows. 
                Additionally, it provides real-time analytics and insights to help businesses make data-driven decisions.
                </b>
              </div>
            </div>
            <div className='lp-genai-img'>
              <img src={`${genaiImg}`} alt="Apache Software Foundation" />
            </div>
          </div>
        </div>
        <div className='lp-features'>
          <div className='lp-features-title'>
            <b>Features</b>
          </div>
          <div className='lp-features-description' style={{ backgroundSize: 'contain' }}>
          <img src={`${routeBGImg}`} alt="Apache Software Foundation" className='lp-features-bg'/>
            <div className='lp-features-description-box'>
              <div className='lp-features-description-1-img'>
                <img src={`${boxImg}`} alt="Apache Software Foundation" />
              </div>
              <div className='lp-features-description-text'>
                <div className='lp-features-text-heading'>
                  <b>Tested Reusable Components</b>
                </div>
                <div className='lp-features-text-body'>
                  <b>
                  are pre-built software modules that have been 
                  rigorously tested, validated, and documented. They can be integrated 
                  into different applications or systems to save development time and 
                  improve performance while minimizing errors or bugs.
                  </b>
                </div>
              </div>
            </div>
            <div className='lp-features-description-box'>
              <div className='lp-features-description-text'>
                <div className='lp-features-text-heading'>
                  <b>Purely Focus on Business Logic</b>
                </div>
                <div className='lp-features-text-body'>
                  <b>
                  is an approach that separates business logic 
                  from technical implementation details, enabling developers to focus on 
                  business requirements without worrying about technical complexities. 
                  This approach improves maintainability, scalability, and flexibility of software systems.
                  </b>
                </div>
              </div>
              <div className='lp-features-description-img'>
                <img src={`${logicGPTImg}`} alt="Apache Software Foundation" />
              </div>
            </div>
            <div className='lp-features-description-box'>
              <div className='lp-features-description-img'>
                <img src={`${routesImg}`} alt="Apache Software Foundation" />
              </div>
              <div className='lp-features-description-text'>
                <div className='lp-features-text-heading'>
                  <b>Self-Explaining Visualization</b>
                </div>
                <div className='lp-features-text-body'>
                  <b>
                  which presents complex datas in a simple 
                  and intuitive visual format, eliminating the need for additional explanations. 
                  It helps users to quickly and easily understand the information, make informed 
                  decisions, and take appropriate actions.
                  </b>
                </div>
              </div>
            </div>
            <div className='lp-features-description-box'>
              <div className='lp-features-description-text'>
                <div className='lp-features-text-heading'>
                  <b>Deployments Made Simple</b>
                </div>
                <div className='lp-features-text-body'>
                  <b>
                  the deployment of software applications or updates. 
                  It automates the deployment process, reduces the risk of errors, and 
                  improves the speed of deployment, making it easier for developers to 
                  deliver high-quality software to production.
                  </b>
                </div>
              </div>
              <div className='lp-features-description-img'>
                <img src={`${deployImg}`} alt="Apache Software Foundation" />
              </div>
            </div>
          </div>
        </div>
        <div className='lp-last-section'>
          <div className='lp-last-section-text'>
            <b>Supports Production Ready Integrations and deployment with both</b>
          </div>
          <div className='lp-last-section-img'>
            <div className='lp-last-section-img-quarkus'>
              <img src={`${quarkusImg}`} alt="Apache Software Foundation" />
            </div>
            <div className='lp-last-section-img-spring'>
              <img src={`${springBootImg}`} alt="Apache Software Foundation" />
            </div>
          </div>
        </div>
        <div className='lp-footer'>
          <div className='lp-footer-text'>
            <b>About us</b>
          </div>
          <div className='lp-footer-developers'>
            {
            developers.map((developer, index) => {
              return (
                <div className='lp-footer-profile'>
                  <div className='lp-footer-profile-img'>
                    <img src='https://static-cdn.jtvnw.net/jtv_user_pictures/1d56d2fd-a2d5-4325-a4f7-6152ca7c9029-profile_image-300x300.png' alt="Apache Software Foundation" />
                  </div>
                  <div className='lp-footer-profile-text'>
                    <b>{developer}</b>
                  </div>
                </div>
              )})
            }
          </div>
        </div>
      </div>
    );
  }
}