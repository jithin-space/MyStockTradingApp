pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('21cdf654-3111-4213-a26f-035cafbbf146')
        AZURE_CREDENTIALS = credentials('cba74787-5af9-4896-8d8c-f0cc2cc543e3')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/jithin-space/MyStockTradingApp.git'
            }
        }

        stage('Print Environment Variables') {
            steps {
                script {
                    echo "BUILD_ID: ${env.BUILD_ID}"
                    echo "BUILD_NUMBER: ${env.BUILD_NUMBER}"
                }
            }
        }

        stage('Build') {
            steps {
                script {
                     def sanitizedBuildNumber = env.BUILD_NUMBER.replaceAll('[^a-zA-Z0-9_.-]', '-')

                    // Ensure the sanitized BUILD_NUMBER is not empty
                    if (sanitizedBuildNumber == '') {
                        error("The sanitized BUILD_NUMBER resulted in an empty string, which is not a valid tag.")
                    }

                    def frontendImage = docker.build('jithinspace/frontend:${sanitizedBuildNumber}', 'frontend')
                    def backendImage = docker.build('jithinspace/backend:${sanitizedBuildNumber}', 'backend')
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

        stage('Deploy to Azure') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'AZURE_CREDENTIALS', variable: 'AZURE_CREDENTIALS')]) {
                        sh 'az login --service-principal -u $AZURE_CREDENTIALS -p $AZURE_CREDENTIALS --tenant 45817f11-fbc6-409d-b55a-e9cb01b2ecd5'
                        sh 'az acr login --name jithinacr'
                        sh 'docker tag jithinspace/frontend:${env.BUILD_ID} jithinacr.azurecr.io/frontend:${env.BUILD_ID}'
                        sh 'docker tag jithinspace/backend:${env.BUILD_ID} jithinacr.azurecr.io/backend:${env.BUILD_ID}'
                        sh 'docker push jithinacr.azurecr.io/frontend:${env.BUILD_ID}'
                        sh 'docker push jithinacr.azurecr.io/backend:${env.BUILD_ID}'
                        sh 'kubectl apply -f k8s/deployment.yaml'
                    }
                }
            }
        }
    }
}