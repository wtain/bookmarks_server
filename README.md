
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