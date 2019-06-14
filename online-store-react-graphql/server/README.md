# server
Ensure that you install [strapi globally](https://strapi.io/documentation/3.0.0-beta.x/getting-started/quick-start.html#_1-install-strapi-globally)

Copy the content of `.env.example` to `.env` file and update the variables with the correct values

To start the server, run the command:
```
strapi develop
```


### Notes on gettings started with strapi
After installing strapi, create a backend directory using `strapi new <server-name>` and choose either the custom or normal installation process in the interactive session.

The projects settings chosen were:
- Installation type: `Custom (manual settings)`
- Main database: MongoDB
- Database name: server (Default)
- Host: _Mongo Atlas DB_ host. E.g. `cluster0-abc3cd.mongodb.net`
- srv connection: true
- Username: MongoDB admin's username
- Password: MongoDB admin's password
- Authentication database: just pressed enter for the default option
- Enable SSL connection: true

Then start the server using `strapi develop`