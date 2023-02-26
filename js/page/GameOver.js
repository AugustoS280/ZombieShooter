class Acabou{
    constructor(){
        this.againBut = createButton("Tentar Novamente")
        this.voltarBut = createButton("Menu")
        this.scoreTxt = createElement("h2")
        this.GOTxt = createElement("h2")
        this.maxScoreTxt = createElement("h2")
        this.maxStreakTxt = createElement("h2")
        this.offlineMaxScore = 0 
        this.offlineMaxStreak = 0
        this.steakTxt = createElement("h2")
    }

    setAll(){
        this.voltarBut.class("custom_S_size_Button")
        this.voltarBut.position(20, 20)

        this.againBut.class("custom_M_size_Button")
        this.againBut.position(width/2-135, height-300)

        this.GOTxt.class("GO")
        this.GOTxt.position(540, 50)
        this.GOTxt.html("GAME OVER")

        /*c tá loko fiquei um tempão tentando converder tp para px
        mas como cada letra e número tem seu comprimento e tem aquela fonte
        coloque assim mesmo não sendo exato*/
        let ScoreW= score.toString()   //num para string
        let ScoreTxtWval = textWidth(ScoreW)/12*50  //passa o comprimento dele em tamanho 12 para tamanho 50
        let ScoreTxtW = textWidth("Score: ")/12*50  //passa o comprimento dele em tamanho 12 para tamanho 50
        this.scoreTxt.position(width/2-((ScoreTxtW+ScoreTxtWval)/2),height/2-140)  //soma os dois e pega a metade para centralizar
        this.scoreTxt.class("fim")
        
        

        this.maxScoreTxt.class("fim")
        //this.maxScoreTxt.position(width/2-(287.244/2),height/2+120)
        this.steakTxt.class("fim")

        this.maxStreakTxt.class("fim")

        
        //this.maxStreakTxt.position(width/2- (147.401/2),height/2+180)
    }

    esconder(){
        this.againBut.hide()
        this.voltarBut.hide()
        this.scoreTxt.hide()
        this.GOTxt.hide()
        this.maxScoreTxt.hide()
        this.maxStreakTxt.hide()
        this.steakTxt.hide()
    }

    aparecer(){
        this.againBut.show()
        this.voltarBut.show()
        this.scoreTxt.show()
        this.GOTxt.show()
        this.maxScoreTxt.show()
        this.maxStreakTxt.show()
        this.steakTxt.show()
    }

    funcionando(){
        this.buttomClick()
        this.write()
    }
    write(){

        console.log(usuario.MaxScore)
        database.ref("Users/User"+usuario.index+"/MaxScores").on("value", data =>{
            console.log(data.val())
            usuario.MaxScore = data.val()
        })
        console.log(usuario.MaxScore)

        if(usuario.allTimeMaxStreak <maxStreak){
            usuario.allTimeMaxStreak = maxStreak
            database.ref("Users/User"+usuario.index).update({
                allTimeMaxStreak: maxStreak    
            })
        }
 


        let StreakW= maxStreak.toString()
        let StreakTxtWval = textWidth(StreakW)/12*50
        let StreakTxtW = textWidth("MaxStreak: ")/12*50
        this.steakTxt.position(width/2-((StreakTxtWval+StreakTxtW)/2),height/2-20)
        this.steakTxt.html("MaxStreak: "+maxStreak)
        this.steakTxt.class("fim")

        this.scoreTxt.html("Score: "+score)
        if(!usuario.name){
            if(this.offlineMaxScore<maxscore){
                this.offlineMaxScore = maxscore
            }
            if(this.offlineMaxStreak <maxStreak){
                this.offlineMaxStreak = maxStreak
            }

            let MXStreakW= this.offlineMaxStreak.toString()
            let MXStreakTxtWval = textWidth(MXStreakW)/12*50
            let MXStreakTxtW = textWidth("Maior MaxStreak seu: ")/12*50
            this.maxStreakTxt.position(width/2-((MXStreakTxtWval+MXStreakTxtW)/2),height/2+40)
            this.maxStreakTxt.html("Maior MaxStreak seu: "+this.offlineMaxStreak)

            let MXScoreW= this.offlineMaxScore.toString()
            let MXScoreTxtWval = textWidth(MXScoreW)/12*50
            let MXScoreTxtW = textWidth("HighScore: ")/12*50
            this.maxScoreTxt.html("HighScore: "+this.offlineMaxScore)
            this.maxScoreTxt.position(width/2-((MXScoreTxtW+MXScoreTxtWval)/2),height/2-80)
        }else{
            let j = usuario.allTimeMaxStreak
            let MXStreakW= j.toString()
            let MXStreakTxtWval = textWidth(MXStreakW)/12*50
            let MXStreakTxtW = textWidth("Maior MaxStreak seu: ")/12*50
            this.maxStreakTxt.position(width/2-((MXStreakTxtWval+MXStreakTxtW)/2),height/2+40)
            this.maxStreakTxt.html("Maior MaxStreak seu: "+usuario.allTimeMaxStreak)

            let pj = usuario.MaxScore
            let MXScoreW= pj.toString()
            let MXScoreTxtWval = textWidth(MXScoreW)/12*50
            let MXScoreTxtW = textWidth("HighScore: ")/12*50
            this.maxScoreTxt.html("HighScore: "+usuario.MaxScore)
            usuario.MaxStreaks = 0
            this.maxScoreTxt.position(width/2-((MXScoreTxtW+MXScoreTxtWval)/2),height/2-80)
            if(usuario.name !== undefined){
                database.ref("Users/User"+usuario.index).update({
                    MaxStreaks: 0
                })
            }
        }
        
    }
    buttomClick(){
        this.againBut.mouseClicked(()=>{
            Player.x = width/2
            Player.y = height/2
            score = 0
            streak = 0
            vidas = 3
            maxStreak = 0
            desZumbificados = 0
            if(usuario.name !== undefined){
                usuario.MaxStreaks = 0
                database.ref("Users/User"+usuario.index).update({
                    MaxStreaks: 0
                })
            }
            this.esconder()
            menuSom.play()
            menuSom.setVolume(volume)
            gamemode = "play"
        })
        this.voltarBut.mouseClicked(()=>{
            this.esconder()
            homepg.State = 1
            gamemode="HomePage"
            menuSom.play()
            menuSom.setVolume(volume)
        })
    }
}