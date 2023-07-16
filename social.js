// Implement the SocialNetwork class here
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
   * follow()
   *
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

  /**
   *
   * @returns Set of follows
   */
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
   * Recommends follows based on follows of specified user's follows
   * @param {*} degrees - distance algorithm will search for recommended follows
   * @returns array of recommended follows
   */
  getRecommendedFollows(userID, degrees) {
    let recommendedFollows = new Set();
    let prevDegFollows = this.getFollows(userID); // Set
    let currDegFollows = new Set();
    console.log(prevDegFollows);

    let degree = 1;
    while (degree <= degrees) {
      for (const el in prevDegFollows) {
        let followOfFollows = this.getFollows(prevDegFollows[el]);

        for (const el2 in followsOfFollows) {
          let follow = followsOfFollows[el2];
          recommendedFollows.add(follow);
          currDegFollows.add(follow);
        }
      }

      prevDegFollows = currDegFollows;
      console.log('PREV DEG FOLLOWS', prevDegFollows);
      degree++;
    }


    return Array.from(recommendedFollows);
  }
}

module.exports = SocialNetwork;
