1. Hello world index page
2. Login page
3. Basic admin page no styles
    1. Add user option
        1. Basic user
        2. Admin user
    2. Add page option (can generate two pages, for admin and for user)
        1. Restricted page
        2. Open for all page
        3. User specific page
4. Redis with user schema and admin user created

1. A way to distinct user groups
2. Create page (creates pages both on admin and client):
    1. Can be restricted to auth
    2. Private to user group
    3. Private to user
    4. Can import db functions
3. Create db functions:
    1. Sets string to value (stringified  JSON)
    2. Creates /api/[name]/index.ts with functions to work with it

On create:
1. Adds folder to $lib/utils/[folder name]
    1. schema.ts
    2. funcs.ts
2. Creates CRUD components
3. Creates CRUD endpoints with options only Auth and private to User

Just make it a cli