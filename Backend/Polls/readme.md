To run the application

first run 
mvn clean install
then to run the application
mvn spring-boot:run

To run the unit test run the following


Swagger Endpoint - http://localhost:8080/swagger-ui/index.html#/

POST	/polls	Create a new poll
POST	/polls/{pollId}/vote	Vote for a poll option
GET	/polls	Get all polls (basic)
GET	/polls/{pollId}/votes	Get votes for a specific poll