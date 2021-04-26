## Set up your environment

### 1. Install Visual Studio Community.
This will give you some command line tools for your environment, specifically  `dotnet` is the one you need. Visual Studio GUI also provides an auto updater which will allow you  to update the SDK on your machine in the future.

### 2. Install Azure  Functions Core Tools
Install this through  `yarn`.  We need version 3.

```
yarn global add azure-functions-core-tools@3
```

### 3. Install EF tools
This lets you generate db schema migrations.
```
dotnet tool install --global dotnet-ef
```

###  4. Create your local env file
This file should be named `local.settings.json` and put in this directory. Don't commit this file to Git!

Example configuration:
```
{
    "IsEncrypted": false,
    "Values": {
        "PG_CONNECTION_STRING": "Server=bwh-dev.bherila.net;Port=5432;Database=bwh_csharp_dev;User Id=bwh-dev;Password=TeYK8yeEezIwLpy;Timeout=15;Pooling=true;Client Encoding=UTF8;SSL Mode=Require;Trust Server Certificate=true;",
        "FUNCTIONS_WORKER_RUNTIME": "dotnet-isolated",
        "AzureWebJobsStorage": "UseDevelopmentStorage=true",
        "AzureWebJobsDashboard": "UseDevelopmentStorage=true"
    }
}
```

### 5. Run the project!
This command will compile & run the project.
```
func host start
```

Try navigating to http://localhost:7071/api/graphiql  and run a GraphQL query!

