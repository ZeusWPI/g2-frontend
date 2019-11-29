docker:
	docker build -t g2/frontend . && docker run -it -p 8080:8080 --rm --name g2-frontend g2/frontend
