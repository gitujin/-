async function dummy(){
    try{
        const res = await axios({
            method: "get",
            url: "https://jsonplaceholder.typicode.com/todos/1",
            headers: {}, 
            data: {},
        });

        console.log(res);
    }
    catch(err){
        console.error(err);
    }
}

dummy();