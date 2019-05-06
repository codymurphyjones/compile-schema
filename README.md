
### Compile-Schema
##### Apollo GraphQL Targetted Schema Management



Function Exports
```javascript
compileSchema(folder='./schema/',resolver_dir="",saveSchema=true, plugin=[])
```

`folder`
The folder that your schema files are primarily located in.  GraphQL files will be stored in this folder.

`resolver_dir`
The folder that your .js resolvers are located in.  Default is in the schema folder with the GraphQL files.

`saveSchema`
Determines whether or not the system compiles the GraphQL files into a single file.  `schema.graphql`

`plugin`
Experimental Functionality: Supports any function that accepts a single string parameters and returns a string parameter.
  
```javascript
compileExecutableSchema(folder='./schema/',resolver_dir="",exec=function() {},saveSchema=true, plugin=[]
```

`folder`
The folder that your schema files are primarily located in.  GraphQL files will be stored in this folder.

`resolver_dir`
The folder that your .js resolvers are located in.  Default is in the schema folder with the GraphQL files.

`exec`
Wrap your `{resolvers, typeDefs}` inside of a function before exporting the result.

`saveSchema`
Determines whether or not the system compiles the GraphQL files into a single file.  `schema.graphql`

`plugin`
Experimental Functionality: Supports any function that accepts a single string parameters and returns a string parameter.
  

  
##### Internal functions
```javascript
compileGraphQl(saveSchema,folder='./schema/',resolver_dir="", plugin=[])
```

Generates the typeRefs object required by makeExecutableSchema


```javascript
CreateResolvers(resolver_dir="", folder="./schema/")
```

Generates the resolvers object required by makeExecutableSchema


```javascript
import { graphqlExpress } from 'apollo-server-express';
import compileSchema from './compile-schema';

//I can't seem to figure out how to make this module relative to the file that called it, its just the process project folder
let schemaFolder = "./src/schema/";
let resolverFolder = "resolvers";
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = compileSchema(schemaFolder,resolverFolder);


const graphqlServer = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
 playground: {
  settings: {
    'editor.theme': 'light',
  },
  tabs: [
    {
      endpoint: "graphql",
      query: "query {",
    },
  ],
}
});
	
```

`Schema Folder Structure`
![alt text](https://imgur.com/saCBOTW.png "Schema Folder Structure")


`Resolvers Folder Structure`
![alt text](https://imgur.com/Plt4kBT.png "Resolvers Folder Structure")