# LightingUpIOT

Welcome to lighting up the world with IoT. More will be coming to this project soon, so watch for updates!

# Bluetooth + Pi Setup

### Some Background Information

We want to begin this project by configuring our Raspberry Pi to be able to turn on and off a bluetooth lightbulb. To get this process going you are going to need a bluetooth lightbulb. Personally, I purchased the Flux brand bluetooth lightbulb from amazon although basically any bulb would do. As of working on this project you can purchase that lightbulb [here](https://www.amazon.com/Flux-Bluetooth-Smart-Light-Generation/dp/B016NVSI7G/ref=sr_1_1?ie=UTF8&qid=1491085346&sr=8-1&keywords=flux+bluetooth).

While some light bulbs come with a pre-built SDK for you to use (think: someone put together all the bluetooth or wifi commands), cheaper bulbs like the Flux or WizLight don't provide these. What that means is we need to do a bit of investigation at a low level before we are going to be able to turn the bulb on and off. There are a few main ways we can go about this process.

1. Android Debug Logs - The first is if you have an android phone or other android device you can enable bluetooth debugging. This is going to log all the commands that are sent over bluetooth. Once you do this you can install the phone app that controls the light bulb and interact with it. Examining the logs in Wireshark will reveal what is being sent and allow you to reverse engineer those commands.

1. BlueZ Library - BlueZ is a command line tool that we can run on Ubuntu, Linux or other similar operating systems that allows us to sniff traffic.

1. Bluetooth Sniffer - If you want to be a little more fancy you can purchase bluetooth sniffing hardware online. One example of this is the BluefruitLE sniffer that sniffs out BLE (Bluetooth Low Energy) signals. Its about 30 bucks and works best on windows. You can purchase that online [here](https://www.adafruit.com/product/2269)

### Getting Ready For Bluetooth Debugging

Since I didn't have an android device and I wanted to keep this project cheap I thought we would go ahead and use the BlueZ tool for debugging. This is especially good since we are already using the Raspberry Pi in this project. To get your PI up and running and ready to debug you should follow these instructions:

1. Install The Operating System - There are great instructions for that [here](https://www.raspberrypi.org/documentation/installation/installing-images/).

1. Install your WiFi and get that setup - Mostly this just involves adding the correct configuration in `/etc/wpa_supplicant/wpa_supplicant.conf`. At its simplest you should have something like:

        network={
          ssid="<your network>"
          psk="<your password"
        }

    You can also have multiple networks in this file if you are moving between networks. If you get lost editing this file, the best place to go is [here](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md) which is a step by step guide to getting WiFi working.

1. You need to install the BlueZ tools. The best way to do this is from source. Once again, there are great instructions online that you can follow [here](https://learn.adafruit.com/install-bluez-on-the-raspberry-pi/installation). You'll want to follow all of these instructions including setting up the experimental features.

### Bluetooth Debugging With `gatttool`

Now that we have the BlueZ library installed we are going to follow the instructions found online [here](https://learn.adafruit.com/reverse-engineering-a-bluetooth-low-energy-light-bulb/control-with-bluez) to debug the lightbulb and find out what commands are being sent. Essentially we are going to turn the Pi into a bluetooth sniffing device. To do this we are going to follow the instructions on [this site](https://learn.adafruit.com/reverse-engineering-a-bluetooth-low-energy-light-bulb/control-with-bluez)


The guide is really helpful, but a bit wordy. For our purposes the commands to run in order are:

    # First, lets turn on bluetooth
    sudo hciconfig hci0 up

    # Check and make sure you see the word "RUNNING"
    hciconfig

    # Turn on the lightbulb, then run this to look for the lightbulb. Press Ctrl+C to kill.
    sudo hcitool lescan

    # Open this an connect to the lightbulb. This has our address in it
    sudo gatttool -I
    connect 04:A3:16:9C:B9:78

Yay! You are now connected between the PI and the lightbulb. Its time to try out those attributes. First, you can see what attributes there are:

    primary







