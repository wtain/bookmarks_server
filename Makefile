build-container:
	npm run build
	docker build . -t bookmarks/bookmarks_backend
start:
	docker run -d -p 9999:8080 --name bookmarks_backend bookmarks/bookmarks_backend
stop:
	docker container stop bookmarks_backend