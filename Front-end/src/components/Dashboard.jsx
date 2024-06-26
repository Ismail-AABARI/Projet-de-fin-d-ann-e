import React, { useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  useEffect(() => {
    const btn_menu = document.querySelector('.btn-menu');
    const side_bar = document.querySelector('.sidebar');

    const handleMenuClick = () => {
      side_bar.classList.toggle('expand');
      changeButtonIcon();
    };

    const changeButtonIcon = () => {
      if (side_bar.classList.contains('expand')) {
        btn_menu.classList.replace('bx-menu', 'bx-menu-alt-right');
      } else {
        btn_menu.classList.replace('bx-menu-alt-right', 'bx-menu');
      }
    };

    btn_menu.addEventListener('click', handleMenuClick);

    const btn_theme = document.querySelector('.theme-btn');
    const theme_ball = document.querySelector('.theme-ball');

    const localData = localStorage.getItem('theme');

    if (localData === null) {
      localStorage.setItem('theme', 'light');
    }

    if (localData === 'dark') {
      document.body.classList.add('dark-mode');
      theme_ball.classList.add('dark');
    } else if (localData === 'light') {
      document.body.classList.remove('dark-mode');
      theme_ball.classList.remove('dark');
    }

    const handleThemeClick = () => {
      document.body.classList.toggle('dark-mode');
      theme_ball.classList.toggle('dark');
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    };

    btn_theme.addEventListener('click', handleThemeClick);

    // Ajout du script de chatbot
    window.embeddedChatbotConfig = {
      chatbotId: "bO8uDUC2v4AnBgF1ad8Zj",
      domain: "www.chatbase.co"
    };

    const chatbotScript = document.createElement('script');
    chatbotScript.src = "https://www.chatbase.co/embed.min.js";
    chatbotScript.setAttribute('chatbotId', "bO8uDUC2v4AnBgF1ad8Zj");
    chatbotScript.setAttribute('domain', "www.chatbase.co");
    chatbotScript.setAttribute('defer', true);
    document.body.appendChild(chatbotScript);

    return () => {
      btn_menu.removeEventListener('click', handleMenuClick);
      btn_theme.removeEventListener('click', handleThemeClick);
    };
  }, []);

  return (
    <div>
      <header>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>analytical project</title>
        <link rel="stylesheet" href="Dashboard.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </header>
      <section className="sidebar">
        <div className="nav-header">
          <p className="logo">analyticals</p>
          <i className="bx bx-menu btn-menu"></i>
        </div>
        <ul className="nav-links">
  <li>
    <a href="#1">
      <i className="fa-solid fa-house"></i>
      <span className="title">Analyse globale</span>
    </a>
    <span className="tooltip">Requêtes analysées globalement</span>
  </li>
  <li>
    <a href="#2">
      <i className="fa-solid fa-chart-simple"></i>
      <span className="title">Bénéfice par pays</span>
    </a>
    <span className="tooltip">Bénéfice de chaque pays par ville de client</span>
  </li>
  <li>
    <a href="#3">
      <i className="fa-solid fa-chart-line"></i>
      <span className="title">Meilleur client</span>
    </a>
    <span className="tooltip">Meilleur client pour chaque pays</span>
  </li>
  <li>
    <a href="#4">
      <i className="fa-solid fa-magnifying-glass-chart"></i>
      <span className="title">Nombre de magasins</span>
    </a>
    <span className="tooltip">Nombre de magasins par ville de client</span>
  </li>
  <li>
    <a href="#5">
      <i className="fa-solid fa-chart-bar"></i>
      <span className="title">Meilleures ventes</span>
    </a>
    <span className="tooltip">Meilleures ventes par ville d'entreprise</span>
  </li>
  <li>
    <a href="#6">
      <i className="fa-solid fa-chart-pie"></i>
      <span className="title">Ventes par pays et ville</span>
    </a>
    <span className="tooltip">Ventes par pays et par ville d'entreprise</span>
  </li>
</ul>
        <div className="theme-wrapper">
          <i className="bx bxs-moon theme-icon"></i>
          <p>Dark Theme</p>
          <div className="theme-btn">
            <span className="theme-ball"></span>
          </div>
        </div>
      </section>
      <section className="home">
        <div>
          <i className="fa-solid fa-copyright"></i>
          <strong style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif', color: 'rgb(0, 0, 0)' }}>
            Ceci est notre <span style={{ color: 'rgb(0, 112, 240)' }}>Business <span style={{ fontWeight: '900' }}>Analytics</span></span> projet
          </strong>
        </div>
        <div className="panel">
          <header>Project analytics</header>
          <iframe id='1' title="Data_BI_managerPFA" width="1230" height="900" src="https://app.powerbi.com/view?r=eyJrIjoiNjBhZjZlY2QtZGZkNS00MzE0LWIxN2MtMGQ3ZmU3ZWZlNThhIiwidCI6ImQ3ZmYxMDAzLWU2NTUtNDA0OC05NDhmLTlkODZjNTAyZWU1NCJ9" frameBorder="0" allowFullScreen="true"></iframe>
          <br />
          <iframe id='2' title="PfaPage1" width="1230" height="900" src="https://app.powerbi.com/view?r=eyJrIjoiYmNlYmEyZDctMDM1Ny00ODM5LWI0MDUtNzBiZDI3M2U1ZmVlIiwidCI6ImQ3ZmYxMDAzLWU2NTUtNDA0OC05NDhmLTlkODZjNTAyZWU1NCJ9" frameBorder="0" allowFullScreen="true"></iframe>
          <br />
          <iframe id='3' title="PfaPage2" width="1230" height="900" src="https://app.powerbi.com/view?r=eyJrIjoiODZkNTI3OTItYmY0Zi00ZWNjLTk2NmYtYTcwMDE2Zjc2NWQxIiwidCI6ImQ3ZmYxMDAzLWU2NTUtNDA0OC05NDhmLTlkODZjNTAyZWU1NCJ9" frameBorder="0" allowFullScreen="true"></iframe>
          <br />
          <iframe id='4' title="pfapage33" width="1230" height="900" src="https://app.powerbi.com/view?r=eyJrIjoiNDBhMzllN2MtMDE5OS00NTVhLWJkYjctYmY1ZjFlZDYzZGIyIiwidCI6ImQ3ZmYxMDAzLWU2NTUtNDA0OC05NDhmLTlkODZjNTAyZWU1NCJ9" frameBorder="0" allowFullScreen="true"></iframe>
          <br />
          <iframe id='5' title="PfaPage4" width="1230" height="900" src="https://app.powerbi.com/view?r=eyJrIjoiYTE5N2U1MWUtY2JiOC00ODJlLTg0NDEtOWZjOTUyZWM2MTNjIiwidCI6ImQ3ZmYxMDAzLWU2NTUtNDA0OC05NDhmLTlkODZjNTAyZWU1NCJ9" frameBorder="0" allowFullScreen="true"></iframe>
          <br />
          <iframe id='6' title="PfaPage5" width="1230" height="900" src="https://app.powerbi.com/view?r=eyJrIjoiNTkxZTc5MDItMTBiNy00OWNmLWI0ZjktZjBiYTIxMDc3OWFjIiwidCI6ImQ3ZmYxMDAzLWU2NTUtNDA0OC05NDhmLTlkODZjNTAyZWU1NCJ9" frameBorder="0" allowFullScreen="true"></iframe>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;