import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

//console.log( fifaData[ 828 ] );

let fifaFinals = fifaData.filter( game => game[ 'Year' ] == 2014 && game[ 'Stage' ] === "Final" )[ 0 ];

console.log( `2014 World Cup Final:\n
                (a) Home Team: ${ fifaFinals[ 'Home Team Name' ] }\n
                (b) Away Team: ${ fifaFinals[ 'Away Team Name' ] }\n
                (c) Home Team Goals: ${ fifaFinals[ 'Home Team Goals' ] }\n
                (d) Away Team Goals: ${ fifaFinals[ 'Away Team Goals' ] }\n
                (e) 2014 World Cup Winner: ${ fifaFinals[ 'Home Team Name' ] }` );

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */
let getFinals = fifaData => fifaData.filter( game => game[ 'Stage' ] === "Final" ); 
//console.log( getFinals( fifaData ) );

/* Task 3: Impliment a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */
let getYears = getFinals => getFinals( fifaData ).map( game => game[ "Year" ] ); 
//console.log( getYears( getFinals ) );

/* Task 5: Impliment a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 
let getWinners = getFinals => getFinals( fifaData ).map( game => game[ "Home Team Goals" ] != game[ "Away Team Goals" ] ? ( game[ "Home Team Goals" ] > game[ "Away Team Goals" ] ? game[ "Home Team Name" ] : game[ "Away Team Name" ] ) : game[ "Win conditions" ].split( " " )[ 0 ] );
//console.log( getWinners( getFinals ) );

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear( getWinners, getYears )
{
    let years = getYears( getFinals );
    return getWinners( getFinals ).map( ( team, index ) => `In ${ years[ index ] }, ${ team } won the world cup!` );
}

//console.log( getWinnersByYear( getWinners, getYears ) );

/* Task 7: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins( fifaData, initials ) 
{
    let countryName = "";
    let finals = getFinals( fifaData );
    let winners = getWinners( getFinals );
    
    for( let i = 0; i < finals.length; i++ )
    {
        if( finals[ i ][ 'Home Team Initials' ]  === initials )
        {
            countryName = finals[ i ][ 'Home Team Name' ];
            break;
        }
        else if( finals[ i ][ 'Away Team Initials' ]  === initials )
        {
            countryName = finals[ i ][ "Away Team Name" ];
            break;
        }
    }
    return winners.reduce( ( val, winner ) => winner === countryName ? val + 1 : val, 0 );
};

//console.log( getCountryWins( fifaData, "" ) );



// let x = [];

// for( let i = 0; i < 10; i++)
//     x.push( { "games" : 0, "gols" : 0 } );




/* Task 8: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals( fifaData ) 
{


};

getGoals( fifaData );


/* Task 9: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();


/* Task 10: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(/* code here */) {

    /* code here */

};

getAverageGoals();


/// STRETCH 🥅 //

/* Use the space below to work on any stretch goals of your chosing as listed in the README file. */