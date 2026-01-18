pipeline {
  agent {
    label 'homeapp'
  }

  environment {
    NAMESPACE = 'default'
    CLUSTER_NAME = 'EKS'
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Terraform Init') {
      steps {
        withCredentials([[
            $class: 'AmazonWebServicesCredentialsBinding',
            credentialsId: 'aws_creds'
            ]]) {
                dir('Infra'){
                  sh '''
                    terraform init -upgrade
                    terraform validate
                    terraform plan
                    terraform apply -auto-approve

                  '''
                }
            }
        }
    }
    stage('Docker Login') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-cred',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
          '''
        }
      }
    }

    stage('Build & Push Backend Images') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-cred',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
        sh '''
        docker build -t $DOCKER_USER/grocerybe:latest ./GroceryAppBe
        docker push $DOCKER_USER/grocerybe:latest

        docker build -t $DOCKER_USER/todosbe:latest ./TodosBe
        docker push $DOCKER_USER/todosbe:latest
        '''
        }
      }
    }

    stage('Deploy Backends (ClusterIP)') {
      steps {
        sh '''

        kubectl apply -f k8s/grocerybe_deployment.yml
        kubectl apply -f k8s/todosbe_deployment.yml

        kubectl rollout status deployment/grocery-backend -n $NAMESPACE
        kubectl rollout status deployment/todos-backend -n $NAMESPACE
        '''
      }
    }

    stage('Build & Push Frontend Images') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-cred',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
        sh '''
        docker build -t $DOCKER_USER/grocery-frontend:latest ./GroceryAppFe
        docker push $DOCKER_USER/grocery-frontend:latest

        docker build -t $DOCKER_USER/todos-frontend:latest ./TodosFe
        docker push $DOCKER_USER/todos-frontend:latest

        docker build -t $DOCKER_USER/homeapp-frontend:latest .
        docker push $DOCKER_USER/homeapp-frontend:latest
        '''
        }
      }
    }

    stage('Deploy Frontends') {
      steps {
        sh '''
        kubectl apply -f k8s/homeapp_deployment.yml
        kubectl apply -f k8s/groceryfe_deployment.yml
        kubectl apply -f k8s/todosfe_deployment.yml

        kubectl rollout status deployment/grocery-frontend -n $NAMESPACE
        kubectl rollout status deployment/todos-frontend -n $NAMESPACE
        kubectl rollout status deployment/homeapp-frontend -n $NAMESPACE
        '''
      }
    }

    stage('Deploy Ingress') {
      steps {
        sh '''
        kubectl apply -f k8s/ingress.yml
        '''
      }
    }

    stage('Fetch Ingress Host & Print URLs') {
        steps {
            script {
                echo "⏳ Waiting for ALB to be provisioned..."

                def ingressHost = ''

                for (int i = 1; i <= 30; i++) {
                    INGRESS_HOST = sh(
                        script: "kubectl get ingress app-ingress -n default -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' || echo ''",
                        returnStdout: true
                    ).trim()

                    if (INGRESS_HOST) {
                        echo "✅ Ingress is ready: ${INGRESS_HOST}"
                        break
                    }

                    echo "ALB not ready yet... retrying in 10s (attempt ${i})"
                    sleep 10
                }

                if (!INGRESS_HOST) {
                    error "❌ Ingress hostname not available after waiting"
                }
                echo "======================================="
                echo "✅ APPLICATION IS LIVE"
                echo "======================================="
                echo "🌐 ALB HOST:"
                echo "http://${INGRESS_HOST}"
                echo ""
                echo "🧺 Grocery App:"
                echo "http://${INGRESS_HOST}/grocery"
                echo ""
                echo "📝 Todos App:"
                echo "http://${INGRESS_HOST}/todos"
                echo ""
                echo "🏠 Home App:"
                echo "http://${INGRESS_HOST}/"
                echo ""
                echo "🔌 Grocery API:"
                echo "http://${INGRESS_HOST}/api/groceries"
                echo ""
                echo "🔌 Todos API:"
                echo "http://${INGRESS_HOST}/todosdb"
                echo "======================================="
            }
        }
    }
}
  post {
    success {
      echo "🎉 Deployment completed successfully"
    }
    failure {
      echo "❌ Deployment failed"
    }
  }
}