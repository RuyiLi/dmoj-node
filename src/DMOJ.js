const snekfetch = require('snekfetch');
const Problem = require('./Problem');
const Contest = require('./Contest');
const User = require('./User');
const base = 'https://dmoj.ca/api';

class DMOJ{
    //static is messed up for some reason dont use it
    async _request(route, method = 'get'){
        try{
            const body = await snekfetch[method](base + route);
            return JSON.parse(body.text);
        }catch(err){
            throw err;
        }
    }

    async getProblems(){
        const problems = await this._request('/problem/list');
        
        const m = new Map();

        for(let [code, problem] of Object.entries(problems)){
            problem['code'] = code;
            const p = new Problem(problem);
            m.set(code, p);
        }

        this.problems = m;
        return m;
    }

    async getContests(){
        const contests = await this._request('/contest/list');
        
        const m = new Map();

        for(let [code, contest] of Object.entries(contests)){
            contest['code'] = code;
            const c = new Contest(contest);
            m.set(code, c);
        }

        this.contests = m;
        return m;
    }

    async getUsers(){
        const users = await this._request('/user/list');
        
        const m = new Map();

        for(let [name, user] of Object.entries(users)){
            user['name'] = name;
            const u = new User(user);
            m.set(name, u);
        }

        this.users = m;
        return m;
    }

    async getProblem(code){
        if(!code) throw new Error('You must specify a problem code.')
        if(this.problems && this.problems.has(code)) return this.problems.get(code);
        try{
            const problems = await this._request('/problem/list');
            for(let [k, p] of Object.entries(problems)){
                if(k === code){
                    p['code'] = k;
                    return new Problem(p);
                }
            }
            return null;
        }catch(err){
            throw err;
        }
    }

    async getContest(code){
        if(!code) throw new Error('You must specify a contest code.')
        if(this.contests && this.contests.has(code)) return this.contests.get(code);
        try{
            const contests = await this._request('/contest/list');
            for(let [k, c] of Object.entries(contests)){
                if(k === code){
                    c['code'] = k;
                    return new Contest(c);
                }
            }
            return null;
        }catch(err){
            throw err;
        }
    }

    async getUser(name){
        if(!name) throw new Error('You must specify a username.')
        if(this.users && this.users.has(name)) return this.users.get(name);
        try{
            const users = await this._request('/user/list');
            for(let [k, u] of Object.entries(problems)){
                if(k === name){
                    u['name'] = k;
                    return new User(u);
                }
            }
            return null;
        }catch(err){
            throw err;
        }
    }
}

module.exports = DMOJ;