const compileUtil = {
    text(node,con,vm){
        let value = con.replace(/\{\{(.+?)\}\}/g,(...args)=>{
            //绑定观察者，将来数据发生变化，方便更新视图
            new Watcher(vm,args[1],(newVal)=>{
                this.updater.textUpdater(node,this.getContentVal(con,vm))
            })
            return this.getValue(args[1],vm)
        })
        this.updater.textUpdater(node,value)
    },
    updater:{
        textUpdater(node,value){
            node.textContent = value
        },
        modelUpdater(node,value){
            node.value = value
        }
    },
    getValue(key,vm){
        let keys = key.replace(/\s+/g,'')
        return keys.split('.').reduce((data,currentVal)=>{
            return data[currentVal]
        },vm.$data)
    },
    getContentVal(con,vm){
        return con.replace(/\{\{(.+?)\}\}/g,(...args)=>{
            return this.getValue(args[1],vm)
        })
    }
}