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
            newUserInfo : {
                Name : "" ,
                username : "" ,
                email : "" ,
            } ,
            userIdToEdit : null ,

            getUsers() {

                this.isLoaded = true;
                axios.get("https://jsonplaceholder.typicode.com/users").then((res) => {
                    this.users = res.data
                    this.mainUsers = res.data;
                    this.pagination()
                    console.log(res);
                    
                }).finally(() =>{
                    this.isLoaded = false;

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

            } ,
            handlenewUserInfo() {
                this.isLoaded = true;
                axios.post("https://jsonplaceholder.typicode.com/users" , this.newUserInfo).then((res) => {
                    if (res.status === 201) {
                        this.mainUsers.push(res.data);
                        this.showAddModal = false;
                        this.handleResetForm();
                        this.pagination();
                        M.toast({html: 'کاربر با موفقیست افزوده شد', classes: 'rounded  light-green accent-3'});

                    }
                }).finally(() =>{
                    this.isLoaded = false;

                })
                

            } ,
            handleResetForm() {
                this.newUserInfo = {
                    Name : '' ,
                    username : '' ,
                    email : ''
                }

            } ,
            handleDeleteUser(userid) {    
            var toastHTML = '<span>آیا از حذف کاربر اطمینان دارید؟ ('+userid+')</span><button class="btn-flat toast-action" x-on:click="handleConfirmDelete('+userid+')">بله</button>';
            M.toast({html: toastHTML , classes: ' rounded red darken-1'});
        
            } ,
            handleConfirmDelete(userid) {
                this.isLoaded = true;
                axios.delete("https://jsonplaceholder.typicode.com/users/"+userid).then((res) => {
                    if (res.status === 200) {
                        this.mainUsers = this.mainUsers.filter(user => user.id != userid);
                        this.users = this.users.filter(user => user.id !=userid);
                        this.pagination();
                        M.toast({html: 'کاربر با موفقیست حذف شد', classes: 'rounded  light-green accent-3'});

                    }
                }).finally(() =>{
                    this.isLoaded = false;

                })

            } ,
            handleEditUser(user) {
                axios.get("https://jsonplaceholder.typicode.com/users/"+user.id).then(res => {

                    if (res.status = 200) {
                        this.newUserInfo = {
                        Name : user.name ,
                        username : user.username ,
                        email : user.email
                }
                this.userIdToEdit = res.data.id;
            }

            })
                
            this.showAddModal = true;

            } ,
            handleConfirmEditUser() {
                this.isLoaded = true;
                axios.put("https://jsonplaceholder.typicode.com/users/"+user.id , this.newUserInfo).then((res) => {
                    if (res.status === 200) {
                        const userIndex = this.mainUsers.findIndex(user => user.id == this.userIdToEdit);
                        this.mainUsers[userIndex] = res.data;
                        this.showAddModal = false;
                        this.handleResetForm();
                        this.pagination();
                        M.toast({html: 'کاربر با موفقیست افزوده شد', classes: 'rounded  light-green accent-3'});

                    }
                }).finally(() =>{
                    this.isLoaded = false;

                })

            }
            
       
        }) 

    )
    
})