
/* Requires the Docker Pipeline plugin */
pipeline {
    agent any {
        stage('Verify tooling') {
            steps {
                sh '''
                    docker info
                    docker version
                    docker compose version
                    curl --version
                    jq --version
                '''
            }
        }
    }
}