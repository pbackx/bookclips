Book Clips
==========

Purpose
-------

Have you ever read a (paper) book and wanted to quickly safe a clip for later.
On a eReader you can simple mark and store. On paper, not so much. You can 
use a marker to highlight parts, but how about finding your clips back later on?

Book Clips is a mobile app which allows you to take a picture of the section you
want to clip. On top of that, it will also analyze and tag your clip with important 
items in there, such as locations and dates.

Technical
---------

This app is built using AWS API's. It uses Rekognition to find text and Comprehend
to analyze the text.

*note*: Rekognition has a limit of 50 words, so you can't scan a full page. I'm 
working on a workaround for this.

Current state
-------------

The app is not yet available in the app store. I first want to extend the stored
data to also contain the book title and page number.

There's also still a lot of debug information being output to the console and it's
not very capable of dealing with error conditions.

There is currently no S3 bucket cleanup code, which is potentially expensive.

Development
-----------

If you want to work on this application, you'll need the latest Ionic version 
installed. All other requirements will be installed automatically when you first
run the application.

You also need an AWS account with:
 * An S3 bucket to store pictures before they are analyzed.
 * Some credential source, for instance a Cognito identity pool.
 * A role that has access to:
   * read/write access to your S3 bucket
   * rekognition:DetectText
   * comprehend:DetectEntities

You could use your own root account for a quick test, but do not release your root
API key to the public in an app!

Because of the use of the camera, the only way to fully test this is in an emulator 
or on a real device, so this cannot be run in a browser (Please let me know if you 
know how to use the laptop camera.)

Pull requests are very welcome!  
