/*
* Helper HOC for extract the data from User Agent String
* used lightweight JavaScript-based User-Agent String Parser
* library: http://faisalman.github.io/ua-parser-js/
* see more on: https://github.com/faisalman/ua-parser-js
* use in compose function, provide device names for which
* the data is needed as parameters for HOC, eg:
* compose(
* ...
* reactDeviceDetection('mobile','ie','firefox')
* ...
* )
* and get in props depends on config flags like: 'isMobile', 'isIE', 'isFirefox'
* */

import React from 'react';
import UAParser from 'ua-parser-js';
import { deviceTypes, MOBILE_DEVICE, CHROME_BROWSER, FIREFOX_BROWSER, IE_BROWSER } from './constants';
import { deviceToPropMap, evaluate, Singleton } from './utils/index';

export default function reactDeviceDetection (...config) {
    return (WrappedComponent) => {
        const uaParser = Singleton.instance(UAParser);
        const deviceData = uaParser.getDevice();
        const browserData = uaParser.getBrowser();

        return class extends React.Component {
            state = {
                config,
                isChrome: evaluate(browserData, CHROME_BROWSER),
                isIE: evaluate(browserData, IE_BROWSER),
                isMobile: evaluate(deviceData, MOBILE_DEVICE, 'type'),
                isFirefox: evaluate(browserData, FIREFOX_BROWSER),
            };

            getInjections () {
                return this.state.config
                    .filter(arg => deviceTypes.some(type => arg === type))
                    .map(device => ({
                        [deviceToPropMap.get(device)]: this.state[deviceToPropMap.get(device)],
                    }))
                    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
            }

            render () {
                const injections = this.getInjections();
                return <WrappedComponent {...this.props} {...injections} />;
            }
        };
    };
}

