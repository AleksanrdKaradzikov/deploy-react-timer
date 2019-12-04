/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Icon } from 'antd';
import Timer from './components/timer';
import Countdown from './components/countdown';
import 'antd/dist/antd.css';
import './style/style.css';

class App extends React.Component {
  render() {
    const { TabPane } = Tabs;
    return (
      <div className="tab-container">
        <Tabs defaultActiveKey="2">
          <TabPane
            tab={
              <span>
                <Icon type="clock-circle" />
                Секундомер
              </span>
            }
            key="1"
          >
            <Timer />
          </TabPane>
          <TabPane
            tab={
              <span>
                <Icon type="history" />
                Таймер обратного отсчета
              </span>
            }
            key="2"
          >
            <Countdown />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
