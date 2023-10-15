import React, {Suspense} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import config from "./config.json";
import MyInfo from "./pages/MyInfo";
import {WebSocketProvider} from "./WebSocketProvider";
import {RecoilRoot} from "recoil";

const WS_URL = 'ws://localhost:' + config.port;  // 실제 WebSocket 서버 주소를 넣어주세요.

function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <DefaultLayout>
                    <WebSocketProvider host={WS_URL}>
                        <Suspense fallback={<div>Loading...</div>}>
                            <Routes>
                                <Route path="/" element={<MyInfo/>}/>
                                {/* 여기에 다른 경로를 추가하세요 */}
                            </Routes>
                        </Suspense>
                    </WebSocketProvider>
                </DefaultLayout>
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
