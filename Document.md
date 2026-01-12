# HomeApp – Node.js Microservices on AWS EKS with Jenkins CI/CD

## Overview
HomeApp is a Node.js-based microservices application deployed on AWS EKS
using modern DevOps practices. The project demonstrates full automation
using Jenkins CI/CD pipelines, Kubernetes orchestration, MongoDB, and
GitHub Webhooks.

## Architecture
- Node.js frontend and backend services
- PM2 for Node.js process management
- Jenkins for CI/CD automation
- AWS EKS for Kubernetes orchestration
- MongoDB as the database
- NGINX Ingress as a single entry point

## CI/CD Pipeline (Jenkins)
1. Code pushed to GitHub
2. GitHub Webhook triggers Jenkins pipeline
3. Docker images built and tagged
4. EKS cluster created/updated via Jenkins
5. Kubernetes manifests applied
6. Rolling deployments executed

## Kubernetes Deployment
- Deployments for frontend and backend services
- ClusterIP Services for internal communication
- Single Ingress for external access
- Rolling updates enabled

## Database
- MongoDB used as the primary database
- Credentials and endpoints externalized
- Persistent storage configured

## Key Design Decisions
- ClusterIP services for security and cost efficiency
- Ingress for centralized traffic routing
- PM2 for reliable Node.js process management
- Jenkinsfile for pipeline-as-code

## Technologies Used
AWS EKS, Kubernetes, Jenkins, Docker, Node.js, PM2, MongoDB, GitHub, Linux
