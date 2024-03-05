import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { Route, Routes } from 'react-router-dom';
import Board from './components/pages/board/Board';
import TaskInfo from './components/organism/cardinfo/TaskInfo';

const App: React.FC = () => {
    return (
        <div className="App">
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<Board />} />
                </Routes>
            </Provider>
        </div>
    );
};

export default App;