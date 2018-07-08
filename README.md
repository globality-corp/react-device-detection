React device detection
=======================
General HOC that will pass in boolean props such as isMobile or isFirefox for a component to use at its discretion. 

Install:

```bash
yarn add @globality/gi-react-device-detection 
```


Example

```javascript
import deviceDetection from 'react-device-detection';

...
deviceDetection('mobile')(withRouter(MobileNav));

```
....