import './App.css';
import './AppAPI';
import React from 'react';

function App() {
  return (
    <div id="page" className="page">
        <div className="main">
            <div className="maincontent">
                <div className="maingrid">
                    <div className="grid1">
                        <img className="profileimg" src="https://avatars.githubusercontent.com/u/67871937?v=4" alt="Muunatic"/>
                        <h3>Muunatic</h3>
                        <p className="maindescription">Spotify API Card</p>
                        <div className="socialmedia">
                            <p><i className="bi bi-github iconfooter"></i><a target="_blank" href="https://github.com/Muunatic" rel="noreferrer"> GitHub</a></p>
                            <p><i className="bi bi-steam iconfooter"></i><a target="_blank" href="https://steamcommunity.com/id/luunatix" rel="noreferrer"> Steam</a></p>
                            <p><i className="bi bi-twitter iconfooter"></i><a target="_blank" href="https://twitter.com/kamoomlle" rel="noreferrer"> Twitter</a></p>
                        </div>
                    </div>
                    <div className="grid2">
                        <div className="grid2box">
                            <p>Most Played</p>
                            <img className="albumimg" src="https://i.scdn.co/image/ab67616d0000b273b07e4ed516a7f1d6247857cd" alt="さよーならみなさん"/>
                            <p><span>さよーならみなさん</span></p>
                            <p><span>by Siinamota</span></p>
                            <p><span>on 生きる</span></p>
                        </div>
                    </div>
                    <div className="grid3">
                        <div className="grid2box">
                            <p><span id="IsPlaying">Recently Played</span></p>
                            <img id="Image" className="albumimg" src="https://i.scdn.co/image/ab67616d0000b273b07e4ed516a7f1d6247857cd" alt="さよーならみなさん"/>
                            <p><span id="Name">さよーならみなさん</span></p>
                            <p><span id="Artists">by Siinamota</span></p>
                            <p><span id="Album">on 生きる</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mainfooter">
            <div className="mainfootercontent">
                <p className="footerinline"><i id="spotifyapi" className="bi bi-circle-fill icononline"></i> Spotify API</p>
                <p className="footerinline"><i id="spotifyuser" className="bi bi-circle-fill iconoffline"></i> Spotify User</p>
            </div>
        </div>
    </div>
  );
}

export default App;
