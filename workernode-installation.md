#!/bin/bash
# Update & install dependencies
apt update -y
apt install -y fontconfig openjdk-21-jre docker.io curl awscli unzip lsb-release gnupg software-properties-common wget

# Set JAVA_HOME
echo "export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64" >> /etc/profile
source /etc/profile

# Docker setup
systemctl enable --now docker
usermod -aG docker ubuntu   # default EC2 user
systemctl restart docker

# kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
mv kubectl /usr/local/bin/
kubectl version --client --short

# Terraform
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | tee /etc/apt/sources.list.d/hashicorp.list
apt update -y
apt install -y terraform
terraform -version
