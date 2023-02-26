class Configurações{
    constructor(){
        this.ButGun1 = createButton("Select")

        this.Gun1Txt = createElement("h2")
        this.ImgGun1L = loadImage("./Assets/Gun1.png")
        this.ImgGun1

        //this.ArmaAtual = createElement("h2")

        this.ButGun2 = createButton("Select")

        this.Gun2Txt = createElement("h2")
        this.ImgGun2L = loadImage("./Assets/Gun2.png")
        this.ImgGun2

        this.nTemSG = createElement("h2")


        this.QuantMoedas = createElement("h2")


        this.voltar= createButton("Voltar")
    }

    setAll(){
        this.voltar.class("custom_S_size_Button")
        this.voltar.position(20, 20)

        this.ImgGun1 = createSprite(width/2-250,height/2-100)
        this.ImgGun2 = createSprite(width/2+350,height/2-130)
        
        this.ButGun1.class("custom_M_size_Button")
        this.ButGun2.class("custom_M_size_Button")

        this.ButGun1.position(width/2-320,height/2)
        this.ButGun2.position(width/2+230,height/2-10)

        this.ImgGun1.addImage("normal",this.ImgGun1L)
        this.ImgGun2.addImage("normal",this.ImgGun2L)



        this.Gun1Txt.class("arma")
        this.Gun1Txt.html("pistola</br>tiro único")
        this.Gun1Txt.position(width/2-310,height/2+60)

        this.Gun2Txt.class("arma")
        this.Gun2Txt.html("ShotGun</br>tiro múltiplo")
        this.Gun2Txt.position(width/2+230,height/2+60)

        this.nTemSG.class("ntem")
        this.nTemSG.position(width/2-200,height/2-100)
        this.nTemSG.html("você ainda não comprou a</br>ShotGun na loja")
        this.nTemSG.hide()

        this.QuantMoedas.class("greeting")
        this.QuantMoedas.position(width-200,0)
        this.QuantMoedas.html(carteira+" moedas")

        /*his.ArmaAtual.class("greeting")
        this.ArmaAtual.position(20,height-120)
        this.ArmaAtual.html("Arma atual: pistola")*/
        

    }

    esconder(){
        this.ImgGun1.visible = false
        this.ImgGun2.visible = false
        this.ButGun1.hide()
        this.ButGun2.hide()
        this.Gun1Txt.hide()
        this.Gun2Txt.hide()
        this.voltar.hide()
        ArmaAtual.hide()
        this.QuantMoedas.hide()
        this.nTemSG.hide()
    }

    aparecer(){
        if(homepg.State == 4){
            this.ImgGun1.visible = true
            this.ImgGun2.visible = true
            this.ButGun1.show()
            this.ButGun2.show()
            this.Gun1Txt.show()
            this.Gun2Txt.show()
            this.voltar.show()
            this.QuantMoedas.show()
            ArmaAtual.show()
        }
    }

    buttonClick(){

        this.ButGun1.mouseClicked(()=>{
            arma = 1
            ArmaAtual.html("Arma atual: pistola")
            menuSom.play()
            menuSom.setVolume(volume)
        })

        this.ButGun2.mouseClicked(()=>{
            if(usuario.SGHave == true){
                arma = 2
                ArmaAtual.html("Arma atual: ShotGun")
                menuSom.play()
                menuSom.setVolume(volume)
            }else{
                this.nTemSG.show()
                setTimeout(() => {
                    this.nTemSG.hide()
                }, 5000);
            }
        })

        this.voltar.mouseClicked(()=>{
            this.esconder()
            homepg.State = 1
            menuSom.play()
            menuSom.setVolume(volume)
        })
    }
}