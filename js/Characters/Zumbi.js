class Zumbi{


    constructor(x,y,w,h,t,v,z){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.tempo = t
        this.XandY = createVector(x,y)
        this.body = createSprite(this.x, this.y, this.w, this.h)
        this.vel = v
        this.classe = z
        this.time = 0
        this.Tatordoado = 0
        
        if(z ==3 || z ==4){
            this.vidas = 6+(Math.floor(score/10000))
            this.parar_score = false
            this.parar_score2 = false
        }else{
            if(z ==1 || z ==2 || z == 5)
            this.pontos_acabou = false
            this.vidas =3+(Math.floor(score/10000))
        }
        this.morreu = "nop"
        this.Mvel = 10
        this.DieAngle
        this.knockback = "não foi"
    }


    cronometro(){
        if(this.tempo > 0){
            this.tempo -=1
        }
        if(this.time > 0){
            this.time -=1
        }
        if(this.Tatordoado > 0){
            this.Tatordoado -=1
        }
    }

    getAngle(angle){
        this.DieAngle = angle
    }

    morrer(i){
        let pos = this.body.position
        if(!this.pontos_acabou ){
            //pontos da classe 5
            if(this.classe== 5){
                //score += 120
                //desZumbificados +=1
                
                this.pontos_acabou = true
            }else{
                //pontos da classe 1
                if(this.classe == 1){
                    //score += 100
                    //desZumbificados +=1
                    
                    this.pontos_acabou = true
                }else{
                    //pontos da classe 2
                    if(this.classe ==2){
                        //score += 100
                        //desZumbificados +=1
                        
                        this.pontos_acabou = true
                    }
                }
            }
        }
        if(!this.parar_score){
            //pontos da classe 4, é mais complexo por ter duas vidas
            if(this.classe == 4){
                //score += 50
                
                this.parar_score = true
            }else{
                //pontos da classe 3, é mais complexo por ter duas vidas
                if(this.classe == 3){
                    //score += 50
                    
                    this.parar_score = true
                }
            }
        }
            
        
        if(this.knockback == "não foi"){
            if(this.vidas <= 0){
                //quando vidar for zero ou menos colocar a animação de morrer
                this.body.changeAnimation("feliz")
            }
            if(this.Mvel >0){
                //se a velocidade ainda não é zero continuar a diminuir
                this.x += this.DieAngle.x*this.Mvel
                this.y += this.DieAngle.y*this.Mvel
                pos.x = this.x
                pos.y = this.y
                this.Mvel -= 0.5
            }else{
                //se vidas for igaual ou menor q zero
                if(this.vidas <= 0){
                    desZumbificados +=1   
                    score +=100
                    this.body.remove()
                    zumbis.splice(i,1)
                    let numero = Math.round(random(1,2))
                    if(numero == 1){
                        moeda = new Moeda(this.x, this.y, 30,30)
                        moeda.body.addImage("normal", coinImg)
                        moeda.body.scale = 0.05
                        moedas.push(moeda)
                        /*if(usuario.name !== undefined){
                            let R = "Users/User" + usuario.index
                            database.ref(R).update({
                                MaxStreak: maxStreak //duvidoso
                            })
                        }*/
                        //moeda.body.attractionPoint(30,Player.x, Player.y)
                        //moeda.body.friction = 0.8
                    }
                }else{    
                    //se vidas for maior q zero tiver tatoridoado
                    if(this.vidas>0){
                        this.morreu = "nop"
                        this.Mvel = 10
                        this.XandY.x = pos.x
                        this.XandY.y = pos.y
                        
                        this.knockback = "não foi"
                    }
                    /*if(this.classe == 3){
                        this.morreu = "nop"
                        this.Mvel = 10
                        this.XandY.x = pos.x
                        this.XandY.y = pos.y
    
                        this.knockback = "já foi"
                    }else{
                        if(this.classe == 4){
                            this.morreu = "nop"
                            this.Mvel = 10
                            this.XandY.x = pos.x
                            this.XandY.y = pos.y
        
                            this.knockback = "já foi"  
                        }
                    }*/
                }
            }
        }else{
            if(this.knockback == "já foi"){
                if(!this.parar_score2){
                    //score += 100
                    //desZumbificados +=1   
                    this.parar_score2 = true
                }
                if(this.vidas <= 0){
                    this.body.changeAnimation("feliz")
                }
                if(this.Mvel >0){
                    this.x += this.DieAngle.x*this.Mvel
                    this.y += this.DieAngle.y*this.Mvel
                    pos.x = this.x
                    pos.y = this.y
                    this.Mvel -= 0.5
                }else{
                    desZumbificados +=1  
                    score +=100 
                    this.body.remove()
                    zumbis.splice(i,1)
                    let numero = Math.round(random(1,2))
                    if(numero == 1){
                        moeda = new Moeda(this.x, this.y, 30,30)
                        moeda.body.addImage("normal", coinImg)
                        moeda.body.scale = 0.05
                        moedas.push(moeda)
                        //moeda.body.attractionPoint(30,Player.x, Player.y)
                        //moeda.body.friction = 0.8
                    }
                }
            }
        }
    }

    rotacionar(angulo){
        this.body.rotation = angulo +90
    }


    atirar(posx, posy){
        let pos = this.body.position
        let Zangle = this.body.rotation
        if(this.classe == 5 ){
            if(dist(pos.x,pos.y,Player.x, Player.y) <= 300){
                PistSom.play()
                PistSom.setVolume(volume)
                Ztiro = new Tiro(pos.x, pos.y, posx, posy, 20, 20,Zangle)
                Ztiro.body.addAnimation("indo",fogoAnim)
                Ztiro.body.depth = this.body.depth -1
                Ztiro.lifetime = 200
                tiros.push(Ztiro)
                this.time = 12
            }
        }
    }

    Player(dir){  
        this.x +=dir.x*this.vel 
        this.y +=dir.y*this.vel 
    }
    show(){
        let pos = this.body.position
        /*push()
        textSize(30)
        text("faltam " + int(this.tempo/30) + " segundos", pos.x -50, pos.y -50)
        pop()*/
        pos.x = this.x
        pos.y = this.y
    }









}