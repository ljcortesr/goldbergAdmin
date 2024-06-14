class Machine{
    
    constructor(data) {
        print(data);
        this.current=data.current;
        this.date=data.date;
        this.hour=data.hour;
        this.first=data.first;
        this.last=data.last;

        this.modules=[];
        for (let n = 0; n < data.modules.length; n++){           
            this.modules[n]=new Module(data.modules[n]); 
         }
      }
    
      getHead() {
        for (let n = 0; n < this.modules.length; n++){
            if(this.modules[n].previous==null){
                return this.modules[n];
            }
         }
      }
}

class Module{
    constructor(module){
        this.data=module.data;
        this.red=0;
        this.green=0;
        this.blue=0;
        this.previous=module.previous;
        this.next=module.next;
    }
}