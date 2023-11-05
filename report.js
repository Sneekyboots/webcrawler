function printreport(pages){
console.log("===================")
console.log("REPORT")
console.log("===================")
const sortedPages=sortpages(pages)
for(const sortedpage of sortedPages){
    const url=sortedpage[0]
    const hits=sortedpage[1]
    console.log(`Found ${hits} links to page ${url}`)
}
console.log("====================")
console.log("END REPORT")
console.log("=================")
}
function sortpages(pages){
    const pagesarr=Object.entries(pages)
    pagesarr.sort((a,b)=>{
        aHits=a[1]
        bHits=b[1]
        return b[1]-a[1]
    })
    return pagesarr
}
module.exports={
    sortpages,
    printreport
}