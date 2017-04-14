questions:
how do we group them together?
	two groups of three?
	one pi per group

how do we present the iot stuff to them?
	do this at the big monitor and have them come up and configure their devices group by group

Schedule:

	MORNING: The Raspberry Pi (on the pi)
	0900 - 0930		High level overview of project - end to end diagram and explanation 
	0930 - 1000		Introduction to Bluetooth 
						Show adafruit sniffer and tracelogs
						Use pi and the gatttool to interract with the lightbulb
	1000 - 1100		Using noble to create interactive node program 
	1100 - 1200 	Set up the device ("thing") in Amazon IOT - the thing is the pi that interracts with the lightbulb
					Put the "thing" (IoT) and the bluetooth commands together

	1200 - 1300		Lunch

	AFTERNOON: The Mobile App (Cloud9)
	1400 - 1500		Setup the thing client/shadow
	1500 - 1600		Create the mobile app
	1600+			Wrap up



Pre-configured Setup:
	-Pi 
		Set up on wifi network - cardinal network??
		Set up with github
		Provide bluetooth command outputs (for interactive gatttool)
		Provide quickstart project that receives aws commands ("thing")
	-AWS log in to AWS on central computer (big monitor) and have them set up their 'things'
	-Mobile App 
		Provide starter "thingShadow" for aws - communicates with AWS
		Base ionic project (Angular 1)
			-> put the beacon in
			-> put the shadow stuff in`



