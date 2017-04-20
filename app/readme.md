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

    npm install @ionic/cloud-angular --save
    ionic io init
    
Then finally add the required cloud settings like on [this site](https://docs.ionic.io/setup.html).


It Won't Work!!
=====

So, the previous section tells you how to debug in ionic view. This is pretty normal for most ionic apps. But, we are doing something here which is not completely main stream yet! So, we have a problem - it turns out that not all ionic native plug-ins are supported in ionic view. Remember, this is the way we access the hardware, so it means that we aren't going to be able to access iBeacons this way. Bummer! For a full list of Plug-Ins that ionic view does actually support you can see [this site](https://docs.ionic.io/tools/view/).

Well, even though this is a bummer, it turns out it isn't too terribly difficult to preview our app natively using the cordova API. All you need to do is the following:

1. Sign up for an apple developer account (https://developer.apple.com/). This is free actually.
2. Download and install XCode. Sad day but you can only do this on a Mac but thats ok, we can still work with this anyways.
3. Go to the "preferences" section of XCode and add your developer account.
4. Run the build on our project using either `ionic build` to build all platforms or `ionic build ios` to build ios only
5. Go ahead and open the `platforms` folder and navigate to the `ios` folder inside there. You should see an XCode project. Open that!
6. In the project properties which you can get to by right clicking on the project select your apple developer account/team so the project will be able to sign the project before deploy.
7. Finally you are ready to deploy. Plug in your iPhone into the USB port. Select it from the run menu next to the play button. Click play.
8. If this is the first time you have run something you will get an error that you can't launch the application on the phone. Don't worry, there is just one more step. You need to go to the settings on your phone and trust this developer account. Do that, and you can now launch the application.

TADA! The ionic plug ins will all work now just as you would expect them too. Well, sort of. It turns out apple still actually restricts a few things to fully paid developer accounts. So, if you take a look at [this page](https://developer.apple.com/programs/whats-included/). Note all the things under "advanced application capabilities". You are going to need to pay about $100 per year if you want to support any of these features. Thankfully we don't need this so away we go!

Putting It Together
=====

The final piece of the puzzle is to put all of this together. Lets pull in the code that we used in the last section along with the "iot-client" code to turn the light on when we get close to it. If you play around with the previous app you will notice that there are numbers on the screen. The first two numbers `major` and `minor` correspond to the specific device that we are looking at. If we wanted we could trigger specifically off just one specific beacon rather than off any beacon by UUID (Unique Identifier). The last and most fun number though is the number that is listed as `RSSI`. This actually stands for "Received Signal Strength Indicator". What we want to do is only turn the beacon on when the strength reaches some threshold, then turn it off again when it drops below that number or the beacon goes away entirely. Go ahead and work with the team to see if you can put this together.

Remember the client code we wrote before was in "node" (Plain old Javascript) so that means you will have to adjust a little bit to make it work in the phone app we wrote. There are some instructions on [this page](https://github.com/aws/aws-iot-device-sdk-js#browser-applications) to help us get started running this code in our phone application.

