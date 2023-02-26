class Moeda{


    constructor(x,y,w,h){
        this.x = x
        this.y = y 
        this.width = w
        this.height = h
        this.body = createSprite(x,y,w,h)
        this.vel = 0
        this.grana = 0
        this.marcador = false
        this.timer = 30
        this.granaTxt = createElement("h2")
    }


    dindin(){
        if(gamemode == "play"){
            if(this.body.collide(Player)){
               coinSom.play()
               score += 150
               this.body.remove()
               //moedas.splice(i,1)
               let numero = Math.round(random(1,10))
               if(numero <=6){
                    this.grana = Math.round(random(1,5))
                    carteira += this.grana
                    /*let R = "Users/User" + usuario.index
                    database.ref(R).update({
                      Coins: usuario.coins + this.grana
                    })*/
               }else{
                    if(numero>6 && numero <=9){
                        this.grana = Math.round(random(6,10))
                        carteira += this.grana
                        /*let R = "Users/User" + usuario.index
                        database.ref(R).update({
                          Coins: usuario.coins + this.grana
                        })*/
                    }else{
                        if(numero == 10){
                            this.grana = Math.round(random(10,15))
                            carteira +=  this.grana
                            /*let R = "Users/User" + usuario.index
                            database.ref(R).update({
                              Coins: usuario.coins + this.grana
                            })*/
                        }
                    }   
               }
               this.marcador = true
               ordem_popUps.push(this.grana)
            }
            if(usuario.name !== undefined){
                usuario.Coins = carteira
                let R = "Users/User" + usuario.index
                database.ref(R).update({
                    Coins: usuario.Coins
                })
            }
        }
    }
    show(i){
        //let tamanho_do_texto = 24
        if(gamemode == "play"){
            if(this.marcador && this.timer>0 && ordem_popUps[i] == this.grana){
                this.timer -= 1
                if(moedas.length ==1){
                    
                    this.granaTxt.class("grana")
                    this.granaTxt.position(100,260)
                    this.granaTxt.html("+ "+this.grana+" moedas")
    
                    setTimeout(() => {
                        this.granaTxt.html("")
                    }, 1000);
                    /*push()
                    textSize(tamanho_do_texto)
                    text("+ "+this.grana+" moedas", 100, 260)
                    pop()*/
                    //moedas.splice(i,1)
                }else{
                    if(moedas.length>1 && i !== 0){
                        this.granaTxt.class("grana")
                        this.granaTxt.position(100,260+ i*40)
                        this.granaTxt.html("+ "+this.grana+" moedas")
                        setTimeout(() => {
                            this.granaTxt.hide()
                        }, 1000);
                        /*push()
                        textSize(tamanho_do_texto)
                        text("+ "+this.grana+" moedas", 100, 260+ i*40)
                        pop()*/
                        //moedas.splice(i,1)
                    }else{
                        if(moedas.length>1 && i == 0){
                            this.granaTxt.class("grana")
                            this.granaTxt.position(100,260)
                            this.granaTxt.html("+ "+this.grana+" moedas")
                            setTimeout(() => {
                                this.granaTxt.hide()
                            }, 1000);
                            /*push()
                            textSize(tamanho_do_texto)
                            text("+ "+this.grana+" moedas", 100, 260)
                            pop()*/
                            //moedas.splice(i,1)
                        }
                    }
                }
            }
            if(this.timer <= 0){
                moedas.splice(i,1)
                ordem_popUps.splice(i,1)
            }
        }
    }

    perseguir(Player){
        if(this.vel <50){
            this.vel += 0.5
        }
        this.body.attractionPoint(this.vel,Player.x, Player.y)
        this.body.friction = 0.5
    }
}