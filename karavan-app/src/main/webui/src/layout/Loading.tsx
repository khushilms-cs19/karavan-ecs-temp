import React, { useEffect } from 'react'
import './Loading.css'
import { LoadingProps } from '../components/LoginWrapper'
import deploymentImg from '../resources/project-launch.png'
import scaleImg from '../resources/scale.png'
import approachImg from '../resources/decision-making.png'
import monitorImg from '../resources/system.png'
import genaiImg from '../resources/genai.png'
import boxImg from '../resources/box.png'
import deployImg from '../resources/deployment.png'
import logicGPTImg from '../resources/logicGPT.png'
import routesImg from '../resources/routes.png'
import quarkusImg from '../resources/quarkus.png'
import springBootImg from '../resources/spring-boot.png'
import routeBGImg from '../resources/routeBG.svg'
import bgModuleImg from '../resources/bg-module1.svg'
import Icon from '../Logo'

interface DataStructure {
  title: string
  description: string
  imgSrc: string
}

const LoadingPage: React.FC<LoadingProps> = ({ onLogin, isLoading, errorMsg }) => {
  const data: DataStructure[] = [
    {
      title: 'Tested Reusable Components',
      description: 'are pre-built software modules that have been rigorously tested, validated, and documented. They can be integrated into different applications or systems to save development time and improve performance while minimizing errors or bugs.',
      imgSrc: boxImg
    },
    {
      title: 'Easy Business Logic',
      description: "Easy Business Logic is a no-code workflow automation platform offered by GenAI integrated in our platform which allows businesses to streamline their operations, automate repetitive tasks, and improve efficiency without requiring any coding skills. It offers customizable templates, and pre-built connectors, making it easy for businesses to design complex workflows.",
      imgSrc: genaiImg
    },
    {
      title: 'Purely Focus on Business Logic',
      description: 'is an approach that separates business logic from technical implementation details, enabling developers to focus on business requirements without worrying about technical complexities. This approach improves maintainability, scalability, and flexibility of software systems.' ,
      imgSrc: logicGPTImg
    },
    {
      title: 'Self-Explaining Visualization',
      description: 'which presents complex datas in a simple and intuitive visual format, eliminating the need for additional explanations. It helps users to quickly and easily understand the information, make informed decisions, and take appropriate actions.',      
      imgSrc: routesImg
    },
    {
      title: 'Deployments Made Simple',
      description: "the deployment of software applications or updates. It automates the deployment process, reduces the risk of errors, and improves the speed of deployment, making it easier for developers to deliver high-quality software to production.",
      imgSrc: deployImg
    },
    {
      title: 'Purely Focus on Business Logic',
      description: 'is an approach that separates business logic from technical implementation details, enabling developers to focus on business requirements without worrying about technical complexities. This approach improves maintainability, scalability, and flexibility of software systems.' ,
      imgSrc: logicGPTImg
    },
  ]

  const randomIndex = Math.floor(Math.random() * data.length);
  useEffect(() => {
    onLogin()
  }, []);

  return (
    <div className="LoadingPage"  style={{fontFamily:'Mckinsey-Sans-Regular'}}>
      <div className="content">
        {Icon()}
        <h2>Welcome to Mckinsey Karavan</h2>
        <h1>{data[randomIndex].title}</h1>
        <div className='info-while-waiting'>
          <img src={data[randomIndex].imgSrc} alt='img' />
          <div>
          <p className='info-while-waiting-para'>{data[randomIndex].description}</p>
          </div>
        </div>
        {errorMsg && <h4 className="error-msg" style={{fontSize:'2rem'}}>{errorMsg}</h4>}
        {errorMsg && <h4 className="error-msg" style={{fontSize:'1rem'}}>Please Wait Retrying for connection.......</h4>}
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </div>
    </div>
  );
}

export default LoadingPage