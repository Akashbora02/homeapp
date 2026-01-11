#!/bin/bash
# Update & install dependencies
sudo apt update -y
sudo apt install -y fontconfig openjdk-21-jre docker.io curl awscli unzip lsb-release gnupg software-properties-common wget
sudo 
# Set JAVA_HOME
sudo echo "export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64" >> /etc/profile
sudo source /etc/profile
sudo 
# Docker setup
sudo systemctl enable --now docker
sudo usermod -aG docker ubuntu   # default EC2 user
sudo systemctl restart docker
sudo 
# kubectl
sudo curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo chmod +x kubectl
sudo mv kubectl /usr/local/bin/
sudo kubectl version --client --short
sudo 
# Terraform
sudo wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
sudo echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update -y
sudo apt install -y terraform
sudo terraform -version