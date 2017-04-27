# Bluetooth + Pi Setup

### Some Background Information

We want to begin this project by configuring our Raspberry Pi to be able to turn on and off a bluetooth lightbulb. To get this process going you are going to need a bluetooth lightbulb. Personally, I purchased the Flux brand bluetooth lightbulb from amazon although basically any bulb would do. As of working on this project you can purchase that lightbulb [here](https://www.amazon.com/Flux-Bluetooth-Smart-Light-Generation/dp/B016NVSI7G/ref=sr_1_1?ie=UTF8&qid=1491085346&sr=8-1&keywords=flux+bluetooth).

While some light bulbs come with a pre-built SDK for you to use (think: someone put together all the bluetooth or wifi commands), cheaper bulbs like the Flux or WizLight don't provide these. What that means is we need to do a bit of investigation at a low level before we are going to be able to turn the bulb on and off. There are a few main ways we can go about this process.

1. Android Debug Logs - The first is if you have an android phone or other android device you can enable bluetooth debugging. This is going to log all the commands that are sent over bluetooth. Once you do this you can install the phone app that controls the light bulb and interact with it. Examining the logs in Wireshark will reveal what is being sent and allow you to reverse engineer those commands.

1. iOS debugging - Basically with any iOS device you can install what is called a "Profile". Based on the profile different system aspects will be logged. In order to debug bluetooth you can go to [this site](https://developer.apple.com/bug-reporting/profiles-and-logs/) and search for bluetooth. Once you get the profile downloaded on the actual device debugging will be automatically enabled. After using the application simply sync back up with iTunes and you should be able to find the debug logs in the system folder of "~/Library/Logs/CrashReporter/MobileDevice/[Your_Device_Name]/DiagnosticLogs/sysdiagnose". Unfortunatly you must sync your entire phone/device in order to get these logs.

1. Bluetooth Sniffer - If you want to be a little more fancy you can purchase bluetooth sniffing hardware online. One example of this is the BluefruitLE sniffer that sniffs out BLE (Bluetooth Low Energy) signals. Its about 30 bucks and works best on windows. You can purchase that online [here](https://www.adafruit.com/product/2269)

### Bluetooth Debugging

Since I didn't have an android device and I wanted to keep this project simple I thought we would go ahead and use the Adafruit BluefruitLE sniffer. This device basically when installed and configured will sniff out based on a device id. Because the lightbulb is always sending out a signal I have chosen to use that as the "Master" and my phone shows up as the "Slave". Opening the logs in Wireshark doesn't look particularly exciting but it actually has all the information we need to hack this bluetooth lightbulb. If you examine the logs closely and look at the "GATT" (Bluetooth Attribute Messages) you will see repeated messages that seem to correspond to the events we wish to control.

### Setup your PI

Lets test out whether or not we can replay some of these messages to control the light bulb. For this we are going to use the BlueZ tool. This is especially good since we are already using the Raspberry Pi in this project. To get your PI up and running and ready to debug you should follow these instructions:

1. Install The Operating System - There are great instructions for that [here](https://www.raspberrypi.org/documentation/installation/installing-images/).

1. Install your WiFi and get that setup - Mostly this just involves adding the correct configuration in `/etc/wpa_supplicant/wpa_supplicant.conf`. At its simplest you should have something like:

        network={
          ssid="<your network>"
          psk="<your password"
        }

    You can also have multiple networks in this file if you are moving between networks. If you get lost editing this file, the best place to go is [here](https://www.raspberrypi.org/documentation/configuration/wireless/wireless-cli.md) which is a step by step guide to getting WiFi working.

1. You need to install the BlueZ tools. The best way to do this is from source. Once again, there are great instructions online that you can follow [here](https://learn.adafruit.com/install-bluez-on-the-raspberry-pi/installation). You'll want to follow all of these instructions including setting up the experimental features.

### Testing and Debugging With `gatttool`

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

So, now that we are connected lets try a few commands. With some luck you will figure out the following are some of the basic lightbulb commands:

* Turn On:  `char-write-cmd 0x002e cc2333`
* Turn Off: `char-write-cmd 0x002e cc2433`
* Blue:  `char-write-cmd 0x002e 560000FF00f0aa`
* Green: `char-write-cmd 0x002e 5600FF0000f0aa`
* Red:   `char-write-cmd 0x002e 56FF000000f0aa`

Interestingly enough - messing around with the brightness just changes the color to a darker or lighter version of the same color! So really that is all we need as far as commands we should be sending! So, now that we have all that worked out it is time to program these commands in!

### Programming BLE In Node

We want to be able to do the same thing that the gatt tool is doing but now through a program that we write. Lets get node installed on the PI then we should be able to use a GATT library with bluez to run these commands programmatically! To do that you just run the following commands:

    # as it turns out the package list is old so we need to update that first
    curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -

    # and as it turns out GCC is also old, so you need this as well:
    sudo apt-get install gcc-4.8 g++-4.8
    sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 50
    sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 50

    # then we can install the current node and npm
    sudo apt-get install nodejs npm

We are going to use a noble library for gatt in node from [here](https://github.com/sandeepmistry/noble) so to get that you will use:

    npm init
    sudo npm install noble --save --unsafe-perm

Assuming that things don't turn out well (as they don't always) you may also need to install `bleno` with the command `npm install --save bleno`. This seemed to help when I originally got things to work. So now its time to have some fun coding. I put together a sample application in the "bluetooth_v2" branch but lets work together to create parts of this program. Have some fun with it and make it your own!

After you finish with this and feel good about what you can do with the light bulb its time to get started with IoT itself. Remember, we want to control this light from the internet, not just a keyboard plugged into the Raspberry Pi!!
