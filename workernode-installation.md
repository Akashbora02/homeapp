sudo apt update
sudo apt install -y docker.io curl awscli
sudo systemctl enable --now docker
sudo usermod -aG docker $USER && newgrp docker
sudo systemctl restart docker

# kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/
kubectl version --client
