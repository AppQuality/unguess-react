ecr-login: 
	aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 163482350712.dkr.ecr.eu-west-1.amazonaws.com 
	
pull: ecr-login
	docker-compose pull 

deploy: pull
	docker-compose down && docker-compose up -d
