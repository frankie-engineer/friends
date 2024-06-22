class SocialNetwork {
  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  idCount = 1;

  addUser(name) {
    let newUser = { "id": this.idCount, "name": name };
    this.users[newUser.id] = newUser;
    this.follows[newUser.id] = new Set();
    this.idCount++;
    return newUser.id;
  }

  getUser(userID) {
    let userName = this.users[Number(userID)];
    if (!userName) return null;
    else return userName;
  }

  /**
   * sets user1 to follow user2 (& does NOT set user2 to follow user1)
   * @returns true if follow was successful, false otherwise
   */
  follow(userID1, userID2) {
    let user1 = this.getUser(userID1);
    let user2 = this.getUser(userID2);

    if (!user1 || !user2) return false;

    this.follows[userID1].add(userID2);
    return true;
  }

  getFollows(userID) {
    return this.follows[userID];
  }

  getFollowers(userID) {
    let followers = new Set();

    for (const id in this.follows) {
      if (this.follows[id].has(userID)) followers.add(Number(id));
    }

    return followers;
  }

  /**
   * Recommends follows by doing a Breadth-First Search algorithm that has a depth of 'degrees'
   * @param {*} degrees - max number of degrees between user & the recommended follow
   * @returns array of recommended follows
   *
   */
  getRecommendedFollows(userID, degrees) {
    const queue = [[userID]];
    const visited = new Set();
    const friends = [];

    while (queue.length > 0) {
      // remove first element from queue & set it equal to path
      let path = queue.shift();

      // let the current note be the last element in path 
      let currentNode = path[path.length - 1];


      if (!visited.has(currentNode)) {
        visited.add(currentNode);

        /* add all paths except paths to:
         - itself
         - existing follows
         - follows > 'degrees' away
         */
        if (path.length > 2 && path.length <= degrees + 2) friends.push(currentNode);

        // get the followers of all of the current node 
        // add these followers to the queue 
        let follows = this.getFollows(currentNode);
        follows.forEach(follow => queue.push([...path, follow]));
      }
    }
    return friends;
  }
}

module.exports = SocialNetwork;
