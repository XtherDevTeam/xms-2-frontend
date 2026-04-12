# Refactor work of music player

Currently, the music player is a independent page of the web application. However, we wish it to be more flexible. Thus, it should be integrated into everywhere of the application, and can be pop out through a MiniPlayer floating at the bottom of the screen. For designing style, we maintain the heavy gauss blur effect for both MiniPlayer and the PlayerPage. In which we desire to use cover a dark/light color upon the background to highlight the content.

The Player page displayed as a window covering the content of the page with rounded corners, and the MiniPlayer displayed as a floating bar at the bottom of the screen.

In the player page, the right panel should be reserved for lyrics. Which would be implemented later. For the current playlist view, consider making a an independent dialog displaying the list with album cover, title, author, and delete button, etc. It highlight the current playing song and allow user to delete the song from the playlist.