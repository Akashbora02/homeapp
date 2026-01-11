pipeline {
  agent {
    label 'homeapp'
  }

  environment {
//    KUBECONFIG_CRED = credentials('kubeconfig-id')
    NAMESPACE = 'default'
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
            credentialsId: 'aws-creds'
            ]]) {
                dir('Infra'){
                  sh '''
                    terraform init
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
        docker build -t $DOCKER_USER/grocery-be:latest ./GroceryAppBe
        docker push $DOCKER_USER/grocery-be:latest

        docker build -t $DOCKER_USER/todos-be:latest ./TodosBe
        docker push $DOCKER_USER/todos-be:latest
        '''
        }
      }
    }
  }
/*    stage('Deploy Backends (ClusterIP)') {
      steps {
        sh '''
        kubectl apply -f k8s/grocery-be_deployment.yaml
        kubectl apply -f k8s/todos-be_deployment.yaml

        kubectl rollout status deployment/grocery-backend -n $NAMESPACE
        kubectl rollout status deployment/todos-backend -n $NAMESPACE
        '''
      }
    }

    stage('Build & Push Frontend Images') {
      steps {
        sh '''
        docker build -t $DOCKER_USER/grocery-fe:latest ./GroceryAppFe
        docker push $DOCKER_USER/grocery-fe:latest

        docker build -t $DOCKER_USER/todos-fe:latest ./TodosFe
        docker push $DOCKER_USER/todos-fe:latest

        docker build -t $DOCKER_USER/homeapp-fe:latest .
        docker push $DOCKER_USER/homeapp-fe:latest
        '''
      }
    }

    stage('Deploy Frontends') {
      steps {
        sh '''
        kubectl apply -f k8s/homeapp_deployment.yaml

        kubectl rollout status deployment/grocery-frontend -n $NAMESPACE
        kubectl rollout status deployment/todos-frontend -n $NAMESPACE
        kubectl rollout status deployment/homeapp-frontend -n $NAMESPACE
        '''
      }
    }

    stage('Deploy Ingress') {
      steps {
        sh '''
        kubectl apply -f k8s/ingress.yaml
        '''
      }
    }

    stage('Fetch Ingress Host & Print URLs') {
      steps {
        script {

          echo "⏳ Waiting for ALB to be provisioned..."
          sleep 40

          def INGRESS_HOST = sh(
            script: """
              kubectl get ingress app-ingress \
              -n $NAMESPACE \
              -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'
            """,
            returnStdout: true
          ).trim()

          if (!INGRESS_HOST) {
            error "❌ Ingress hostname not found"
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
          echo "http://${INGRESS_HOST}/todos"
          echo "======================================="
        }
      }
    }
  } 
*/
  post {
    success {
      echo "🎉 Deployment completed successfully"
    }
    failure {
      echo "❌ Deployment failed"
    }
  }
}
