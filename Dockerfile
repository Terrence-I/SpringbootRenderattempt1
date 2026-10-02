# --- Stage 1: Build the application ---
FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src

# CRITICAL: We run 'clean package' to ensure a fresh target directory
RUN mvn clean package -DskipTests

# --- Stage 2: Runtime environment ---
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# FIX: Use a wildcard (*) to copy the generated jar automatically
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
