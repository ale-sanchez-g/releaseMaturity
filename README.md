## How to run the project
1. Clone the repository
2. Run `npm install`
3. Run `npm start`

## How to deploy to github pages

```
1. Run `npm run deploy`

```

## How to build and run UI in docker

```
1. Run `docker build -t do1-rm:latest .`
2. Run `docker run -p 8080:80 -itd do1-rm:latest`
```

## How to run and build dotnet service

1. Run the following command to build the project:
   ```sh
    docker build -t maturity-service -f dotnet.dockerfile .
    ```

2. Run the following command to run the project:
    ```sh
     docker run -d -p 3000:80 --name mservice maturity-service:latest
     ```

3. Open a browser and navigate to `https://localhost:3000/swagger` to view the swagger documentation.


