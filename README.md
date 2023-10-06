# minkajs

[![Build Status](https://github.com/minka-sdg/minkajs/workflows/minkajs%20CI/badge.svg)](https://github.com/minka-sdg/minkajs/actions)
[![Coverage Status](https://coveralls.io/repos/github/minka-sdg/minkajs/badge.svg?branch=main)](https://coveralls.io/github/minka-sdg/minkajs?branch=main)

JavaScript package for minka-sdg.org. Supports CRUD for MINKA data. This
is an isomorphic library that can be used in the browser and within
node.js code. Each method returns a JavaScript Promise.

#### Simple Example
```js
import minkajs from "minkajs";
minkajs.observations.search({ taxon_id: 4 }).then( rsp => { });
```

#### Creating Records

Create and update methods accept a JSON object with the new instance properties
nested under the instance class name.

```js
var params = {
  comment: {
    body: "... comment body ...",
    parent_type: "Observation",
    parent_id: 12345,
    user_id: 67890
  }
};
minkajs.comments.create( params ).then( c => { } );
```

#### Updating Records

Updates also need the ID of the record being updated.

```js
var params = {
  id: 1,
  comment: { ... }
};
minkajs.comments.update( params ).then( c => { } );
```

#### Deleting Records

Deletes only need the ID.

```js
minkajs.comments.delete({ id: 1 }).then( () => { } );
```

#### Errors

Any non-200 response code is considered an error, and the promise will fail. Be
sure to catch these errors:

```js
minkajs.comments.delete({ id: 0 }).then( () => { }).catch( e => {
  console.log( "Delete failed:", e );
});
```

#### Uploads

Some methods need to upload files, and they use FormData (which is already defined in a browser context, otherwise uses the [FormData package](https://www.npmjs.com/package/form-data)) for creating `multiplart/form-data` requests. There are various ways to upload files, for example setting the value of a parameter to a Blob, or a file read stream. ReactNative expands [FormData](https://github.com/facebook/react-native/blob/master/Libraries/Network/FormData.js) to also accept uploads as an object with a uri, name, and type.

When given objects or arrays as parameter values, minkajs upload requests will flatten the parameters into a format expected by FormData:

```js
{ attr: { nestedValue: [1] } } =>
["attr[nestedValue][0]"] = 1
```

In order to get the ReactNative uri approach to work, the file object that contains the URI must be wrapped in some class other than a basic JS Object. This will prevent it from being flattened, and ensure it is passed on to ReactNative's FormData extension as an object. You can use minkajs.FileUpload for this:

```js
import minkajs, { FileUpload } from "minkajs";
const params = {
  image: new FileUpload({
    uri: ...,
    name: ...,
    type: ...
  })
};
minkajs.uploadMethod( params ).then( () => { } );
```

#### API Token

In order to use methods requiring authentication, you'll need an OAuth token and a JSON Web Token (JWT):

1. [Create an MINKA application](https://www.minka-sdg.org/oauth/applications/new)
1. Retrieve an Oauth access token using one of the two methods described at https://www.minka-sdg.org/pages/api+reference#auth
1. Use the Oauth token to retrieve a JSON Web Token, e.g
  ```bash
  curl -H "Authorization: Bearer YOUR_OAUTH_ACCESS_TOKEN" https://www.minka-sdg.org/users/api_token
  ```
If running in the browser,
minkajs will look for the JWT in an `minka-api-token` meta tag and use that for
authenticating requests:

```html
<meta name="minka-api-token" content="... api token ...">
```

Alternatively, the token can be passed as an option:

```js
var options = { api_token: "... MINKA API token ..." };
minkajs.comments.create( params, options ).then( c => { } );
```

#### CSRF Token (intrasite only)

If you happen to be running the MINKA Rails codebase, CSRF tokens can
be used for authenticating requests made from the browser. If a CSRF token is
available, all requests will be made to the same origin from which the call
was made. minkajs will look for the following meta tags:

```html
<meta name="csrf-param" content="... param ...">
<meta name="csrf-token" content="... token ...">
```

Alternatively, the token can be passed as a parameter (use the actual
name of the paramater and not csrf_param).

```js
var params = {
  csrf_param: "... csrf token ..."
  comment: { ... }
};
minkajs.comments.create( params ).then( c => { } );
```

#### Configuring API Host

It might be necessary to change the API host to which this library sends queries
(for example if you're a developer). Do not include the protocol in the host
(for example set API_HOST=api.example.com). These values can be set in the
browser with meta tags:

```html
<meta name="config:minka_api_host" content="... host ...">
<meta name="config:minka_write_api_host" content="... host ...">
```

This can be done on the node.js end with environment variables:

```bash
API_HOST=a WRITE_API_HOST=b node app.js
```

And finally, in any environment there is a setConfig method for setting these
values:

```js
import minkajs from "minkajs";
minkajs.setConfig({ apiHost: "...", writeApiHost: "..." });
```

#### Available Methods

##### Public

```js
minkajs.observations.fetch( params, opts ).then( rsp => { ... } );
minkajs.observations.search( params, opts ).then( rsp => { ... } );
minkajs.observations.identifiers( params, opts ).then( rsp => { ... } );
minkajs.observations.observers( params, opts ).then( rsp => { ... } );
minkajs.observations.speciesCounts( params, opts ).then( rsp => { ... } );

minkajs.places.fetch( params, opts ).then( rsp => { ... } );

minkajs.taxa.fetch( params, opts ).then( rsp => { ... } );
minkajs.taxa.autocomplete( params, opts ).then( rsp => { ... } );
```

##### Authenticated

```js
minkajs.comments.create( params, opts ).then( c => { ... } );
minkajs.comments.update( params, opts ).then( c => { ... } );
minkajs.comments.delete( params, opts ).then( () => { ... } );

minkajs.identifications.create( params, opts ).then( i => { ... } );
minkajs.identifications.update( params, opts ).then( i => { ... } );
minkajs.identifications.delete( params, opts ).then( () => { ... } );

minkajs.observations.create( params, opts ).then( o => { ... } );
minkajs.observations.update( params, opts ).then( o => { ... } );
minkajs.observations.delete( params, opts ).then( () => { ... } );
minkajs.observations.fave( params, opts ).then( o => { ... } );
minkajs.observations.unfave( params, opts ).then( o => { ... } );
minkajs.observations.review( params, opts ).then( () => { ... } );
minkajs.observations.unreview( params, opts ).then( () => { ... } );
minkajs.observations.setQualityMetric( params, opts ).then( () => { ... } );
minkajs.observations.deleteQualityMetric( params, opts ).then( () => { ... } );

minkajs.observationFieldValues.create( params, opts ).then( v => { ... } );
minkajs.observationFieldValues.update( params, opts ).then( v => { ... } );
minkajs.observationFieldValues.delete( params, opts ).then( () => { ... } );

minkajs.projects.join( params, opts ).then( () => { ... } );
minkajs.projects.leave( params, opts ).then( () => { ... } );
```
