pipeline {
  agent any

  environment {
    AWS_REGION = 'us-east-1'
    ECR_REPO = '123456789012.dkr.ecr.us-east-1.amazonaws.com/springboot-ecr'
    IMAGE_TAG = "latest"
  }

  stages {
    stage('Checkout') {
      steps {
          git branch: 'main', url: 'https://github.com/Saddam-Hossen/AWSDevicemanagement'      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build("${ECR_REPO}:${IMAGE_TAG}")
        }
      }
    }

    stage('Login to ECR') {
      steps {
        script {
          sh """
          aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO
          """
        }
      }
    }

    stage('Push Image to ECR') {
      steps {
        script {
          sh "docker push ${ECR_REPO}:${IMAGE_TAG}"
        }
      }
    }

    stage('Deploy to EKS') {
      steps {
        script {
          // Assumes kubectl is configured on Jenkins server with access to EKS cluster
          sh """
          kubectl set image deployment/springboot-deployment springboot-container=${ECR_REPO}:${IMAGE_TAG} --record
          """
        }
      }
    }
  }

  post {
    success {
      echo 'Deployment succeeded!'
    }
    failure {
      echo 'Deployment failed!'
    }
  }
}
