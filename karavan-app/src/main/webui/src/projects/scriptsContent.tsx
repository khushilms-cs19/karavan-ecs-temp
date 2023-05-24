export const readmeContent = `# Karavan
## Karavan is a project management tool for software development teams.
`;

export const runtimeCheckScript = `# check for java
if ! [ -x "$(command -v java)" ]; then
  echo 'Error: java is not installed.' >&2
  exit 1
fi
# check for maven
if ! [ -x "$(command -v mvn)" ]; then
  echo 'Error: mvn is not installed.' >&2
  exit 1
fi


if ! [ -x "$(command -v jbang)" ]; then
  echo 'Error: jbang is not installed.' >&2
  curl -Ls https://sh.jbang.dev | bash -s - app setup
  echo "Jbang installed"
  echo "Jbang version: $(jbang --version)"
  echo "Installing camel using jbang"
  jbang app install camel@apache/camel
fi`;


export const quarkusExportScript = (projectName: string) => `sh ../runtime-check.sh
if [ $? -ne 0 ]; then
    echo "The program checks for the files failed."
    exit 1
fi

cd ../project

PROJECT_NAME=${projectName}

echo "Running camel export command..."

camel run * --max-seconds=1

camel export --directory=../quarkus-project --gav=org.mckinsey.com:$PROJECT_NAME:1.0.0 --runtime=quarkus

cd ../quarkus-project
echo "Running 'mvn clean install'..."
mvn clean install`;

export const quarkusDeployLocalScript = `# test install
sh ../runtime-check.sh

if [ $? -ne 0 ]; then
    echo "The program checks for the files failed."
    exit 1
fi

sh export.sh
if [ $? -ne 0 ]; then
    echo "The build for the file failed."
    exit 1
fi

sh run.sh
if [ $? -ne 0 ]; then
    echo "The run for the file failed."
    exit 1
fi`;

export const quarkusRunScript = (projectName: string) => `sh ../runtime-check.sh

PROJECT_NAME=${projectName}

if [ $? -ne 0 ]; then
    echo "The program checks for the files failed."
    exit 1
fi

cd ../quarkus-project

java -jar target/quarkus-app/quarkus-run.jar`;

export const quarkusTestScript = `sh ../runtime-check.sh

if [ $? -ne 0 ]; then
    echo "The program checks for the files failed."
    exit 1
fi

camel run *`;

export const srpingExportScript =(projectName: string) => `sh ../runtime-check.sh

if [ $? -ne 0 ]; then
    echo "The program checks for the files failed."
    exit 1
fi

cd ../project

PROJECT_NAME=${projectName}

echo "Running camel export command..."

camel run * --max-seconds=1

camel export --directory=../spring-boot-project --gav=org.mckinsey.com:$PROJECT_NAME:1.0.0 --runtime=spring-boot

cd ../spring-boot-project
echo "Running 'mvn clean install'..."
mvn clean install`;

export const springDeployLocalScript = `sh ../runtime-check.sh

if [ $? -ne 0 ]; then
    echo "The program checks for the files failed."
    exit 1
fi

sh export.sh
if [ $? -ne 0 ]; then
    echo "The build for the file failed."
    exit 1
fi

sh run.sh
if [ $? -ne 0 ]; then
    echo "The run for the file failed."
    exit 1
fi`;

export const springRunScript = (projectName: string) => `sh ../runtime-check.sh

PROJECT_NAME=${projectName}

if [ $? -ne 0 ]; then
    echo "The program checks for the files failed."
    exit 1
fi

cd ../spring-boot-project

java -jar target/$PROJECT_NAME-1.0.0.jar`;

export const springTestScript = `sh ../runtime-check.sh

if [ $? -ne 0 ]; then
    echo "The program checks for the files failed."
    exit 1
fi

camel run *`;