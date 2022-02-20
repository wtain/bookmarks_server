build-container:
	npm run build
	docker build . -t bookmarks/bookmarks_backend
start:
	docker rm bookmarks_backend || echo "Doesn't exist"
	docker run -d -p 9999:8080 --name bookmarks_backend --network bridge bookmarks/bookmarks_backend
stop:
	docker container stop bookmarks_backend