pipeline {
    agent {
        label 'homeapp'
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Checkout All Repositories') {
            parallel {

                stage('HomeApp') {
                    steps {
                        dir('homeapp') {
                            git branch: 'main',
                                url: 'https://github.com/Akashbora02/homeapp.git'
                        }
                    }
                }

                stage('GroceryAppBe') {
                    steps {
                        dir('GroceryAppBe') {
                            git branch: 'main',
                                url: 'https://github.com/Akashbora02/GroceryAppBe.git'
                        }
                    }
                }

                stage('GroceryAppFe') {
                    steps {
                        dir('GroceryAppFe') {
                            git branch: 'main',
                                url: 'https://github.com/Akashbora02/GroceryAppFe.git'
                        }
                    }
                }

                stage('TodosBe') {
                    steps {
                        dir('TodosBe') {
                            git branch: 'main',
                                url: 'https://github.com/Akashbora02/TodosBe.git'
                        }
                    }
                }

                stage('TodosFe') {
                    steps {
                        dir('TodosFe') {
                            git branch: 'main',
                                url: 'https://github.com/Akashbora02/TodosFe.git'
                        }
                    }
                }
            }
        }

        stage('Build & Deploy (Docker Compose)') {
            steps {
                sh '''
                pwd
                ls -l
//                docker compose -f docker-compose.yml down
//                docker compose -f docker-compose.yml build
                docker compose -f docker-compose.yml up -d
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                  curl -f http://localhost:3002
                  curl -f http://localhost:3001
                  curl -f http://localhost:3003
                '''
            }
        }
    }

    post {
        success {
            echo "✅ All applications including HomeApp are running successfully"
        }
        failure {
            echo "❌ Deployment failed"
        }
    }
}
