# Mobile Web Graphics Tutorial

## To start:
1. run npm install
1. run npm start
1. open in a browser: http://localhost:5005
1. open in a mobile browser: http://[your-ip-address]:5005

## The Task
1. It needs to be fast
2. It needs to be able to scale to a larger amount of images in terms of memory and performance
3. It needs to work on mobile
4. It needs to be responsive: the image height is fixed to all the images but cannot be a hardcoded value.
5. The scroll bars need to represent the expected height of the page and move together with the user's scrolling

## Tips on how to make it fast:
### Layered Viewport Management
* Only have a limited amount of DOM components at any given time, equivalent to the viewport + buffer
* Have three layers behind each other: front layer with the full image, mid layer with thumbnail, and back with the prominent color. The back layers should be larger, as they'd be visible when scrolling
* 
### Direct Compositing
* Use will-change: transform on "atomic" elements (rectangles and images)

### Background Image Caching
* Download images in a worker as a blob
* Save them to indexeddb as base64
* In the main page, try to access indexeddb and get the base64 image if it's there. if not, tell the worker to download it to cache

### Fix the height of the body
* Use translateY() to have at least one element that goes all the way down to the expected height of the body so that scrolling works as expected.


