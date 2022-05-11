# `Overview`
I'm a competitive Taekwondo Fighter with a love of organization and learning. Unfortunately, the World Taekwondo Federation does not have my same love for organization, leading me to create this website. I'm trying to create a single space where competitors and coaches can go to communicate with each other, as well as post events that are happening near them, or that they are hosting. I wanted to have better organization within the community, so more people can start competing easier and it can help grow the sport.

## `Live Site`
It uses heroku, so you may have to refresh the page to allow the dyno to wake up
https://taekwondo-bulletin.herokuapp.com/

## `Features`
* Users can login using Firebase Authentication, this will change their name when posting a comment on the blog. Users can view their profile by clicking on their name. From there, they can sign out, send a verification email, or change their username.
* Users are able to post events to the events page, these events hold inforamtion like registration date and who is holding the event. It also requires a picture for promotional reasons
* Users can search for events by state


# `Install packages`
Install the packages using npm install before trying to run the program

## `npm run dev`
Uses the concurrently package to run the server and run the react-scripts

### `firebase emulators:start --only auth`
Start the firebase emulator for authentication
