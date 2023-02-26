class Enter{
    constructor(){
        this.ButLog = createButton("Login here")
        this.ButSign = createButton("Signup here")
        this.ButOff = createButton("continuar Offline")
        this.State = 1

        this.butSair = createButton("Sair?")
        this.volta = createButton("voltar")
        this.jáFoi = createElement("h2")
    }



    setAll(){
        this.ButLog.class("custom_M_size_Button")
        this.ButSign.class("custom_M_size_Button")
        this.ButOff.class("custom_M_size_Button")
        this.ButLog.position(width/2-330,height/2-80)
        this.ButSign.position(width/2+80,height/2-80)
        this.ButOff.position(width/2-125, height/2)



        this.jáFoi.class("greeting")
        this.jáFoi.position(width/2-200,height/2-50)

        this.butSair.class("custom_M_size_Button")
        this.butSair.position(width/2-125,height/2+300)

        this.volta.class("custom_S_size_Button")
        this.volta.position(20, 20)
    }

    getstart(){
        /*form = new Form()
        form.setPos()
        form.setStyle()*/

        usuario = new User()
        usuario.count()

    }



    funciona(){
        if(usuario.name == undefined){
            this.esconder2()
            console.log(this.State)
            this.play()
            this.setAll()
            this.voltar()
        }else{
            
            this.voltar2()
            this.esconder()
            this.voltarBotao()
            this.jáFoi.html("você já está conectado")
        }
    }

    voltar(){
        if(this.State == 1){
            this.ButSign.show()
            this.ButLog.show()
            this.ButOff.show()
        }else{
            this.esconder()
        }
    }

    esconder(){
        this.ButSign.hide()
        this.ButLog.hide()
        this.ButOff.hide()
    }
    esconder2(){
        this.volta.hide()
        this.butSair.hide()
        this.jáFoi.hide()
    }
    hideAll(){
        this.ButSign.hide()
        this.ButLog.hide()
        this.ButOff.hide()
        this.volta.hide()
        this.butSair.hide()
        this.jáFoi.hide()
    }

    voltar2(){
        this.volta.show()
        this.butSair.show()
        this.jáFoi.show()
    }

    voltarBotao(){
        this.volta.mouseClicked(()=>{
            this.esconder()
            this.esconder2()
            gamemode = "HomePage"
            homepg.State = 1
            menuSom.play()
            menuSom.setVolume(volume)
        })

        this.butSair.mouseClicked(()=>{
            this.State  =1
            usuario = undefined
            this.getstart()
            menuSom.play()
            menuSom.setVolume(volume)
        })
    }

    play(){
        
        User.getPI()

        /*var l = Object.values(allUsers)
        console.log(l)*/
        
        if(form !== undefined){
            form.buttonClick()
        }

        

        this.ButSign.mousePressed(()=>{
            form = new Form(1)
            form.setTudo()
            this.esconder()
            this.State = 2
            menuSom.play()
            menuSom.setVolume(volume)
        })

        this.ButLog.mousePressed(()=>{
            form = new Form(2)
            form.setTudo()
            this.esconder()
            this.State = 2
            menuSom.play()
            menuSom.setVolume(volume)
        })

        this.ButOff.mousePressed(()=>{
            gamemode = "HomePage"
            this.esconder()
            menuSom.play()
            menuSom.setVolume(volume)
        })


    }
}