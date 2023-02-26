class Creditos{
    constructor(){
        this.Augusto = createElement("h2")
        this.Txt = createElement("h2")
        this.voltar = createButton("voltar")
    }

    esconder(){
        this.Augusto.hide()
        this.Txt.hide()
        this.voltar.hide()
    }

    aparecer(){
        if(homepg.State == 3){
            this.Augusto.show()
            this.Txt.show()
            this.voltar.show()
        }
    }

    setAll(){
        this.Augusto.class("nome")
        this.Augusto.position(width/2-550, height/2 - 300)
        this.Augusto.html("Augusto Silveira")

        this.voltar.class("custom_S_size_Button")
        this.voltar.position(20, 20)

        this.Txt.class("greeting")
        this.Txt.position(width/2-400, height/2)
        this.Txt.html("Esse jogo foi feito por Augusto Silveira,<br/>usando a biblioteca p5.js, e o Google Firebase")
    }
    buttonClick(){
        this.voltar.mouseClicked(()=>{
            this.esconder()
            homepg.State = 1
            menuSom.play()
            menuSom.setVolume(volume)
        })
    }
}