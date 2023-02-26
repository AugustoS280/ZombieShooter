class HomePage{
    constructor(){
        this.butShop = createButton("Loja")
        this.titleTxt = createElement("h2")
        this.playB = createButton("Play")
        this.settingsB = createButton("Configurações")
        this.Butenter = createButton("Entrar")
        this.creditsB = createButton("Creditos")
        this.State = 1
        this.Creds
        this.setting
        this.nomePlayer = createElement("h2")
    }

    esconder(){
        this.butShop.hide()
        this.playB.hide()
        this.titleTxt.hide()
        this.settingsB.hide()
        this.Butenter.hide()
        this.creditsB.hide()
    }

    aparecer(){
        if(this.State == 1){
            this.butShop.show()
            this.playB.show()
            this.titleTxt.show()
            this.settingsB.show()
            this.Butenter.show()
            this.creditsB.show()
        }else this.esconder()
    }

    setAll(){
        this.butShop.class("custom_S_size_Button")
        this.butShop.position(width/2-210,height/2)

        this.settingsB.class("custom_S_size_Button")
        this.settingsB.position(width/2-10,height/2)


        this.Butenter.class("custom_S_size_Button")
        this.Butenter.position(width/2-210,height/2+60)

        this.creditsB.class("custom_S_size_Button")
        this.creditsB.position(width/2-10,height/2+60)

        this.playB.class("custom_M_size_Button")
        this.playB.position(width/2-135, height/2+140)

        this.nomePlayer.class("usuarioN")
        this.nomePlayer.position(20,height-80)
        this.nomePlayer.html("Usuario: "+usuario.name)

        

        this.titleTxt.class("nome")
        this.titleTxt.position(width/2-490, height/2 - 300)
        this.titleTxt.html("ZumbiShooter")
    }

    buttonClick(){
        this.nomePlayer.html("Usuario: "+usuario.name)
        this.playB.mouseClicked(()=>{
            this.prepJogo()
        })
        this.Butenter.mouseClicked(()=>{
            this.esconder()
            gamemode = "entrando"
            menuSom.play()
            menuSom.setVolume(volume)
        })
        this.butShop.mouseClicked(()=>{
            this.State = 2
            this.lojaFunciona()
            menuSom.play()
            menuSom.setVolume(volume)
        })
        this.creditsB.mouseClicked(()=>{
            this.State = 3
            this.criador()
            menuSom.play()
            menuSom.setVolume(volume)
        })
        this.settingsB.mouseClicked(()=>{
            this.State = 4
            this.configurar()
            menuSom.play()
            menuSom.setVolume(volume)
        })
        //"entrando"
    }

    lojaFunciona(){
        if(lojinha == undefined){
            lojinha = new Loja
            lojinha.setAll()
        }
        lojinha.buttonClick()
        lojinha.mostrar()
        
    }

    prepJogo(){
        Player.x = width/2
        Player.y = height/2
        score = 0
        streak = 0
        vidas = 3
        desZumbificados = 0
        this.esconder()
        gamemode = "play"
        menuSom.play()
        maxStreak = 0
        if(usuario.name !== undefined){
            usuario.MaxStreaks = 0
            database.ref("Users/User"+usuario.index).update({
                MaxStreaks: 0
            })
        }
        menuSom.setVolume(volume)
        if(this.setting !== undefined){
            this.setting.ArmaAtual.show()
        }
    }

    criador(){
        if(this.Creds == undefined){
            this.Creds = new Creditos
            this.Creds.setAll()
        }
        this.Creds.buttonClick()
        this.Creds.aparecer()
    }

    configurar(){
        if(this.setting == undefined){
            this.setting = new Configurações()
            this.setting.setAll()
        }
        this.setting.buttonClick()
        this.setting.aparecer()
    }
}

