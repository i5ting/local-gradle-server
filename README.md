# local-gradle-server

lgs is a local gradle server for android studio build

[![npm version](https://badge.fury.io/js/lgs.svg)](http://badge.fury.io/js/lgs)

## 我的场景说明

```
 ./gradlew
Downloading http://services.gradle.org/distributions/gradle-1.12-all.zip
.......................................................................................................................................................................................................................................................................................................................................................................................................^C%                                        
```

this is unpatientfull
 
url  http://services.gradle.org/distributions/gradle-1.12-all.zip is in android studio project/gradle/wrapper/gradle-wrapper.properties

so 

## Install 

	 npm install -g lgs
	 	 
## Usage

startup server

	> lgs
	Local Gradle Server listening at http://0.0.0.0:5678
	http://127.0.0.1:5678/gradle-2.2.1-all.zip
 
change in  android studio project/gradle/wrapper/gradle-wrapper.properties

#Wed Apr 10 15:27:10 PDT 2013
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
distributionUrl=http\://127.0.0.1:5678/gradle-2.2.1-all.zip

 
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
