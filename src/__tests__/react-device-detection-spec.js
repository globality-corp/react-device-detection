import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import reactDeviceDetection from '../index';

describe('reactDeviceDetection', () => {

    it('should decorate wrapped component by props with requested in HOC config device/browser information', () => {
        const FakeComponent = () => <div>Test component</div>;
        const WrappedComponent = reactDeviceDetection('mobile', 'firefox', 'ie', 'chrome')(FakeComponent);
        const wrapper = shallow(<WrappedComponent otherProp={20} />);
        const tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();
        expect(wrapper.props().isMobile).toBeDefined();
        expect(wrapper.props().isFirefox).toBeDefined();
        expect(wrapper.props().isIE).toBeDefined();
        expect(wrapper.props().isChrome).toBeDefined();
    });

    it('should decorate wrapper component and pass only requested props', () => {
        const FakeComponent = () => <div>Test component</div>;
        const WrappedComponent = reactDeviceDetection('mobile')(FakeComponent);
        const wrapper = shallow(<WrappedComponent otherProp={20} />);
        const tree = toJson(wrapper);

        expect(tree).toMatchSnapshot();
        expect(wrapper.props().isMobile).toBeDefined();
        expect(wrapper.props().isChrome).toBeUndefined();
    });
});
