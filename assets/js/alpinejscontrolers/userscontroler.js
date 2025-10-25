    document.addEventListener('alpine:init', () => {
    Alpine.data('usersData', () => ({
            users : [] ,
            mainUsers : [] ,
            pageUser : [] ,
            showAddModal : false , //show add list user
            isLoaded : false , // show preloder
            curentPage : 1 ,
            itemCount : 4 ,
            pageCount : 3 ,
            searchChar : "" ,

            getUsers() {

                this.isLoaded = true;
                axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
                    this.users = res.data
                    this.mainUsers = res.data;
                    this.pagination()
                    this.isLoaded = false;
                    console.log(res);
                    
                })
            } ,
                // number of users in curentpage
            pagination(){  

                this.pageCount = Math.ceil(this.users.length / this.itemCount) //10 / 4 = 3
                let start = (this.curentPage * this.itemCount) - this.itemCount; //0
                let end = (this.curentPage * this.itemCount); // 4
                this.pageUser = this.users.slice(start , end);
                console.log(this.pageUser);
                

            } ,
            nextPage() {
                this.curentPage++
                if (this.curentPage > this.pageCount) this.curentPage = this.pageCount

                this.pagination();
            } ,
            prevPage() {
                this.curentPage--
                if (this.curentPage < 1) this.curentPage = 1
                    
                this.pagination();
            } ,
            handleChangeItemsCount(value) {
                this.curentPage = 1;
                if( value < 1 ) this.itemCount = 1;
                if(value > this.users.length ) this.itemCount =this.users.length

            } ,
            handleSearch(e) {
                
                setTimeout(
                this.users = this.mainUsers.filter(user => user.name.includes(e.value) || 
                 user.username.includes(e.value) || 
                 user.email.includes(e.value)) , 100)
                 this.curentPage = 1;
                 this.pagination();

            }
            
       
        }) 

    )
    
})