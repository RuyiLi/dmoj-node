const { get } = require('snekfetch');

class Problem{
    constructor(data){
        this.code = data.code;
        this.name = data.name;
        this.points = data.points;
        this.partial = data.partial;
        this.group = data.group;
        this.url = `https://dmoj.ca/problem/${this.code}`;
    }

    async fetchInfo(){
        const d = JSON.parse((await get(`https://dmoj.ca/api/problem/info/${this.code}`)).text);
        this.authors = d.authors;
        this.languages = d.languages;
        this.memoryLimit = d.memory_limit;
        this.timeLimit = d.time_limit;
        this.types = d.types;
    }
}

module.exports = Problem;