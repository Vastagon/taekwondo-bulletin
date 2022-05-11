# Taekwondo Bulletin
I'm a competitive Taekwondo Fighter with a love of organization and learning. Unfortunately, the World Taekwondo Federation does not have my same love for organization, leading me to create this website. I'm trying to create a single space where competitors and coaches can go to communicate with each other, as well as post events that are happening near them, or that they are hosting. I wanted to have better organization within the community, so more people can start competing easier and it can help grow the sport.

**Link to project:** https://taekwondo-bulletin.herokuapp.com/

![alt tag](http://placecorgi.com/1200/650) Picture here

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, React, NodeJS, Express, MongoDB, Mongoose, Firebase, Cloudinary

This was created using React for the frontend and Node for the backend. I used noSQL/MongoDB to store the information for all of the text. This includes blogposts and event information. I then used Cloudinary to upload images that the users drop in when adding a new event. This is a backend and frontend application in one. I'm using Node to serve the build file to the client. The backend handles all of the data manipulation with MongoDB besides the cloudinary image upload. Firebase Authentication is used to allow users to log in. When logged in, their posts and replies on the blog uses their username instead of "Anonymous", which is used if not logged in. Email verifications are sent out when a user is created and can be sent out again by going to the user's profile page. Users can alse change their username or log out when visiting their profile page.

## Optimizations

*One optimization that I would make is to handle cloudinary uploads on the backend, rather than the frontend. I created the image feature when my knowledge of Node was still very basic.
*This site still isn't done, some things I'm working on in the future are
  *Users need to be verified to add an event
  *Users can see their posts on the profile page
  *Nested replies on the blog page
  *Able to comment on event cards
  
## Lessons Learned:

I learned a lot with this project. I learned how to post data to a route, my understanding of POST and GET requests has deepened immensely. I learned how to connect to mongoDB, read and write information on mongoDB, and how to effectively display that on the page. I got good practice with ternary operators and conditional rendering in React. My understanding of how states work and how React uses the virtual DOM to rerender the page, as well as the order of operations that take place each time the page rerenders. I accomplished things that I wasn't sure I could do, and now that those are done I'm able to set my sights even higher while trying to become a better developer.

# `Local Use`

## `Install packages`
Install the packages using npm install before trying to run the program

## `npm run dev`
Uses the concurrently package to run the server and run the react-scripts


