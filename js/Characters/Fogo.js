class Fogo{


    constructor(x,y,w,h,Px,Py,angle,t){

        this.vel = 40 //velocidade
        this.w = w  //largura
        this.h = h  //altura
        this.x = Px  //x do Player
        this.y = Py //y do Player
        this.dir = createVector(x-Px, y-Py) //direção e padrão e tentar colocar um limite 
        this.body = createSprite(this.x,this.y,w,h) //sprite em si
        this.angle = angle //angulo de rotação
        this.tipo = t
    }

    apontar(){
        
        //rotacionar
        this.body.rotation = this.angle +90
    }

    mouse(){  
        
        //ir até onde eu tinha clicado antes
        //pega o this.x (que inicialmente é igual o do Player)
        //e vai aumentando a velocidade de acordo com a direção
        this.x +=this.dir.x*this.vel 
        this.y +=this.dir.y*this.vel 
    }
    show(){
        //atualizar a sprite
        let pos = this.body.position
        pos.x = this.x
        pos.y = this.y
        
    }

    sair(indice){
        //para se sair da tela morrer
        let pos = this.body.position
        if(pos.x < 0 - this.w/2 || pos.x > width + this.w/2 || pos.y < 0 - this.h/2 || pos.y > height + this.h/2){
            fogos.splice(indice,1)
            this.body.destroy()
        }
    }
    
}