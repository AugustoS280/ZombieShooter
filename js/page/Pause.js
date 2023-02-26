class Pause{
    constructor(){
        this.Dpause= createButton("play")
        this.Stats
        this.PauseTxt =createElement("h2")
        this.menuBut = createButton("Menu")
        this.volumeTxt = createElement("h2")
        this.volume = createSlider(0,300,100)
        this.val
    }

    esconder(){
        this.PauseTxt.hide()
        this.Dpause.hide()
        this.menuBut.hide()
        this.volume.hide()
        this.volumeTxt.hide()
    }

    aparecer(){
        this.PauseTxt.show()
        this.Dpause.show()
        this.menuBut.show()
        this.volume.show()
        this.volumeTxt.show()
    }

    setC(){
        this.PauseTxt.class("nome")
        this.PauseTxt.position(708.6615,height/2-400)
        this.PauseTxt.html("Pausado")

        this.Dpause.class("custom_M_size_Button")
        this.Dpause.position(846.6145, height/2-100)

        this.volume.size(238.110)
        this.volume.position(840.945, height/2+100)

        this.volumeTxt.class("greeting2")
        this.volumeTxt.position(840.945, height/2)

        this.menuBut.class("custom_S_size_Button")
        this.menuBut.position(20,20)
    }

    buttomclick(){
        this.volumeTxt.html("volume:"+this.volume.value()+"%")
        volume = this.volume.value()/100
        this.menuBut.mouseClicked(()=>{
            console.log("foi")
            restartAll()
            Player.visible = false
            this.esconder()
            score = 0
            streak = 0
            vidas = 3
            desZumbificados = 0
            gamemode = "HomePage"
            maxStreak =0
            homepg.State = 1
            if(usuario.name !== undefined){
                usuario.MaxStreaks = 0
                database.ref("Users/User"+usuario.index).update({
                    MaxStreaks: 0
                })
            }
            menuSom.play()
            menuSom.setVolume(volume)

        })
        this.Dpause.mouseClicked(()=>{
            this.esconder()
            gamemode = "play"
            menuSom.play()
            menuSom.setVolume(volume)
        })
    }

    pararSons(){
        if(correrSom.isPlaying()){
            correrSom.pause()
        }
    }
}