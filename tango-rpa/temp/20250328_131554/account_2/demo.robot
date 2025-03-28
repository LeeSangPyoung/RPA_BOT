*** Settings ***
Documentation     Demo 로그인 테스트 (HerokuApp)
Library           SeleniumLibrary

*** Variables ***
${URL}             https://the-internet.herokuapp.com/login
${USERNAME}        tomsmith
${PASSWORD}        SuperSecretPassword!
${CHROMEDRIVER}    C:/rpa_tools/drivers/chromedriver.exe

*** Test Cases ***
Demo Login Test
    Open Browser       ${URL}    Chrome    executable_path=${CHROMEDRIVER}
    Maximize Browser Window
    Input Text         id:username       ${USERNAME}
    Input Text         id:password       ${PASSWORD}
    Click Button       css:button.radius
    Sleep              3s
    Capture Page Screenshot
    Location Should Contain    /secure
    Close Browser
