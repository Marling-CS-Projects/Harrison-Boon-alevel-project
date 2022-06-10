# 2.1 Design Frame

## System Diagram

![System Diagram](<../.gitbook/assets/WHAT.drawio (1).png>)

The system diagram outlines goals of development for my game that will serve as the criteria for my success. Due to how ambitious the diagram is, I have separated each goal into three different colours, each one representing how necessary I think the feature is. Similarly, the diagram is also split into 5 different branches which each deal with important major features of the game.

<mark style="color:blue;">Blue</mark> - Integral parts of the game that should be included in the solution\
<mark style="color:green;">Green</mark> - Parts of the game that are important but not necessary\
<mark style="color:red;">Red</mark> - Parts that would be nice to include but should only be completed after everything else is finished

## Usability Features

Usability features are really important in my game as it needs to be accessible to as many people as possible. It will also take away from the enjoyment and relaxation of the game if the game is not usable. There are 5 key areas of usability that will be used to create the best user experience.

### Effective

Players should be able to know what their goal is and their goals should be acheveable without too much effort or difficulty. The progress tracking in game should be clear and easy to understand so that the player knows information about themself

### Efficiency

Efficiency is based around how quickly players can complete a goal or a task in the game and also whether or not they are easy to complete. This mean I will have to ensure that the UI is easy to navigate and useful. I think that in order for it to be easy to use it should take at a maximum 3 clicks in order for a player to change any setting. &#x20;

### Engaging

The solution must be fun to play in order for the game to be engaging for the player. To do this, I plan on including a lot of engaging conent such as multiplayer and a procedurally generated map. These features are designed to keep the player engaged for extended periods of time and promote  possible replaying of the game.

### Error Tolerant

My solution should run into as few errors as possible when the player is playing the game. If one does occur my game should be able to handle it appropriately. To prevent errors, I will test my game using unit testing which is an effective way of testing and debugging that focus on clearing each module at a time instead of testing as a whole.

### Easy To Learn

My game should be easy to learn in all aspects. This includes: controls, mechanics and goals. Easiness to learn of my solution is important as the game could be unenjoyable if the player does not know how to play the game or if they have to put too much effort into learning the game's mechanics. One way this could be achieved is by keeping the controls similar to that of other games and by making the mechanics realistic.

## Pseudocode for the Game

### Pseudocode for main menu

```
displayWelcomeScreen()
showSaveScreen()

while not isSaveSelected
    wait
end while

loadPlayerSave()
displayHomeScreen()

while not isLevelSelected
    wait
end while

switch optionChosen
    case "Join"
        askForGameCode()
    end case
    case "Host"
        displayOptionsMenu()
        while not isMenuComplete
            wait
        end while
        startNewServer()
        displayLobbyMenu()
        while not isMenuComplete
            wait
        end while
        startGame()
    end case
    case "Upgrades & Cars"
        displayShopMenu()
        switch optionChosen
            case "Buy"
                displayCarsAvailable()
            end case
            case "Upgrade"
                displayUpgradesAvailable()
            end case
        end switch
    end case
end switch
```

### Pseudocode for a level

This shows the basic layout of code for a Phaser scene. It shows where each task will be executed.

```
class Level extends Phaser Scene

    procedure preload
        load all sprites and music
    end procedure
    
    procedure create
        start music
        draw background
        create players
        create platforms
        create puzzle elements
        create enemies
        create obstacles
        create finishing position
        create key bindings
    end procedure
    
    procedure update
        handle key presses
        move player
        move interactable objects
        update animations
        check if player at exit
    end procedure
    
end class
```
