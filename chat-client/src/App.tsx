import React, {Suspense, useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import config from "./config.json";
import MyInfo from "./pages/MyInfo";
import {WebSocketProvider} from "./websocket/WebSocketProvider";
import {RecoilRoot} from "recoil";
import MyInfoChange from "./pages/MyInfoChange";
import Channel from "./pages/Channel";
import MyChannel from "./pages/MyChannel";

const WS_URL = 'ws://localhost:' + config.port;  // 실제 WebSocket 서버 주소를 넣어주세요.

function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <WebSocketProvider host={WS_URL}>
                    <DefaultLayout>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Routes>
                                <Route path="/" element={<MyInfo/>}/>
                                <Route path="/my-info" element={<MyInfo/>}/>
                                <Route path="/my-info/change" element={<MyInfoChange/>}/>
                                <Route path="/channels" element={<Channel/>}/>
                                <Route path="/channels/:channelId" element={<Channel/>}/>
                                <Route path="/my-channels" element={<MyChannel/>}/>
                                <Route path="/my-channels/:channelId" element={<MyChannel/>}/>
                                {/* 여기에 다른 경로를 추가하세요 */}
                            </Routes>
                        </Suspense>
                    </DefaultLayout>
                </WebSocketProvider>
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
