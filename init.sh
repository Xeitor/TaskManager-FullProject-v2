#/bin/bash
gradle build
docker build --build-arg JAR_FILE=build/libs/\*.jar -t xeitor/task-manager-spring .
pwd=`pwd`
dockerfilepath="${pwd}/frontEnd/"
echo $dockerfilepath
build $dockerfilepath -t task-manager-react

echo "Ready to run :)"

