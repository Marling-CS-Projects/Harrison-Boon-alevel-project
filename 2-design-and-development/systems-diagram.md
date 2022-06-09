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

The solution is engaging for the user to use. To do this, I will create 5 levels and an online multiplayer mode to keep the players engaged and allow them to have fun while playing the game. Using vector style art will also make the game nicer to look at than blocks, so will draw more people in, keeping them engaged.

#### Aims

* Create a series of levels to work through
* Create a multiplayer mode to play
* Incorporate a style of game art the suits the game

### Error Tolerant

The solution should have as few errors as possible and if one does occur, it should be able to correct itself. To do this, I will write my code to manage as many different game scenarios as possible so that it will not crash when someone is playing it.

#### Aims

* The game doesn't crash
* The game does not contain any bugs that damage the user experience

### Easy To Learn

The solution should be easy to use and not be over complicated. To do this, I will create simple controls for the game. I will make sure that no more controls are added than are needed in order to keep them as simple as possible for the players.

#### Aims

* Create a list of controls for the game
* Create an in-level guide that helps players learn how to play the game

## Pseudocode for the Game

### Pseudocode for game

This is the basic layout of the object to store the details of the game. This will be what is rendered as it will inherit all important code for the scenes.

```
object Game
    type: Phaser
    parent: id of HTML element
    width: width
    height: height
    physics: set up for physics
    scenes: add all menus, levels and other scenes
end object

render Game to HTML web page
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
