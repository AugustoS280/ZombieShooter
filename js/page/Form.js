class Form{
    constructor(t){
        this.inpNome = createInput("").attribute("placeholder","Digite Seu nome")
        this.inpPass = createInput("").attribute("placeholder","Digite Sua Senha")
        this.but
        this.oi = createElement("H2")
        this.NomeChecker = true
        this.tipo = t
        this.aviso = createElement("H3")
        this.back = createButton("voltar")
    }

    setTudo(){
        this.inpNome.position(width/2 - 200, height/2 -160)
        this.inpNome.class("customMediumInput")

        this.inpPass.position(width/2 - 200, height/2 -80)
        this.inpPass.class("customMediumInput")

        if(this.tipo == 1){
            this.but = createButton("Criar")
            this.but.position(width/2 - 90, height/2+40)
            this.but.class("custom_S_size_Button")
        }else{
            this.but = createButton("Entrar")
            this.but.position(width/2 - 90, height/2+40)
            this.but.class("custom_S_size_Button")
        }

        this.back.position(20, 20)
        this.back.class("custom_S_size_Button")

        this.aviso.position(width/2 - 200, height/2+120)
        this.aviso.class("aviso")

        this.oi.position(width / 2 - 100, height / 2 - 100)
        this.oi.class("greeting")
    }

    esconder(){
        this.inpNome.hide()
        this.inpPass.hide()
        this.but.hide()
        this.back.hide()
    }

    buttonClick(){
        this.but.mousePressed(()=>{


            if(this.tipo == 1){
                if(allUsers !== undefined){
                    for(var nmr in allUsers){
                        var n = allUsers[nmr].name
                        if(this.inpNome.value()==n){
                            this.NomeChecker = false
                        }
                    }
    
                }else{

                }
                if(((this.inpNome.value() && this.inpPass.value())!=="")&& this.NomeChecker){
                    this.esconder()
                    //var apresentaçao = "Bem vindo "+this.inpNome.value()
                    /*var apresentaçao = `
                    Bem vindo ${this.inpNome.value()}
                    </br>conectando...`;
                    this.oi.html(apresentaçao)*/
                    userCount += 1
                    usuario.name = this.inpNome.value()
                    usuario.pass = this.inpPass.value()
                    usuario.index = userCount
                    usuario.Coins = 0
                    usuario.MaxStreak = 0
                    usuario.MaxScore =0
                    usuario.SGHave = false
                    usuario.allTimeMaxStreak = 0


                    usuario.addU()
                    usuario.updCount(userCount)
                    gamemode = "HomePage"
                }else if(((this.inpNome.value() && this.inpPass.value())!=="")&& !this.NomeChecker){
                    this.aviso.html("Esse nome já esta em uso")
                    setTimeout(() => {
                        this.aviso.html("")
                    }, 3000);
                }
                
            }else if(this.tipo == 2){
                if(allUsers !== undefined){
                    for(var m in allUsers){
                        var no = allUsers[m].name
                        var po = allUsers[m].password
                        if(this.NomeChecker){
                            if((this.inpNome.value() == no)&&(this.inpPass.value() == po)){
                                usuario = allUsers[m]
                                carteira = usuario.Coins
                                this.NomeChecker = false 
                            }
                        }
                        
                    }
                    
                }
                
                if(!this.NomeChecker){
                    this.esconder()
                    /*var apresentaçao = `
                    Bem vindo ${usuario.name}
                    </br>conectando...`;
                    usuario.index = allUsers[m].index
                    usuario.name = allUsers[m].name
                    usuario.pass = allUsers[m].pass*/
                    console.log(usuario)
                    //this.oi.html(apresentaçao)
                    /*usuario.name = nR
                    usuario.pass = pR
                    usuario.index = indR*/
                    gamemode = "HomePage"
                }
                }
                

            


            menuSom.play()
            menuSom.setVolume(volume)
            //this.NomeChecker = true
        })
        this.back.mousePressed(()=>{
            enter.voltar()
            enter.State = 1
            this.esconder()
            menuSom.play()
            menuSom.setVolume(volume)
        })
    }

}