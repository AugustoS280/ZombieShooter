class User{
    constructor(){
        this.name
        this.index
        this.pass
        this.Coins
        this.MaxScore
        this.MaxStreak
        this.SGHave
        this.allTimeMaxStreak
    }

    addU(){
        var z = "Users/User" + this.index
        database.ref(z).set({
            name: this.name,
            password: this.pass,
            index: this.index,
            Coins: this.Coins,
            MaxScores: this.MaxScore,
            MaxStreaks: this.MaxStreak,
            SGHave:this.SGHave,
            allTimeMaxStreak: this.allTimeMaxStreak
        })
    }

    count(){
        var UCR = database.ref("UserCount")
        UCR.on("value",data => {
            userCount = data.val()
        })
    }

    updCount(count){
        database.ref("/").update({
            UserCount: count
        })
    }

    up(){
        var z = "Users/User"+ this.index

    }


    
    static getPI() {
        var PIF = database.ref("Users");
        PIF.on("value", data => {
            allUsers = data.val();
        })
    }
}