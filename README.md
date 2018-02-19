# dmoj-node
A node wrapper for the DMOJ API. https://dmoj.ca

# Example
```js
const dmoj = new (require('dmoj'))();

(async () => {
    /**
     * Fetches an uncached problem
     */
    console.log((await dmoj.getProblem('cco15p1')).name); //CCO '15 P1 - Hungry Fox

    /** 
     * Creates a cache of problems
     */
    const problems = await dmoj.getProblems();

    /**
     * dmoj.getProblem is essentially just a promisified version of problems.get
     * The only difference is that dmoj.getProblem can fetch uncached problems,
     * while dmoj.getProblem can be called without doing dmoj.getProblems first.
     */
    console.log((await dmoj.getProblem('cco15p1')).name); //CCO '15 P1 - Hungry Fox
    console.log(problems.get('cco15p1').name);            //CCO '15 P1 - Hungry Fox

    const hw = problems.get('helloworld');
    console.log(hw);

    /**
     * Fetches the basic information of the problem such as the memory/time limit
     */

    await hw.fetchInfo();
    console.log(`Time Limit: ${hw.timeLimit}; Memory Limit: ${hw.memoryLimit}`); //Time Limit: 2; Memory Limit: 65536

    console.log(await dmoj.getProblem('asdf')); //null
    
    /**
     * Fetches an uncached contest
     */
    console.log((await dmoj.getContest('dmopc14c1')).name); //DMOPC '14 October Contest

    /** 
     * Creates a cache of contests
     */
    const contests = await dmoj.getContests();
    console.log((await dmoj.getContest('dmopc14c1')).name); //DMOPC '14 October Contest
    console.log(contests.get('dmopc14c1').name);            //DMOPC '14 October Contest

    //i don't feel like explaining anymore
    console.log(contests.get('christmastree').name); //Christmas Trees - Christmas Special
    console.log(contests.get('dmopc14c1').labels); //['dmopc']
    console.log(contests.get('asdf')); //null

    const dmopc = contests.get('dmopc16c1');
    console.log(dmopc);

    await dmopc.fetchInfo();
    console.log(dmopc.problems[0]);


    const users = await dmoj.getUsers();
    const me = users.get('echofox');
    console.log(me);
    await me.fetchInfo();
    console.log(me.solved[1]);

})()

process.on('unhandledRejection', err => console.error(err));```