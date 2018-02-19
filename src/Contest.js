const { get } = require('snekfetch');
const Problem = require('./Problem');

class Problem{
    constructor(data){
        this.code = data.code;
        this.startTime = data.start_time;
        this.endTime = data.end_time;
        this.timeLimit = data.time_limit;
        this.labels = Object.values(data.labels);
        this.name = data.name;
        this.url = `https://dmoj.ca/problem/${this.code}`;
    }

    async fetchInfo(){
        const d = JSON.parse((await get(`https://dmoj.ca/api/contest/info/${this.code}`)).text);
        this.tags = d.tags;
        this.problems = d.problems;
        this.rankings = Object.values(d.rankings);
    }
}

module.exports = Problem;