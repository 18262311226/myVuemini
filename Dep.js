class Dep{
    constructor(){
        this.sublist = []
    }
    addSub(watcher){
        this.sublist.push(watcher)
    }
    notify(){
        this.sublist.forEach(item => {
            item.update()
        })
    }
}