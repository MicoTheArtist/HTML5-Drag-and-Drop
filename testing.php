<?
	/*
	$command = "screencapture ~/Desktop/screen_capture.png";
	exec($command);
	
	$command = "ffmpeg -i ~/Desktop/output.mpg ~/Desktop/IcoMoon/output_new.mpg";
	if (exec("ffmpeg -i ~/Desktop/output.mpg ~/Desktop/IcoMoon/output_new.mpg")) {
		echo "It worked.";
	}
	else {
		echo "nope";
	}
	*/
	if (exec("ffmpeg -i Users/manuelespinosa/Desktop/output.mpg Users/manuelespinosa/DesktopIcoMoon/output_new.mpg")) {
		echo "It worked";	
	}
	else {
		echo "Nope";
	}
?>