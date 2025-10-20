    document.addEventListener('alpine:init', () => {
    Alpine.data('usersData', () => ({
            users : [] ,
            isLoaded : false ,
            getUsers() {

                this.isLoaded = true;
                axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
                    this.users = res.data
                    this.isLoaded = false;
                    console.log(res);
                    
                })
            }
            
       
        }) 

    )
    
})