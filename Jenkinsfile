pipeline {
    agent {
        label 'homeapp'
    }

    stages {
        stage('Checkout HomeApp') {
            steps {
                git branch: 'main', url: 'https://github.com/Akashbora02/homeapp.git'
            }
        }

        stage('Build and Deploy') {
            parallel {

                stage('GroceryAppBe') {
                    steps {
                        dir('GroceryAppBe') {
                            git branch: 'main', url: 'https://github.com/Akashbora02/GroceryAppBe.git'
                            sh '''
                                chmod +x npm_backend.sh
                                ./npm_backend.sh
                            '''
                        }
                    }
                }

                stage('GroceryAppFe') {
                    steps {
                        dir('GroceryAppFe') {
                            git branch: 'main', url: 'https://github.com/Akashbora02/GroceryAppFe.git'
                            sh '''
                                chmod +x npm_frontend.sh
                                ./npm_frontend.sh
                            '''
                        }
                    }
                }

                stage('TodosBe') {
                    steps {
                        dir('TodosBe') {
                            git branch: 'main', url: 'https://github.com/Akashbora02/TodosBe.git'
                            sh '''
                                chmod +x npm_backend.sh
                                ./npm_backend.sh
                            '''
                        }
                    }
                }

                stage('TodosFe') {
                    steps {
                        dir('TodosFe') {
                            git branch: 'main', url: 'https://github.com/Akashbora02/TodosFe.git'
                            sh '''
                                chmod +x npm_frontend.sh
                                ./npm_frontend.sh
                            '''
                        }
                    }
                }
            }
        }
    }
}
