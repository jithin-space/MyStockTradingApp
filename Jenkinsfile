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
                    buildNumber = env.BUILD_ID
                    def frontendTag = "jithinspace/frontend:${buildNumber}"
                    def backendTag = "jithinspace/backend:${buildNumber}"

                    echo "Frontend Docker Tag: ${frontendTag}"
                    echo "Backend Docker Tag: ${backendTag}"

                    // Build the Docker images with BUILD_NUMBER
                    frontendImage = docker.build(frontendTag, 'frontend')
                    backendImage = docker.build(backendTag, 'backend')


                    // def frontendImage = docker.build('jithinspace/frontend:${buildNumber}', 'frontend')
                    // def backendImage = docker.build('jithinspace/backend:${buildNumber}', 'backend')
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
                    withCredentials([azureServicePrincipal('cba74787-5af9-4896-8d8c-f0cc2cc543e3')]) {
                        sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID'
                        sh 'az acr login --name jithinacr'
                        sh "docker tag jithinspace/frontend:${buildNumber} jithinacr.azurecr.io/frontend:${buildNumber}"
                        sh "docker tag jithinspace/backend:${buildNumber} jithinacr.azurecr.io/backend:${buildNumber}"
                        sh "docker push jithinacr.azurecr.io/frontend:${buildNumber}"
                        sh "docker push jithinacr.azurecr.io/backend:${buildNumber}"
                        sh 'kubectl apply -f k8s/deployment.yaml'
                    }
                }
            }
        }
    }
}