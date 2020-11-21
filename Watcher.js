class Watcher{
    //当观察者数据发生变化后，更新视图
    constructor(vm,key,callback){
        this.vm = vm
        this.key = key
        this.callback = callback

        this.oldVal = this.getOldVal()
    }
    getOldVal(){
        Dep.target = this
        const oldval = compileUtil.getValue(this.key,this.vm)
        Dep.target = null
        return oldval
    }
    update(){
        this.callback()
    }
}