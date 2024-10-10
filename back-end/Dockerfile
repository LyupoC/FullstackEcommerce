FROM maven:3.8.3-openjdk-17 AS build-env
WORKDIR /app

COPY pom.xml ./
RUN mvn dependency:go-offline


COPY . ./
RUN mvn package -DfinalName=ecommerceBackend

FROM openjdk:17-jdk-slim
EXPOSE 8080
WORKDIR /app

COPY --from=build-env /app/target/ecommerceBackend-0.0.1-SNAPSHOT.jar ./ecommerceBackend.jar
CMD ["java", "-jar", "/app/ecommerceBackend.jar"]