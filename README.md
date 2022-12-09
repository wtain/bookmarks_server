
### Setup

Install Typescript
```bash
npm install -g typescript
```

#### On Windows
Add path to NPM bin to user environment variables:
(Windows) Add to ``PATH`` value ``C:\Users\<USER_NAME_HERE>\AppData\Roaming\npm``

Install dependencies
```bash
npm i
```

```bash
npm i -g ts-node
```

### Building
```bash
npm run build
```

### Testing endpoints

```
curl http://127.0.0.1:8080/api/bookmarks
```

```
curl -X PUT -H "Content-Type: application/json" -d "{\"id\": \"0000\", \"name\": \"First bookmark (edited)\" }" http://127.0.0.1:8080/api/bookmarks/update
```


```
curl -X DELETE http://127.0.0.1:8080/api/bookmarks/delete/0000
```

```
curl -X POST -H "Content-Type: application/json" -d "{\"id\": \"0000\", \"name\": \"First bookmark\" }" http://127.0.0.1:8080/api/bookmarks/add
```


```
curl -X POST -H "Content-Type: application/json" -d "{\"username\": \"ramiz\", \"password\": \"Tt6_wW3#\"}" http://127.0.0.1:8081/api/auth/register
```


```
curl -X POST -H "Content-Type: application/json" -d "{\"username\": \"ramiz\", \"password\": \"Tt6_wW3#\"}" http://127.0.0.1:8081/api/auth/login
```

```
curl -X GET "http://127.0.0.1:8081/api/auth/logout?sessionToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InJhbWl6IiwiaWF0IjoxNjcwNjI2MTI0fQ.CRVkp9pR982O46MABX-76Iwgs4cAC-sDNaP4guIuOf0&userName=ramiz"
```