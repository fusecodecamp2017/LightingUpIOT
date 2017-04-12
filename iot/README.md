IoT All The Things
====

To get started with IoT you need to understand what it is. I recommend watching a few video's online like [this one](https://aws.amazon.com/iot-platform/) from amazon. What it basically explains is what Amazon gives us with their IoT system. For the actual code camp we can use my amazon account but if you want to play later you can sign up for an AWS developer account pretty much for free online [here](https://aws.amazon.com/s/dm/optimization/server-side-test/free-tier/free_np/). If you already have an account or to sign into the console you can do that [here](https://aws.amazon.com/iot/).

Once you sign in you can get started with the interactive 5 minute tutorial. This lets you create a "thing". In our case the "thing" is a light bulb but it just as easily could have been a car, a water faucet, your dryer or anything else in the real world. Make sure when you create the thing and generate the certificate that you save it. I have done that and saved our certificate to the "certificate" folder. All of this is to keep your "thing" safe from anyone else in the world who wants to control it. This is very important when you think about all the "things" that people will be creating!

The other part of this tutorial you will notice is you get an `ARN`. This is basically a global address that means you can talk to your lightbulb from anywhere. In fact anyone who wants to write code to talk to your light bulb will use this ARN. Our ARN in this case is `arn:aws:iot:us-east-1:358646606333:thing/LightBulb`.

So, lets turn the PI into a device using all this information! To do that we are going to use node again because its pretty straight forward. Amazon has a really excellent node library ready for us to program that you can find [here](https://github.com/aws/aws-iot-device-sdk-js). Jump over there and try to follow the instructions to see what you can get to!

The following are some steps that might help you when digging into IoT *after* you have created your thing:

1. In the IoT menu on the LHS of your screen select `connect`. Then select `configuring a device` (the first big option). You will now have the option to select the operating system and language. For this exercise we are going to use Linux and Node. Go ahead and select those.
2. Use a shell script to run the `start.sh` script (open terminal, `cd` to that folder and run `./shell.sh`). Once that finishes you should have what seems like a connection. What this is actually doing is it is running one of the example programs. Go ahead and open that program from `aws-iot-device-sdk/examples/device-example.js`. This example is also online but it is easier to see it working here. The actual keys that you are using are passed in command line which you can see from the `start.sh` program. Go ahead and have some fun by copying this program and customizing it a bit to have your own topic and commands that you send.
3. 










