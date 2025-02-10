# ModelCabinet
ModelCabinet is a 3d printing management tool for managing 3d printer files in a web-facing database. Planned features include:
- Model storage
- Model visualization without download
- Model project management
- Model categorization and tagging
- Model searching
- Model support generation (long-term)
- Model merging (long-term)

## **Resources and Information**
- Documentation
- Issue Tracker
- [Roadmap - Github Projects](https://github.com/orgs/CCAppDevs/projects/2)

## **Dependencies**
- Dotnet
- SQL Server
- Node.js
- Angular CLI
- THREE.js

## **Get Started VS Code**
- Download the repository
- Install Dependencies
```

Run these commands in the .server of the project.

dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools
```
- Update the database
    - Ensure Dotnet EF tools are installed.
    -- Run Dotnet EF to check if it's install
    ```
    if not install run this command to install it
    dotnet tool install --global dotnet-ef

    ``` Khai currently here.
    - Deploy the database
    ```
    cd ModelCabinet.Server
    dotnet ef database update
    ```
- Run the App
```
dotnet run
```

## **Contributing**
To contribute to the project please create your own fork of the repository and submit your changes for review via a pull request.
