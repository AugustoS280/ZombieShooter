class Tiro{

    constructor(Zx,Zy,x,y,w,h,angle){
        //this.body = createSprite(x,y,w,h)
        //let position = this.body.position
        this.x = Zx
        this.y = Zy
        this.w = w
        this.h = h
        this.vel = 35 //velocidade
        this.dir = createVector(x-Zx, y-Zy).normalize() //direção e padrão e tentar colocar um limite 
        this.body = createSprite(this.x,this.y,w,h) //sprite em si
        this.angle = angle //angulo de rotação

    }


    rotation(){
        this.body.rotation = this.angle
    }

    mouse(){
        this.x +=this.dir.x*this.vel 
        this.y +=this.dir.y*this.vel 
    }



    show(){
        let pos = this.body.position
        pos.x = this.x
        pos.y = this.y
    }


    sair(indice){
        //para se sair da tela morrer
        let pos = this.body.position
        if(pos.x < 0 - this.w/2 || pos.x > width + this.w/2 || pos.y < 0 - this.h/2 || pos.y > height + this.h/2){
            tiros.splice(indice,1)
            this.body.destroy()
        }
    }





}