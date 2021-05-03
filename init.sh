#/bin/bash
gradle build
docker build --build-arg JAR_FILE=build/libs/\*.jar -t xeitor/task-manager-spring .
pwd=`pwd`
dockerfilepath="${pwd}/frontEnd"
/bin/bash docker build $dockerfilepath -t task-manager-react

echo "Ready to run :)"

