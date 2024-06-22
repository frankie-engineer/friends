# 👋🏽 Friends
A `SocialNetwork` class written in JavaScript to keep track of connections within a social network. 

The class uses an adjacency list, a data structure for efficiently storing graph data in which each node in the graph is associated with a list of all of the nodes it is adjacent to.

## Functions 
- `getRecommendedFollows` - does a Bread-First Search to recommend followers up to a certain number of `degrees`
   for example:
    - degrees = 1 -> Users your follows also follow
    - degrees = 2 -> Users your follows follows also follow
    - degrees = 3 -> Users your follows follows follows also follow

## Running Locally 
- `npm install`
- `npm test` to run the test