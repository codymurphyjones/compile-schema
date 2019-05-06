
### Compile-Schema
##### Apollo GraphQL Targetted Schema Management



Default Export
```javascript
compileschema(folder='./schema/',resolver_dir="",saveSchema=true, plugin=[],main=makeExecutableSchema)
```

`folder`
The folder that your schema files are primarily located in.  GraphQL files will be stored in this folder.

`resolver_dir`
The folder that your .js resolvers are located in.  Default is in the schema folder with the GraphQL files.

`saveSchema`
Determines whether or not the system compiles the GraphQL files into a single file.  `schema.graphql`

`plugin`
Experimental Functionality: Supports any function that accepts a single string parameters and returns a string parameter.

`main`
Experimental Functionality: this is the function used the convert into an executable schema.  


```javascript
compileGraphQl(saveSchema,folder='./schema/',resolver_dir="", plugin=[])
```

Generates the typeRefs object required by makeExecutableSchema


```javascript
CreateResolvers(resolver_dir="", folder="./schema/")
```

Generates the resolvers object required by makeExecutableSchema