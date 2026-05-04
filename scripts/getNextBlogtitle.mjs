import blogData from "../src/data/bloglist.json" with {type:"json"};

function getNextNewstitle(){
    const nowslugs=blogData.blog.map((value)=>value.slug);
    let i=1;
    while(true){
        if(!nowslugs.includes(i.toString()))break;
        i++;
    }
    return i.toString();
}
console.log(`SLUG=${getNextNewstitle()}`);