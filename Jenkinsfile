
/* Requires the Docker Pipeline plugin */
pipeline {
    agent { docker { image 'node:22.17.0-alpine3.22' } }
    stages {
        stage('build') {
            steps {
                sh 'node --version'
            }
        }
    }
}