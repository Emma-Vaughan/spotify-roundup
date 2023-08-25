import logo from './logo.svg';
import './App.css';
import RedirectSpotifyAuthPage from './components/main/redirectSpotifyAuthPage';
import RequestAccessToken from './components/main/requestAccessToken';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get("code");
  
  if (code) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <RequestAccessToken code={code}/>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <RedirectSpotifyAuthPage/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
