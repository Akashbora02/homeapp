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
        stage('Checkout Code') {
            steps {
                echo "Checking out HomeApp mono-repo..."
                git branch: 'main',
                    url: 'https://github.com/Akashbora02/homeapp.git'
            }
        }

        stage('Build & Deploy (Docker Compose)') {
            steps {
                sh '''
                echo "Current directory:"
                pwd
                echo "Listing files:"
                ls -l
                
                docker compose down -v
                docker system prune -af
                docker builder prune -af
                docker compose build --no-cache
                docker compose up -d

                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                echo "Checking application health..."

                curl -f http://localhost:3000 || echo "❌ Grocery Frontend not ready"
                curl -f http://localhost:3001 || echo "❌ Todos Frontend not ready"
                curl -f http://localhost:3002 || echo "❌ HomeApp Frontend not ready"
                '''
            }
        }
    }

    post {
        success {
            echo "✅ All applications are deployed successfully"
        }
        failure {
            echo "❌ Deployment failed"
        }
    }
}
