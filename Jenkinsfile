pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('21cdf654-3111-4213-a26f-035cafbbf146')
        AZURE_CREDENTIALS = credentials('azure-credentials')
    }

    stages {
        stage('Checkout') {
            steps {
                git ' https://github.com/jithin-space/MyStockTradingApp.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    def frontendImage = docker.build('jithinspace/frontend:${env.BUILD_ID}', 'frontend')
                    def backendImage = docker.build('jithinspace/backend:${env.BUILD_ID}', 'backend')
                }
            }
        }

        stage('Push to Docker Hub') {

            steps {
                script {
                    docker.withRegistry('', '$DOCKERHUB_CREDENTIALS') {
                        frontendImage.push()
                        backendImage.push()
                    }
                }
            }
        }
    }
}