
/* Requires the Docker Pipeline plugin */
pipeline {
    agent any 
    stages {
        stage('Verify tooling') {
            steps {
                sh '''
                    docker version
                    docker info
                    docker compose version
                    curl --version
                '''
            }
        }
        stage('Prune Docker Data') {
            steps {
                sh 'docker system prune -a --volumes -f'
            }
        }
        stage('Start container') {
            steps {
                sh 'docker compose up -d --no-color --wait'
                sh 'docker compose ps'
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'docker compose exec -T app npm ci'
            }
        }
        stage('Run Playwright tests') {
            steps {
                sh 'docker compose exec -T app npx playwright test'
            }
        } 
    }
}