class Compile{
    constructor(vm){
        this.el = vm.$el
        this.vm = vm
        //1.将模板容器中所有的节点添加到文档片段中
        const fragment = this.nodeToFragment()
        //2.编译文档片段（如{{}}指令等）
        this.compile(fragment)
        //3.将编译后的文档片段追加到模板容器中
        this.el.appendChild(fragment)
    }
    nodeToFragment(){
        //创建文档片段
        const f = document.createDocumentFragment()
        //将模板中的节点添加到文档片段中
        while(this.el.firstChild){
            f.appendChild(this.el.firstChild)
        }
        return f
    }
    compile(fragment){
        const nlist = fragment.childNodes
        nlist.forEach((node)=>{
            const nodetype = node.nodeType
            if(nodetype === 1){
                //解析元素节点
                this.compilement(node)
            }else if(nodetype === 3){
                //解析文档节点
                this.compileText(node)
            }
            if(node.childNodes && node.childNodes.length > 0){
                this.compile(node)
            }
        })
    }
    //文档节电解析
    compileText(node){
        const reg = /\{\{(.+?)\}\}/g
        const con = node.textContent
        if(reg.test(con)){
            const newval = con.replace(reg,(...args)=>{
                new Watcher(this.vm,args[1],()=>{
                    node.textContent = con.replace(reg,(...args)=>{
                        return this.vm.$data[args[1]]
                    })
                })
                return this.vm.$data[args[1]]
            })
            node.textContent = newval
        }
    }
    //元素节点解析指令
    compilement(node){
        const attrs = node.attributes
        Array.from(attrs).forEach(item=>{
            const {name,value} = item
            if(name.startsWith('v-')){
                const [,b] = name.split('-')
                if(b === 'model'){
                    node.value = this.vm.$data[value]
                    new Watcher(this.vm,value,()=>{
                        node.value = this.vm.$data[value]
                    })
                    node.addEventListener('input',(e)=>{
                        this.vm.$data[value] = e.target.value
                    })
                }else if(b === 'html'){
                    node.innerHTML = this.vm.$data[value]
                }else if(b === 'text'){
                    node.innerText = this.vm.$data[value]
                }
            }
        })
    }
}