const { link } = require('fs')
const {JSDOM}=require('jsdom')

 async function crawlpage(baseURL,currentUrl,pages){


    const baseURlObj= new URL(baseURL)
    const currentUrlobj=new URL(currentUrl)
    if(baseURlObj.hostname !==currentUrlobj.hostname ){
        return pages 
    }
    const normalizedcurrenturl=normalizeURL(currentUrl)
    if(pages[normalizedcurrenturl]>0){
    pages[normalizedcurrenturl]++
        return pages
        }

    pages[normalizedcurrenturl]=1

    console.log(`actively crawling :${currentUrl}`)

    try{
    const resp= await fetch(currentUrl)
        if(resp.status>399){
        console.log(`error in fetch with status code:${resp.status} on page ${currentUrl}`)
        return pages
    
}

const contentType=resp.headers.get("content-type")
if(!contentType.includes("text/html")){
    console.log(`non html response, content type: ${contentType},on page ${currentUrl}`)
    return  pages
}
const htmlBody = await resp.text()

const nextURLS =  geturlsfromHtml(htmlBody,baseURL)

for(const nextURL of nextURLS){
    pages = await crawlpage(baseURL,nextURL,pages)
}
return pages
}
catch(err){
    console.log(`error in fetch :${err.message},on page:${currentUrl}`)
    
}
}

function normalizeURL(urlString){
    const urlObj= new URL(urlString)
    const hostpath=`${urlObj.hostname}${urlObj.pathname}`
    if(hostpath.length>=0 && hostpath.slice(-1)==='/'){
        return hostpath.slice(0,-1)
    }
    return hostpath
}
function geturlsfromHtml(htmlBody,baseURL){
    const urls=[]
    const dom=new JSDOM(htmlBody)
    const linkelements=dom.window.document.querySelectorAll('a')
    for(const linkelement of linkelements){
        if(linkelement.href.slice(0,1) ==='/'){
            try{
            const urlObj=new URL(`${baseURL}${linkelement.href}`)
            urls.push(urlObj.href)}
            catch(err){
                console.log(`error with relative url:${err.message}`)
            }
        }else{
            //absolute url
            try{
                const urlObj=new URL(linkelement.href)
                urls.push(urlObj.href)}
                catch(err){
                    console.log(`error with relative url: ${err.message}`)
                }
                
        }
     }
    return urls

}

module.exports={
    normalizeURL,
    geturlsfromHtml,
    crawlpage
   
}