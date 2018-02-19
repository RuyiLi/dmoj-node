const { get } = require('snekfetch');
const Problem = require('./Problem');

class User{
    constructor(data){
        this.displayName = data.display_name;
        this.name = data.name;
        this.rank = data.rank;
        this.points = data.points;
        this.url = `https://dmoj.ca/user/${this.name}`;
    }

    async fetchInfo(){
        const d = JSON.parse((await get(`https://dmoj.ca/api/user/info/${this.name}`)).text);
        this.solved = Object.values(d.solved_problems);
        this.organizations = d.organizations;
    }
}

module.exports = User;