class Loja{
    constructor(){
        this.coinsTxt = createElement("h2")
        this.lojaTxt = createElement("h2") 
        this.multiShotTxt = createElement("h2")
        this.multiShotB = createButton("Aprender")
        this.multiShotPriceTxt = createElement("h2")
        this.voltar = createButton("voltar")
        this.SGimgL = loadImage("Assets/unnamed.png")
        this.SGimg
        this.SGHTxt = createElement("h2")
        this.State = 1
        this.MTcaro = createElement("h2")
    }

    esconder(){
        this.SGimg.visible = false
        this.coinsTxt.hide()
        this.lojaTxt.hide()
        this.multiShotTxt.hide()
        this.multiShotB.hide()
        this.multiShotPriceTxt.hide()
        this.voltar.hide()
        this.MTcaro.html("")
        this.MTcaro.hide()
    }


    mostrar(){
        if(homepg.State == 2){
            this.SGimg.visible = true
            this.coinsTxt.show()
            this.lojaTxt.show()
            this.multiShotTxt.show()
            this.multiShotB.show()
            this.multiShotPriceTxt.show()
            this.voltar.show()
            this.MTcaro.show()
            if(usuario.Coins == undefined){
                usuario.Coins = 0
            }
            this.coinsTxt.html(carteira+" Moedas")
            console.log(usuario.Coins)
        }
    }

    setAll(){
        this.coinsTxt.class("greeting")
        this.coinsTxt.position(width-200,0)
        

        this.lojaTxt.class("nome")
        this.lojaTxt.position(width/2-600, height/2 - 600)
        this.lojaTxt.html("Bem vindo à Loja!")

        this.multiShotTxt.class("greeting")
        this.multiShotTxt.position(width/2-100, height/2 +100)
        this.multiShotTxt.html("Se você aprender esse upgrade<br/>vocêvai atirar x20,porém seu<br/>dano é reduzido")

        this.MTcaro.class("caro")
        this.MTcaro.position(width/2-80, height/2-200)
        
        this.multiShotB.class("custom_G_size_Button")
        this.multiShotB.position(width/2-80, height/2-50)

        this.multiShotPriceTxt.class("greeting")
        this.multiShotPriceTxt.position(width/2-400, height/2+200)
        this.multiShotPriceTxt.html("999 moedas")

        this.voltar.class("custom_S_size_Button")
        this.voltar.position(20, 20)

        this.SGimg = createSprite(width/2-330, height/2+80)
        this.SGimg.addImage(this.SGimgL)
        this.SGimg.scale = 0.8
    }

    buttonClick(){
        if(usuario.SGHave){
            this.multiShotB.hide()
            this.multiShotB = undefined
            this.multiShotB = createButton("Você Já Aprendeu")
            this.multiShotB.class("custom_G_size_Button_Used")
            this.multiShotB.position(width/2-80, height/2-50)    
        }else{
            if(!usuario.SGHave){
            this.multiShotB.hide()
            this.multiShotB = undefined
            this.multiShotB = createButton("Aprender")
            this.multiShotB.class("custom_G_size_Button")
            this.multiShotB.position(width/2-80, height/2-50)    
            }
        }
        
        this.voltar.mouseClicked(()=>{
            this.esconder()
            homepg.State = 1
            menuSom.play()
            menuSom.setVolume(volume)
        })
        this.multiShotB.mouseClicked(()=>{
            this.DB()
            menuSom.play()
            menuSom.setVolume(volume)
            //console.log(this.State)
        })
        //carteira = usuario.Coins
        
        //console.log(usuario.Coins)
    }

    comprou(){
        this.multiShotB.hide()
        this.multiShotB = undefined
        this.multiShotB = createButton("Aprendido")
        this.multiShotB.class("custom_G_size_Button_Used")
        this.multiShotB.position(width/2-80, height/2-50)
    }

    DB(){

        //console.log("foi")
        if(usuario.SGHave == true){
            console.log("SGhave = true")
            this.multiShotB.hide()
            this.multiShotB = undefined
            this.multiShotB = createButton("Você Já Possui")
            this.multiShotB.class("custom_G_size_Button_Used")
            this.multiShotB.position(width/2-80, height/2-50)
        }else{
            if(usuario.SGHave == false){
                //console.log("SGhave = false e com dinheiro")

                if(usuario.Coins >=999){
                    
                    usuario.Coins -= 999
                    //carteira = usuario.Coins
                    
                    database.ref("Users/User" + usuario.index).update({
                        Coins: usuario.Coins,
                        SGHave:true
                    })
                    this.MTcaro.class("barato")
                    this.MTcaro.html('comprou')
                    this.comprou()
                    usuario.SGHave = true
                    console.log(usuario.Coins)
                    this.coinsTxt.html(usuario.Coins+" Moedas")
                }else{
                    //console.log("SGhave = true e sem dinehiro")
                    this.MTcaro.html("muito caro")
                }

            }else{
                if(usuario.name == undefined){
                    if(usuario.Coins>=999){
                        usuario.Coins -=999
                    }else{
                        //console.log("SGhave = true e sem dinehiro")
                        this.MTcaro.html("muito caro")
                    }
                }
            }
        }
    }
}