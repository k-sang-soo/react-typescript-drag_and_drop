import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './theme';
import App from './App';

// *************
// react-beautiful-dnd 라이브러리의 문제로 인해 StricMode 제거
// 에러 문구 -> Unable to find draggable with id
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <RecoilRoot>
        <ThemeProvider theme={darkTheme}>
            <App />
        </ThemeProvider>
    </RecoilRoot>,
);
