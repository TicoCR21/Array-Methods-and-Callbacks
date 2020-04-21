import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

//console.log( fifaData[ 828 ] );

console.log( "Task 1" );

let fifaFinals = fifaData.filter( game => game[ 'Year' ] == 2014 && game[ 'Stage' ] === "Final" )[ 0 ];
console.log( `2014 World Cup Final:\n
                (a) Home Team: ${ fifaFinals[ 'Home Team Name' ] }\n
                (b) Away Team: ${ fifaFinals[ 'Away Team Name' ] }\n
                (c) Home Team Goals: ${ fifaFinals[ 'Home Team Goals' ] }\n
                (d) Away Team Goals: ${ fifaFinals[ 'Away Team Goals' ] }\n
                (e) 2014 World Cup Winner: ${ fifaFinals[ 'Home Team Name' ] }` );

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */
console.log( "Task 2" );

let getFinals = fifaData => fifaData.filter( game => game[ 'Stage' ] === "Final" ); 
console.log( getFinals( fifaData ) );

/* Task 3: Impliment a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */
console.log( "Task 3" );

let getYears = getFinals => getFinals( fifaData ).map( game => game[ "Year" ] ); 
console.log( getYears( getFinals ) );

/* Task 5: Impliment a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 
console.log( "Task 5" );
let getWinners = getFinals => getFinals( fifaData ).map( game => game[ "Home Team Goals" ] != game[ "Away Team Goals" ] ? ( game[ "Home Team Goals" ] > game[ "Away Team Goals" ] ? game[ "Home Team Name" ] : game[ "Away Team Name" ] ) : game[ "Win conditions" ].split( " " )[ 0 ] );
console.log( getWinners( getFinals ) );

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */
console.log( "Task 6" );

function getWinnersByYear( getWinners, getYears )
{
    let years = getYears( getFinals );
    return getWinners( getFinals ).map( ( team, index ) => `In ${ years[ index ] }, ${ team } won the world cup!` );
}

console.log( getWinnersByYear( getWinners, getYears ) );

/* Task 7: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

console.log( "Task 7" );

function getCountryWins( fifaData, initials ) 
{
    let countryName = "";
    let finals = getFinals( fifaData );
    let winners = getWinners( getFinals );
    
    for( let i = 0; i < finals.length; i++ )
        if( finals[ i ][ 'Home Team Initials' ]  === initials || finals[ i ][ 'Away Team Initials' ]  === initials )
        {
            countryName = ( finals[ i ][ 'Home Team Initials' ]  === initials ? finals[ i ][ 'Home Team Name' ] : finals[ i ][ "Away Team Name" ] );
            break;
        }

    return winners.reduce( ( val, winner ) => winner === countryName ? val + 1 : val, 0 );
};

console.log( getCountryWins( fifaData, "ITA" ) );

/* Task 8: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

console.log( "Task 8" );
function getGoals( fifa_finals ) 
{
    let team_records = {};
    fifa_finals.forEach( function( game, index )
    {
        if( !( game[ "Home Team Name" ] in team_records ) )
            team_records[ game[ "Home Team Name" ] ] = { games : 0, goals : 0 };
        if( !( game[ "Away Team Name" ] in team_records ) )
            team_records[ game[ "Away Team Name" ] ] = { games : 0, goals : 0 };

        team_records[ game[ "Home Team Name" ] ][ 'games' ] += 1;
        team_records[ game[ "Home Team Name" ] ][ 'goals' ] += game[ "Home Team Goals" ];
        team_records[ game[ "Away Team Name" ] ][ 'games' ] += 1;
        team_records[ game[ "Away Team Name" ] ][ 'goals' ] += game[ "Away Team Goals" ];
    } );

    let current_max = { team : "", goals : 0 };

    for( let team_record in team_records )
        if( team_records[ team_record ][ "goals" ] / team_records[ team_record ][ 'games' ] > current_max[ 'goals' ] )
        {
            current_max[ "team" ] = team_record;
            current_max[ "goals" ] = team_records[ team_record ][ "goals" ] / team_records[ team_record ][ 'games' ]; 
        }

    return current_max[ "team" ];
};

console.log( getGoals( getFinals( fifaData ) ) );


/* Task 9: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

console.log( "Task 9" );
function badDefense( fifa_finals ) 
{
    let team_records = {};
    fifa_finals.forEach( function( game, index )
    {
        if( !( game[ "Home Team Name" ] in team_records ) )
            team_records[ game[ "Home Team Name" ] ] = { games : 0, goals : 0 };
        if( !( game[ "Away Team Name" ] in team_records ) )
            team_records[ game[ "Away Team Name" ] ] = { games : 0, goals : 0 };

        team_records[ game[ "Home Team Name" ] ][ 'games' ] += 1;
        team_records[ game[ "Home Team Name" ] ][ 'goals' ] += game[ "Away Team Goals" ];
        team_records[ game[ "Away Team Name" ] ][ 'games' ] += 1;
        team_records[ game[ "Away Team Name" ] ][ 'goals' ] += game[ "Home Team Goals" ];
    } );

    let current_max = { team : "", goals : 0 };

    for( let team_record in team_records )
        if( team_records[ team_record ][ "goals" ] / team_records[ team_record ][ 'games' ] > current_max[ 'goals' ] )
        {
            current_max[ "team" ] = team_record;
            current_max[ "goals" ] = team_records[ team_record ][ "goals" ] / team_records[ team_record ][ 'games' ]; 
        }

    return current_max[ "team" ];
};

console.log( badDefense( getFinals( fifaData ) ) );


/* Task 10: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

console.log( "Task 10" );
let getAverageGoals = fifa_finals => ( { home : fifa_finals.reduce( ( ( total, element ) => total + element[ "Home Team Goals" ] ), 0 ) / fifa_finals.length,
             away : fifa_finals.reduce( ( ( total, element ) => total + element[ "Away Team Goals" ] ), 0 ) / fifa_finals.length } );

console.log( getAverageGoals( getFinals( fifaData ) ) );




console.log( "/************************ Stretch ************************/" );
/// STRETCH 🥅 //

/* Use the space below to work on any stretch goals of your chosing as listed in the README file. */

console.log( "Task 1 - World Cup Appearances" );
function worldCupApp( fifa_records, initials )
{
    let total = fifa_records.reduce( ( total, element ) => ( element[ "Home Team Initials" ] === initials || element[ "Away Team Initials" ] === initials ? total + 1 : total ), 0 );

    console.log( total );
}
worldCupApp( fifaData, "ITA" );

console.log( "Task 2 - I Think My Code is Already Accounting for Ties. If Both Scores are Equal Then I Check 'Win Conditions' " );

console.log( "Task 3 - Total Goals" );
let totalGoals = ( fifa_records, initials ) => fifa_records.map( fifa_record => ( fifa_record[ "Home Team Initials" ] === initials ? fifa_record[ "Home Team Goals" ] : fifa_record[ "Away Team Initials" ] === initials ? fifa_record[ "Away Team Goals" ] : 0 ) ).reduce( ( total, value ) => value + total, 0 );
console.log( totalGoals( fifaData, "ITA" ) );
console.log( "Task 4 - Format H1 Headers" );
function createHeaders( fifa_records )
{
    let country_names = new Set();
    fifa_records.forEach( function( fifa_record )
    {
        country_names.add( fifa_record[ "Home Team Name" ] );
        country_names.add( fifa_record[ "Away Team Name" ] );
    } );

    let countries_div = document.querySelector( '.countries' );

    let x = [ ...country_names ];

    for( let i in x )
    {
        let h1 = document.createElement( "h1" );
        h1.className = "header country_header";
        h1.innerHTML = x[ i ];
        countries_div.appendChild( h1 );
    }
}
createHeaders( fifaData );