class myVue{
    constructor(options){
        this.$data = options.data
        this.$el = document.querySelector(options.el)
        //数据代理
        this.proxyData()
        //数据劫持
        new Observer(this.$data)
        //模板编译
        new Compile(this)
    }
    //数据代理
    proxyData(){
        for(const key in this.$data){
            Object.defineProperty(this,key,{
                configurable: false,
                enumerable: true,
                get(){
                    return this.$data[key]
                },
                set(newVal){
                    this.$data[key] = newVal
                }
            })
        }
    }
}