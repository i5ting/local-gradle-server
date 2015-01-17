# local-gradle-server

lgs is a local gradle server for android studio build

[![npm version](https://badge.fury.io/js/lgs.svg)](http://badge.fury.io/js/lgs)

## reason

```
 ./gradlew
Downloading http://services.gradle.org/distributions/gradle-1.12-all.zip
.......................................................................................................................................................................................................................................................................................................................................................................................................^C%                                        
```

this is unpatientfull
 
url  http://services.gradle.org/distributions/gradle-1.12-all.zip is in android studio project/gradle/wrapper/gradle-wrapper.properties

so 

## Install 

	 [sudo] npm install -g lgs
	 	
startup server

	> [sudo] lgs
	Local Gradle Server listening at http://0.0.0.0:5678
	distributionUrl=http\://127.0.0.1:5678/gradle-2.2.1-all.zip
	copied! you can paste anywhere
	
Note: 
	
- if in current path, gradle-2.2.1-all.zip is exist , it doesn't download anything.
- if gradle-2.2.1-all.zip is not exist , it will download gradle-2.2.1-all.zip from https://services.gradle.org/distributions/gradle-2.2.1-all.zip.
 

## Usage


change in  android studio `project/gradle/wrapper/gradle-wrapper.properties`

```
#Wed Apr 10 15:27:10 PDT 2013
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
distributionUrl=http\://127.0.0.1:5678/gradle-2.2.1-all.zip
```

execute result

```
➜  Slim-Android git:(master) ✗ ./gradlew 
Downloading http://127.0.0.1:5678/gradle-2.2.1-all.zip
..................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................
Unzipping /Users/sang/.gradle/wrapper/dists/gradle-2.2.1-all/2tjqpr11coprdv33p03vafhh49/gradle-2.2.1-all.zip to /Users/sang/.gradle/wrapper/dists/gradle-2.2.1-all/2tjqpr11coprdv33p03vafhh49
Set executable permissions for: /Users/sang/.gradle/wrapper/dists/gradle-2.2.1-all/2tjqpr11coprdv33p03vafhh49/gradle-2.2.1/bin/gradle
```
 
## Example

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## 版本历史

- v1.0.0 初始化版本 


## 欢迎fork和反馈

在issue提问或邮件shiren1118@126.com

## License

this gem is released under the [MIT License](http://www.opensource.org/licenses/MIT).
