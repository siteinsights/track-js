# Installation

`npm i siteinsights`

# Usage

App.js

```ecmascript 6
import si from 'siteinsights';

si.init({
  apiKey: 'YOUR_API_KEY'
});
```

<br />

LoggedIn.js

```
if (loginIsSucessful) {
  si.track('UserLoggedIn', {
    id: user.id
  });
} else {
  si.track('UserLoginFailed', {
    username
  });
}
``` 