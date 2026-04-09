pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = "johnny0419"
        IMAGE_NAME = "simple-maven-app"
    }
    stages {
        stage('Clone Repository') {
            steps { checkout scm }
        }
        stage('Build with Maven') {
            steps { sh 'mvn clean package -DskipTests' }
        }
        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:${env.BUILD_ID} ."
                sh "docker tag ${DOCKER_HUB_USER}/${IMAGE_NAME}:${env.BUILD_ID} ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', passwordVariable: 'PASS', usernameVariable: 'USER')]) {
                    sh "docker login -u ${USER} -p ${PASS}"
                    sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:latest"
                }
            }
        }
        stage('K8s Deployment') {
            steps {
                sh "kubectl apply -f k8s-deployment.yaml"
            }
        }
    }
}
