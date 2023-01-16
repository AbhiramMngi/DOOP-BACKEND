setup:
	npm install 
	npx prisma migrate dev --name init 
	
run:
	npm start