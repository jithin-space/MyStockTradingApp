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

        stage('Build') {
            steps {
                script {
                    def buildNumber = env.BUILD_ID
                    def frontendTag = "jithinspace/frontend:${buildNumber}"
                    def backendTag = "jithinspace/backend:${buildNumber}"

                    echo "Frontend Docker Tag: ${frontendTag}"
                    echo "Backend Docker Tag: ${backendTag}"

                    // Build the Docker images with BUILD_NUMBER
                    frontendImage = docker.build(frontendTag, 'frontend')
                    backendImage = docker.build(backendTag, 'backend')


                    // def frontendImage = docker.build('jithinspace/frontend:${env.BUILD_ID}', 'frontend')
                    // def backendImage = docker.build('jithinspace/backend:${env.BUILD_ID}', 'backend')
                }
            }
        }

        stage('Push to Docker Hub') {

            steps {
                script {
                    docker.withRegistry('', '21cdf654-3111-4213-a26f-035cafbbf146') {
                        frontendImage.push()
                        backendImage.push()
                    }
                }
            }
        }

        stage('Deploy to Azure') {
            steps {
                script {
                    withCredentials([azureAD(credentialsId: 'AZURE_CREDENTIALS', variable: 'AZURE_CREDENTIALS')]) {
                        sh 'az login --service-principal -u $AZURE_CREDENTIALS.clientId -p $AZURE_CREDENTIALS.clientSecret --tenant $AZURE_CREDENTIALS.tenant'
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