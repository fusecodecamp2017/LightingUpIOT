Building A Phone App
====

Its time now to build a phone application. We are going to roughly be following the instructions that you find on [this site](https://ionicallyspeaking.com/2017/01/16/creating-a-beacon-application-with-ionic-2/). In our case we are going to be working on Cloud9 so I already did the setup but in case you need to start from scratch you will need the following:

1. Install node on your computer
2. Install ionic globally (`npm install -g ionic cordova`)

Once you have those basic done, follow the guide to create the model, and the provider. Be sure to watch for copy and paste because the single quotes and double quotes change on you and mess a lot of things up! After you create those two files, but before you run the code you are going to need to install the ibeacon plug in. In order to do that you need to run the following commands:

    ionic plugin add cordova-plugin-ibeacon
    npm install --save @ionic-native/ibeacon

The guide missed the second of these! Continue through the rest of the guide as it has been written.


Time to Test
=====

Once you finish the guide you now have something that _should_ work but you can't really test it on a computer because these apps were really meant to be run on actual devices. Especially with bluetooth that is always the case. So, lets go ahead and use the ionic io site to do this. We'll use my account in the actual day but you can also sign up for free online at `ionic.io`. Lets run the following commands:

    ionic io init

