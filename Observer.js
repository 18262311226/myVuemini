class Observer{
    constructor(data){
        this.Observer(data)
    }
    Observer(data){
        const dep = new Dep()
        for(const key in data){
            let val = data[key]
            Object.defineProperty(data,key,{
                enumerable:true,
                configurable:false,
                get(){
                    if(Dep.target){
                        dep.addSub(Dep.target)
                    }
                    return val
                },
                set(newval){
                    val = newval
                    dep.notify()
                }
            })
        }
    }
}