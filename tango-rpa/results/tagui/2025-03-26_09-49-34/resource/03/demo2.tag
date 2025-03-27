chrome option --user-data-dir=C:/rpa_tools/chrome_profiles/03
chrome option --remote-debugging-port=9225
// TagUI script for logging into the website

// Visit the login page
https://the-internet.herokuapp.com/login

type username as tomsmith
type password as SuperSecretPassword!

// Click the login button
click //html/body/div[2]/div/div/form/button

// Wait for a while to see the result
wait 5
